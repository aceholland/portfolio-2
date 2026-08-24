import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { sound } from '../../utils/audio';

export const SkillsWindow: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', ...SKILL_CATEGORIES.map((c) => c.category)];

  const filteredCategories = selectedFilter === 'ALL'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.category === selectedFilter);

  return (
    <div className="skills-window-body">
      {/* Category Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', borderBottom: '1.5px solid var(--border-strong)', paddingBottom: '12px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tech-tag ${selectedFilter === cat ? 'is-active' : ''}`}
            style={{
              background: selectedFilter === cat ? 'var(--accent-blue)' : '#f0f0ed',
              color: selectedFilter === cat ? '#ffffff' : 'var(--text-main)',
              borderColor: selectedFilter === cat ? 'var(--accent-blue-dark)' : 'rgba(18, 18, 20, 0.2)',
              cursor: 'pointer'
            }}
            onClick={() => {
              setSelectedFilter(cat);
              sound.playFolderClick();
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Matrix */}
      {filteredCategories.map((cat, idx) => (
        <div key={idx} className="skills-category-block">
          <div className="skills-category-heading">
            <span>{cat.category}</span>
            <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '10px' }}>
              — {cat.description}
            </span>
          </div>

          <div className="skills-tags-grid">
            {cat.items.map((skill, sIdx) => (
              <div key={sIdx} className="skill-tag-card">
                <div className="skill-name-row">
                  <span className="skill-name">{skill.name}</span>
                </div>
                <div className="skill-desc">{skill.description}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
