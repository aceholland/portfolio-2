import React, { useState, useRef, useEffect } from 'react';
import { WindowId, WindowState } from '../types';
import { sound } from '../utils/audio';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { ResumeWindow } from './windows/ResumeWindow';
import { SkillsWindow } from './windows/SkillsWindow';
import { AboutWindow } from './windows/AboutWindow';
import { ContactWindow } from './windows/ContactWindow';
import { Folder, FileText, Code, HelpCircle, Mail, Minus, X } from 'lucide-react';

interface WindowManagerProps {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  onFocusWindow: (id: WindowId) => void;
  onCloseWindow: (id: WindowId) => void;
  onMinimizeWindow: (id: WindowId) => void;
  onUpdatePosition: (id: WindowId, pos: { x: number; y: number }) => void;
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  activeWindowId,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onUpdatePosition,
  activeProjectId,
  setActiveProjectId
}) => {
  const [draggingWindowId, setDraggingWindowId] = useState<WindowId | null>(null);
  const dragStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Escape key handler to close top active window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeWindowId) {
        onCloseWindow(activeWindowId);
        sound.playWindowClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId, onCloseWindow]);

  // Window drag handlers
  const handleHeaderMouseDown = (
    e: React.MouseEvent,
    win: WindowState
  ) => {
    e.stopPropagation();
    onFocusWindow(win.id);
    setDraggingWindowId(win.id);
    dragStartOffset.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y
    };
  };

  const handleHeaderTouchStart = (
    e: React.TouchEvent,
    win: WindowState
  ) => {
    if (e.touches.length === 1) {
      onFocusWindow(win.id);
      setDraggingWindowId(win.id);
      dragStartOffset.current = {
        x: e.touches[0].clientX - win.position.x,
        y: e.touches[0].clientY - win.position.y
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingWindowId) return;
      const newX = Math.max(10, Math.min(e.clientX - dragStartOffset.current.x, window.innerWidth - 300));
      const newY = Math.max(10, Math.min(e.clientY - dragStartOffset.current.y, window.innerHeight - 150));
      onUpdatePosition(draggingWindowId, { x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!draggingWindowId || e.touches.length !== 1) return;
      const newX = Math.max(10, Math.min(e.touches[0].clientX - dragStartOffset.current.x, window.innerWidth - 300));
      const newY = Math.max(10, Math.min(e.touches[0].clientY - dragStartOffset.current.y, window.innerHeight - 150));
      onUpdatePosition(draggingWindowId, { x: newX, y: newY });
    };

    const handleEnd = () => {
      if (draggingWindowId) {
        setDraggingWindowId(null);
      }
    };

    if (draggingWindowId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [draggingWindowId, onUpdatePosition]);

  const getWindowIcon = (id: WindowId) => {
    switch (id) {
      case 'projects':
        return <Folder className="window-title-icon" />;
      case 'resume':
        return <FileText className="window-title-icon" />;
      case 'skills':
        return <Code className="window-title-icon" />;
      case 'about':
        return <HelpCircle className="window-title-icon" />;
      case 'contact':
        return <Mail className="window-title-icon" />;
    }
  };

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case 'projects':
        return <ProjectsWindow activeProjectId={activeProjectId} setActiveProjectId={setActiveProjectId} />;
      case 'resume':
        return <ResumeWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'about':
        return <AboutWindow />;
      case 'contact':
        return <ContactWindow />;
    }
  };

  return (
    <>
      {windows.map((win) => {
        if (!win.isOpen || win.isMinimized) return null;
        const isActive = activeWindowId === win.id;

        return (
          <div
            key={win.id}
            className={`window-container ${isActive ? 'is-active' : ''}`}
            style={{
              transform: `translate3d(${win.position.x}px, ${win.position.y}px, 0)`,
              width: `${win.size.width}px`,
              height: `${win.size.height}px`,
              zIndex: win.zIndex
            }}
            onMouseDown={() => onFocusWindow(win.id)}
          >
            {/* Window Header */}
            <div
              className="window-header"
              onMouseDown={(e) => handleHeaderMouseDown(e, win)}
              onTouchStart={(e) => handleHeaderTouchStart(e, win)}
            >
              <div className="window-title-group">
                {getWindowIcon(win.id)}
                <span className="window-title-text">{win.title}</span>
              </div>

              <div className="window-controls-group">
                <button
                  className="window-control-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimizeWindow(win.id);
                  }}
                  title="Minimize"
                >
                  <Minus size={11} strokeWidth={3} />
                </button>
                <button
                  className="window-control-btn close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseWindow(win.id);
                  }}
                  title="Close (Esc)"
                >
                  <X size={11} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="window-content">{renderWindowContent(win.id)}</div>
          </div>
        );
      })}
    </>
  );
};
