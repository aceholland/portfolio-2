import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface StatusBarProps {
  activeWindowsCount: number;
  coordinates: { x: number; y: number };
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeWindowsCount,
  coordinates
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [soundActive, setSoundActive] = useState(sound.isEnabled());

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const datePart = now.toISOString().split('T')[0];
      const timePart = now.toTimeString().split(' ')[0];
      setTimeStr(`${datePart}  ${timePart}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const newState = sound.toggleSound();
    setSoundActive(newState);
  };

  return (
    <footer className="desktop-status-bar">
      <div className="status-bar-left">
        <div className="status-item">
          <span className="status-badge-live" />
          <span>SYSTEM READY</span>
        </div>
        <div className="status-item">
          <span>INSPECTOR:</span>
          <span>X: {coordinates.x} Y: {coordinates.y}</span>
        </div>
        <div className="status-item">
          <span>WINDOWS:</span>
          <span>{activeWindowsCount} OPEN</span>
        </div>
      </div>

      <div className="status-bar-right">
        <button
          className="status-toggle-btn"
          onClick={toggleSound}
          title="Toggle interface feedback audio"
        >
          AUDIO: {soundActive ? 'ON' : 'MUTED'}
        </button>
        <div className="status-item">
          <span>{timeStr || '2026-08-17 01:00:00'}</span>
        </div>
      </div>
    </footer>
  );
};
