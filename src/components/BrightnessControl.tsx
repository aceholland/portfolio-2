import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

export const BrightnessControl: React.FC = () => {
  const [brightness, setBrightness] = useState<number>(100);

  useEffect(() => {
    // Update CSS custom properties
    const bVal = brightness / 100;
    const cVal = 1 + (1 - bVal) * 0.4;
    document.documentElement.style.setProperty('--bg-brightness', bVal.toFixed(2));
    document.documentElement.style.setProperty('--bg-contrast', cVal.toFixed(2));
  }, [brightness]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setBrightness(val);
    if (val % 5 === 0) {
      sound.playSliderTick();
    }
  };

  return (
    <div className="brightness-control-widget" title="Adjust background luminance & photo exposure">
      <div className="brightness-title-row">
        <span>BRIGHTNESS</span>
        <span className="brightness-value-readout">{brightness}%</span>
      </div>
      <div className="brightness-slider-track">
        <input
          type="range"
          min="40"
          max="140"
          value={brightness}
          onChange={handleChange}
          className="editorial-range-input"
          aria-label="Desktop Brightness Control"
        />
      </div>
    </div>
  );
};
