import React, { useState, useCallback } from 'react';
import { WindowId, WindowState, DesktopFolderItem } from './types';
import { HeroLens } from './components/HeroLens';
import { DesktopFolder } from './components/DesktopFolder';
import { DesktopDecorations } from './components/DesktopDecorations';
import { BrightnessControl } from './components/BrightnessControl';
import { StatusBar } from './components/StatusBar';
import { WindowManager } from './components/WindowManager';
import { sound } from './utils/audio';

import './styles/index.css';
import './styles/desktop.css';
import './styles/hero-lens.css';
import './styles/windows.css';
import './styles/brightness.css';
import './styles/responsive.css';

// Initial Folders Layout (Safe placements to prevent overlap with left titles & right portrait face)
const DESKTOP_FOLDERS: DesktopFolderItem[] = [
  // Column 1 (x = 5%): System Folders
  {
    id: 'resume',
    label: 'RESUME',
    sublabel: 'Verified CV Dossier',
    xPercent: 5,
    yPercent: 48,
    badge: 'CV'
  },
  {
    id: 'skills',
    label: 'SKILLS',
    sublabel: 'Tools & Ensembles',
    xPercent: 5,
    yPercent: 60,
    badge: '18'
  },
  {
    id: 'about',
    label: 'ABOUT',
    sublabel: 'Editorial Manifesto',
    xPercent: 5,
    yPercent: 72,
    badge: 'Q&A'
  },
  {
    id: 'contact',
    label: 'CONTACT',
    sublabel: 'Direct Channels',
    xPercent: 5,
    yPercent: 84,
    badge: 'LIVE'
  },

  // Column 2 (x = 15%): Astronomy, Crop/Housing, Web Apps, Heart ML Projects
  {
    id: 'projects',
    projectId: 'astronomy-ml',
    label: 'ASTRONOMY ML',
    sublabel: 'Astro Predictions',
    xPercent: 15,
    yPercent: 48,
    badge: '03'
  },
  {
    id: 'projects',
    projectId: 'agricultural-housing-ml',
    label: 'CROP & HOUSING',
    sublabel: 'Yield Regression',
    xPercent: 15,
    yPercent: 60,
    badge: '02'
  },
  {
    id: 'projects',
    projectId: 'web-apps',
    label: 'WEB APPS',
    sublabel: 'Frontend Grid',
    xPercent: 15,
    yPercent: 72,
    badge: '08'
  },
  {
    id: 'projects',
    projectId: 'rppg-heart-rate',
    label: 'HEART CV (RPPG)',
    sublabel: 'Telemetry Scan',
    xPercent: 15,
    yPercent: 84,
    badge: 'LIVE'
  },

  // Column 3 (x = 25%): Surrogate ML, Jarvis Voice, WhatsApp Bot
  {
    id: 'projects',
    projectId: 'physics-surrogate',
    label: 'SURROGATE ML',
    sublabel: 'Reactor Ensemble',
    xPercent: 25,
    yPercent: 48,
    badge: '120x'
  },
  {
    id: 'projects',
    projectId: 'jarvis-voice',
    label: 'JARVIS VOICE',
    sublabel: 'Local AI Agent',
    xPercent: 25,
    yPercent: 60,
    badge: 'AI'
  },
  {
    id: 'projects',
    projectId: 'chatbot-whatsapp',
    label: 'WHATSAPP BOT',
    sublabel: 'NLP Automation',
    xPercent: 25,
    yPercent: 72,
    badge: 'NLP'
  }
];

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: 'projects',
    title: 'PROJECT_DOSSIER // ANUSHKA_VERMA',
    isOpen: false,
    isMinimized: false,
    position: { x: 140, y: 80 },
    size: { width: 720, height: 560 },
    zIndex: 10
  },
  {
    id: 'resume',
    title: 'CURRICULUM_VITAE // ANUSHKA_VERMA',
    isOpen: false,
    isMinimized: false,
    position: { x: 180, y: 60 },
    size: { width: 740, height: 600 },
    zIndex: 11
  },
  {
    id: 'skills',
    title: 'TECHNICAL_TOOLCHAIN // SKILLS_MATRIX',
    isOpen: false,
    isMinimized: false,
    position: { x: 210, y: 110 },
    size: { width: 680, height: 510 },
    zIndex: 12
  },
  {
    id: 'about',
    title: 'EDITORIAL_NOTE // WHO_AM_I',
    isOpen: false,
    isMinimized: false,
    position: { x: 240, y: 90 },
    size: { width: 640, height: 520 },
    zIndex: 13
  },
  {
    id: 'contact',
    title: 'COMMUNICATION_TERMINAL // CONTACT',
    isOpen: false,
    isMinimized: false,
    position: { x: 290, y: 130 },
    size: { width: 520, height: 430 },
    zIndex: 14
  }
];

