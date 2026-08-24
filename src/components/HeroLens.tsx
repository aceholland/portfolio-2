import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../utils/audio';

interface HeroLensProps {
  imageSrc?: string;
  onCoordinatesChange?: (coords: { x: number; y: number }) => void;
}

export const HeroLens: React.FC<HeroLensProps> = ({
  imageSrc = '/assets/portrait_color.png',
  onCoordinatesChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Lens state: position (x, y) and size (width, height)
  const [lensPos, setLensPos] = useState({ x: 260, y: 220 });
  const [lensSize, setLensSize] = useState({ width: 240, height: 260 });

  // Dragging state (moving the lens box)
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Resizing state (adjusting width/height)
  const [resizeDir, setResizeDir] = useState<string | null>(null);
  const resizeStart = useRef({
    mouseX: 0,
    mouseY: 0,
    lensX: 0,
    lensY: 0,
    lensW: 0,
    lensH: 0
  });

  // Read current brightness from document root (default to 73%)
  const [currentBrightness, setCurrentBrightness] = useState('73%');

  useEffect(() => {
    const updateBrightnessFromCSS = () => {
      const bValStr = document.documentElement.style.getPropertyValue('--bg-brightness') || '0.73';
      const percent = Math.round(parseFloat(bValStr) * 100);
      setCurrentBrightness(`${percent}%`);
    };

    updateBrightnessFromCSS();

    // Create a MutationObserver to listen for changes on documentElement style attribute
    const observer = new MutationObserver(updateBrightnessFromCSS);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  // Update lens position bounds
  const updateLens = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let newX = clientX - rect.left - dragOffset.current.x;
    let newY = clientY - rect.top - dragOffset.current.y;

    // Constrain inside container
    newX = Math.max(0, Math.min(newX, rect.width - lensSize.width));
    newY = Math.max(0, Math.min(newY, rect.height - lensSize.height));

    setLensPos({ x: newX, y: newY });
    if (onCoordinatesChange) {
      onCoordinatesChange({ x: Math.round(newX), y: Math.round(newY) });
    }
  }, [lensSize, onCoordinatesChange]);

  // Resizing logic handler
  const updateResize = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current || !resizeDir) return;
    const rect = containerRef.current.getBoundingClientRect();

    const deltaX = clientX - resizeStart.current.mouseX;
    const deltaY = clientY - resizeStart.current.mouseY;

    let newX = resizeStart.current.lensX;
    let newY = resizeStart.current.lensY;
    let newW = resizeStart.current.lensW;
    let newH = resizeStart.current.lensH;

    const minSize = 60; // Minimum lens box size

    if (resizeDir.includes('e')) {
      newW = Math.max(minSize, resizeStart.current.lensW + deltaX);
      newW = Math.min(newW, rect.width - newX);
    }
    if (resizeDir.includes('s')) {
      newH = Math.max(minSize, resizeStart.current.lensH + deltaY);
      newH = Math.min(newH, rect.height - newY);
    }
    if (resizeDir.includes('w')) {
      const prospectiveW = resizeStart.current.lensW - deltaX;
      if (prospectiveW >= minSize) {
        const prospectiveX = resizeStart.current.lensX + deltaX;
        if (prospectiveX >= 0) {
          newW = prospectiveW;
          newX = prospectiveX;
        }
      }
    }
    if (resizeDir.includes('n')) {
      const prospectiveH = resizeStart.current.lensH - deltaY;
      if (prospectiveH >= minSize) {
        const prospectiveY = resizeStart.current.lensY + deltaY;
        if (prospectiveY >= 0) {
          newH = prospectiveH;
          newY = prospectiveY;
        }
      }
    }

    setLensPos({ x: newX, y: newY });
    setLensSize({ width: newW, height: newH });

    if (onCoordinatesChange) {
      onCoordinatesChange({ x: Math.round(newX), y: Math.round(newY) });
    }
  }, [resizeDir, onCoordinatesChange]);

  // Mouse handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    // If clicking a resize handle, don't drag
    if ((e.target as HTMLElement).classList.contains('lens-resize-handle')) return;
    e.preventDefault();
    setIsDragging(true);
    sound.playLensTick();
    dragOffset.current = {
      x: e.clientX - (containerRef.current?.getBoundingClientRect().left || 0) - lensPos.x,
      y: e.clientY - (containerRef.current?.getBoundingClientRect().top || 0) - lensPos.y
    };
  };

  // Touch handlers for dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).classList.contains('lens-resize-handle')) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      sound.playLensTick();
      dragOffset.current = {
        x: touch.clientX - (containerRef.current?.getBoundingClientRect().left || 0) - lensPos.x,
        y: touch.clientY - (containerRef.current?.getBoundingClientRect().top || 0) - lensPos.y
      };
    }
  };

  // Resize Trigger handlers
  const handleResizeStart = (dir: string, clientX: number, clientY: number) => {
    sound.playLensTick();
    setResizeDir(dir);
    resizeStart.current = {
      mouseX: clientX,
      mouseY: clientY,
      lensX: lensPos.x,
      lensY: lensPos.y,
      lensW: lensSize.width,
      lensH: lensSize.height
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateLens(e.clientX, e.clientY);
      } else if (resizeDir) {
        updateResize(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (isDragging) {
        updateLens(e.touches[0].clientX, e.touches[0].clientY);
      } else if (resizeDir) {
        updateResize(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setResizeDir(null);
    };

    if (isDragging || resizeDir) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, resizeDir, updateLens, updateResize]);

  // Calculate CSS clip-path inset values for the color layer
  const getClipPath = () => {
    if (!containerRef.current) {
      return `inset(${lensPos.y}px calc(100% - ${lensPos.x + lensSize.width}px) calc(100% - ${lensPos.y + lensSize.height}px) ${lensPos.x}px)`;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const top = lensPos.y;
    const right = Math.max(0, rect.width - (lensPos.x + lensSize.width));
    const bottom = Math.max(0, rect.height - (lensPos.y + lensSize.height));
    const left = lensPos.x;

    return `inset(${top}px ${right}px ${bottom}px ${left}px)`;
  };

  return (
    <div className="hero-viewport-container">
      <div className="hero-image-wrapper">
        {/* Outer Checkerboard Squares Background */}
        <div className="hero-checkerboard-overlay" style={{ inset: 0, position: 'absolute' }} />

        {/* Outer Halftone Dot Overlay (extends dots across the entire full-screen background) */}
        <div className="hero-halftone-overlay" style={{ inset: 0, position: 'absolute' }} />

        <div className="hero-image-inner" ref={containerRef}>
          {/* Layer 1: Base Grayscale / Halftone / Blurred Image */}
          <img
            src={imageSrc}
            alt="Editorial Portrait Monochrome"
            className="hero-image-base"
          />

          {/* Inner Checkerboard Squares (covers the grayscale portrait area) */}
          <div className="hero-checkerboard-overlay" />

          {/* Inner Halftone Dot Overlay (covers the grayscale portrait area) */}
          <div className="hero-halftone-overlay" />

          {/* Layer 2: Full Color / Sharp Image Clipped to Lens */}
          <img
            src={imageSrc}
            alt="Editorial Portrait Color Inspector"
            className="hero-image-color"
            style={{
              clipPath: getClipPath(),
              WebkitClipPath: getClipPath()
            }}
          />

        {/* Draggable & Resizable Blue Selection Box */}
        <div
          className={`inspection-lens-box ${isDragging ? 'is-dragging' : ''} ${resizeDir ? 'is-resizing' : ''}`}
          style={{
            transform: `translate(${lensPos.x}px, ${lensPos.y}px)`,
            width: `${lensSize.width}px`,
            height: `${lensSize.height}px`
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Corner Resize Handles */}
          <div
            className="lens-resize-handle lens-corner-handle top-left"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('nw', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('nw', e.touches[0].clientX, e.touches[0].clientY); }}
          />
          <div
            className="lens-resize-handle lens-corner-handle top-right"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('ne', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('ne', e.touches[0].clientX, e.touches[0].clientY); }}
          />
          <div
            className="lens-resize-handle lens-corner-handle bottom-left"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('sw', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('sw', e.touches[0].clientX, e.touches[0].clientY); }}
          />
          <div
            className="lens-resize-handle lens-corner-handle bottom-right"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('se', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('se', e.touches[0].clientX, e.touches[0].clientY); }}
          />

          {/* Edge Resize Handles */}
          <div
            className="lens-resize-handle lens-edge-handle edge-n"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('n', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('n', e.touches[0].clientX, e.touches[0].clientY); }}
          />
          <div
            className="lens-resize-handle lens-edge-handle edge-s"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('s', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('s', e.touches[0].clientX, e.touches[0].clientY); }}
          />
          <div
            className="lens-resize-handle lens-edge-handle edge-e"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('e', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('e', e.touches[0].clientX, e.touches[0].clientY); }}
          />
          <div
            className="lens-resize-handle lens-edge-handle edge-w"
            onMouseDown={(e) => { e.stopPropagation(); handleResizeStart('w', e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleResizeStart('w', e.touches[0].clientX, e.touches[0].clientY); }}
          />

          {/* Yellow Crosshair & Sun Icon */}
          <div className="lens-yellow-crosshair">
            <svg viewBox="0 0 24 24" className="yellow-sun-icon" fill="currentColor">
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Pixel Cursor Pointer */}
          <div className="lens-pixel-cursor">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
              <path
                d="M1 1V24L7.5 18L12.5 27L16.5 25L11.5 16H19L1 1Z"
                fill="#ffffff"
                stroke="#121214"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Lens Status Tag - including live brightness readout */}
          <div className="lens-status-tag">
            <span className="dot" />
            <span>INSPECTION LENS: COLOR / SHARP / LUMINANCE: {currentBrightness}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
