import React from 'react';
import { WindowId } from '../types';
import { sound } from '../utils/audio';

interface DesktopDecorationsProps {
  onOpenWindow: (id: WindowId) => void;
}

export const DesktopDecorations: React.FC<DesktopDecorationsProps> = ({ onOpenWindow }) => {
  return (
    <>
      <div className="editorial-layer">
        {/* Top Magazine Header Line */}
        <div className="editorial-top-bar">
          <div className="editorial-edition">
            AUGUST 2026 / VOL. 09
          </div>
          <div className="editorial-brand">
            ANUSHKA VERMA — COMPUTATIONAL SYSTEMS ARCHIVE
          </div>
          <div className="editorial-status-pill">
            <span className="pulse-dot" />
            <span>PORTFOLIO DESKTOP / ACTIVE</span>
          </div>
        </div>

        {/* Giant Editorial Headline */}
        <div className="editorial-headline-container">
          <h1 className="editorial-main-headline">ANUSHKA VERMA</h1>
          <div className="editorial-subheadline">
            <span>AI/ML ENGINEER</span>
            <span>RESEARCH & COMPUTATIONAL SYSTEMS</span>
          </div>
        </div>
      </div>

      {/* Message Bubble Object from Ref Image 2 */}
      <div
        className="desktop-bubble-icon"
        onClick={() => {
          onOpenWindow('contact');
          sound.playWindowOpen();
        }}
        title="Open Contact Terminal"
      >
        •••
      </div>
    </>
  );
};