export const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [selectedFolderKey, setSelectedFolderKey] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string>('astronomy-ml');
  const [highestZIndex, setHighestZIndex] = useState<number>(20);
  const [inspectorCoords, setInspectorCoords] = useState<{ x: number; y: number }>({ x: 260, y: 220 });

  // Open a window by ID
  const handleOpenWindow = useCallback((id: WindowId) => {
    sound.playWindowOpen();
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setActiveWindowId(id);

    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return {
            ...win,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          };
        }
        return win;
      })
    );
  }, [highestZIndex]);

  // Handle folder clicks
  const handleOpenFolder = useCallback((folder: DesktopFolderItem) => {
    const key = folder.projectId ? `${folder.id}-${folder.projectId}` : folder.id;
    setSelectedFolderKey(key);
    
    if (folder.projectId) {
      setActiveProjectId(folder.projectId);
    }
    handleOpenWindow(folder.id);
  }, [handleOpenWindow]);

  // Focus an existing window
  const handleFocusWindow = useCallback((id: WindowId) => {
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setActiveWindowId(id);
    setSelectedFolderKey(id);

    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, zIndex: nextZ } : win))
    );
  }, [highestZIndex]);

  // Close window
  const handleCloseWindow = useCallback((id: WindowId) => {
    sound.playWindowClose();
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isOpen: false } : win))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  // Minimize window
  const handleMinimizeWindow = useCallback((id: WindowId) => {
    sound.playWindowClose();
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  // Update window position after drag
  const handleUpdatePosition = useCallback((id: WindowId, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, position: pos } : win))
    );
  }, []);

  // Desktop click deselects folder
  const handleDesktopClick = () => {
    setSelectedFolderKey(null);
  };

  const activeWindowsCount = windows.filter((w) => w.isOpen && !w.isMinimized).length;

  return (
    <div className="desktop-container" onClick={handleDesktopClick}>
      {/* Dual Layer Hero Portrait with Interactive Color Inspector Lens */}
      <HeroLens
        imageSrc="/assets/portrait_color.png"
        onCoordinatesChange={setInspectorCoords}
      />

      {/* Editorial Canvas Typography & Graphic Grid */}
      <DesktopDecorations onOpenWindow={handleOpenWindow} />

      {/* Tactile Blue Desktop Folders (Ref Image 2) */}
      <div className="desktop-folders-container">
        {DESKTOP_FOLDERS.map((folder) => {
          const key = folder.projectId ? `${folder.id}-${folder.projectId}` : folder.id;
          return (
            <DesktopFolder
              key={key}
              folder={folder}
              isSelected={selectedFolderKey === key}
              onOpen={handleOpenFolder}
              onSelect={setSelectedFolderKey}
            />
          );
        })}
      </div>

      {/* Editorial Brightness Controller (Ref Image 2) */}
      <BrightnessControl />

      {/* Floating Window Manager */}
      <WindowManager
        windows={windows}
        activeWindowId={activeWindowId}
        onFocusWindow={handleFocusWindow}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleMinimizeWindow}
        onUpdatePosition={handleUpdatePosition}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
      />

      {/* Bottom System Status Bar */}
      <StatusBar
        activeWindowsCount={activeWindowsCount}
        coordinates={inspectorCoords}
      />
    </div>
  );
};
