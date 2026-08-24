import React from 'react';
import { DesktopFolderItem, WindowId } from '../types';
import { sound } from '../utils/audio';

interface DesktopFolderProps {
  folder: DesktopFolderItem;
  isSelected: boolean;
  onOpen: (folder: DesktopFolderItem) => void;
  onSelect: (id: WindowId) => void;
}

export const DesktopFolder: React.FC<DesktopFolderProps> = ({
  folder,
  isSelected,
  onOpen,
  onSelect
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(folder.id);
    sound.playFolderClick();
    onOpen(folder);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen(folder);
  };

  return (
    <div
      className={`desktop-folder-item ${isSelected ? 'is-selected' : ''}`}
      style={{
        top: `${folder.yPercent}%`,
        left: `${folder.xPercent}%`
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
      title={`Open ${folder.label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onOpen(folder);
        }
      }}
    >
      <div className="folder-icon-wrapper">
        <svg viewBox="0 0 74 58" className="folder-svg">
          <defs>
            <linearGradient id={`grad-${folder.id}-${folder.projectId || 'sys'}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7ec4fc" />
              <stop offset="35%" stopColor="#4da0f2" />
              <stop offset="100%" stopColor="#2578d6" />
            </linearGradient>
            <filter id={`drop-${folder.id}-${folder.projectId || 'sys'}`} x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Folder Back Tab */}
          <path
            d="M 6 12 L 28 12 L 36 20 L 68 20 A 4 4 0 0 1 72 24 L 72 50 A 4 4 0 0 1 68 54 L 6 54 A 4 4 0 0 1 2 50 L 2 16 A 4 4 0 0 1 6 12 Z"
            fill="#347cb8"
          />

          {/* Folder Interior Paper Page Hint */}
          <rect x="10" y="15" width="54" height="20" rx="2" fill="#ffffff" opacity="0.9" />

          {/* Folder Front Flap */}
          <path
            d="M 2 24 L 72 24 L 70 52 A 3 3 0 0 1 67 55 L 7 55 A 3 3 0 0 1 4 52 L 2 24 Z"
            fill={`url(#grad-${folder.id}-${folder.projectId || 'sys'})`}
            stroke="#a9d7fe"
            strokeWidth="0.75"
            filter={`url(#drop-${folder.id}-${folder.projectId || 'sys'})`}
          />
        </svg>

        {folder.badge && (
          <span className="folder-badge-counter">{folder.badge}</span>
        )}
      </div>

      <div className="folder-label-box">
        <span className="folder-title" style={{ whiteSpace: 'nowrap' }}>{folder.label}</span>
        {folder.sublabel && <span className="folder-sublabel" style={{ whiteSpace: 'nowrap' }}>{folder.sublabel}</span>}
      </div>
    </div>
  );
};
