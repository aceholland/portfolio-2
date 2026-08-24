import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { ExternalLink } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProjectsWindowProps {
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  activeProjectId,
  setActiveProjectId
}) => {

  // Simulation state for Reactor Yield Predictor (physics-surrogate)
  const [inletTemp, setInletTemp] = useState<number>(350);
  const [residenceTime, setResidenceTime] = useState<number>(4.2);
  const [jacketTemp, setJacketTemp] = useState<number>(320);
  const [inletConc, setInletConc] = useState<number>(1.8);

  const activeProject = PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0];

  // Mathematical surrogate approximation formula for interactive demonstration
  const calculateSurrogateYield = () => {
    const tempDiff = inletTemp - jacketTemp;
    const rateConstant = Math.exp(-4200 / inletTemp) * 120000;
    const conversion = 1 - Math.exp(-rateConstant * residenceTime * (1 + 0.05 * inletConc));
    const thermalPenalty = tempDiff > 45 ? (tempDiff - 45) * 0.003 : 0;
    const predictedYield = Math.max(0.12, Math.min(0.965, (conversion * 0.94 - thermalPenalty) * 100));
    return predictedYield.toFixed(2);
  };

  return (
    <div className="projects-window-body">
      {/* Project Selector Tabs */}
      <div className="projects-tabs-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {PROJECTS_DATA.map((proj) => (
          <button
            key={proj.id}
            className={`project-tab-btn ${activeProjectId === proj.id ? 'is-active' : ''}`}
            onClick={() => {
              setActiveProjectId(proj.id);
              sound.playFolderClick();
            }}
            style={{ marginBottom: '4px' }}
          >
            <span>[{proj.number}]</span>
            <span>{proj.title}</span>
          </button>
        ))}
      </div>

      {/* Project Header */}
      <div className="project-header-hero">
        <span className="project-category-tag">{activeProject.category}</span>
        <h2 className="project-main-title" style={{ fontSize: '32px' }}>{activeProject.title}</h2>
        <p className="project-short-summary">{activeProject.shortDesc}</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="project-metrics-grid">
        {activeProject.metrics.map((m, idx) => (
          <div key={idx} className={`metric-card ${m.highlight ? 'highlight' : ''}`}>
            <span className="metric-label">{m.label}</span>
            <span className="metric-value">{m.value}</span>
            {m.note && <span className="metric-note">{m.note}</span>}
          </div>
        ))}
      </div>

      {/* Interactive Simulation / Benchmark Section */}
      {activeProject.id === 'physics-surrogate' && (
        <div className="simulation-playground">
          <div className="sim-header">
            <div className="sim-title">
              SURROGATE MODEL INTERACTIVE PREDICTOR
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-blue-dark)', fontWeight: 600 }}>
              FAST RESIDENCE / THERMAL ESTIMATOR
            </span>
          </div>

          <div className="sim-grid">
            <div className="sim-control-item">
              <div className="sim-control-label">
                <span>Inlet Temp (T_in):</span>
                <span>{inletTemp} K</span>
              </div>
              <input
                type="range"
                min="300"
                max="450"
                value={inletTemp}
                onChange={(e) => setInletTemp(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="sim-control-item">
              <div className="sim-control-label">
                <span>Residence Time (τ):</span>
                <span>{residenceTime} min</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={residenceTime}
                onChange={(e) => setResidenceTime(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="sim-control-item">
              <div className="sim-control-label">
                <span>Jacket Coolant Temp (T_j):</span>
                <span>{jacketTemp} K</span>
              </div>
              <input
                type="range"
                min="280"
                max="400"
                value={jacketTemp}
                onChange={(e) => setJacketTemp(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="sim-control-item">
              <div className="sim-control-label">
                <span>Inlet Concentration (C_A0):</span>
                <span>{inletConc} mol/L</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={inletConc}
                onChange={(e) => setInletConc(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="sim-output-box">
              <div>
                <div className="sim-output-label">PREDICTED SURROGATE REACTION YIELD:</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  Target: Minimize RMSE & differential integration latency
                </div>
              </div>
              <div className="sim-output-val">{calculateSurrogateYield()}%</div>
            </div>
          </div>
        </div>
      )}

      {activeProject.id === 'agricultural-housing-ml' && activeProject.benchmarkData && (
        <div className="benchmark-box">
          <div className="benchmark-title">
            <span>MODEL REGRESSION BENCHMARK (R² SCORE)</span>
            <span>VERIFIED EVALUATION</span>
          </div>
          {activeProject.benchmarkData.map((bm, i) => (
            <div key={i} className={`benchmark-row ${bm.highlight ? 'highlight' : ''}`}>
              <span className="benchmark-model-name">{bm.model}</span>
              <div className="benchmark-bar-track">
                <div
                  className="benchmark-bar-fill"
                  style={{ width: `${bm.r2 * 100}%` }}
                />
              </div>
              <span className="benchmark-score">{bm.r2.toFixed(3)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Sub-projects list grid if any */}
      {activeProject.subProjects && (
        <div style={{ marginTop: '20px', borderTop: '2.5px solid var(--border-strong)', paddingTop: '16px' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '12px', color: 'var(--accent-blue)', fontWeight: 700 }}>
            SUB-PROJECT RELEASES IN THIS ARCHIVE:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: activeProject.id === 'web-apps' ? 'repeat(auto-fill, minmax(240px, 1fr))' : '1fr', gap: '12px' }}>
            {activeProject.subProjects.map((sub, sIdx) => (
              <div key={sIdx} style={{ border: '1.5px solid var(--border-strong)', padding: '14px', background: '#fbfbfa', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                    {sub.title}
                  </div>
                  {sub.desc && (
                    <p style={{ fontSize: '12px', lineHeight: '1.5', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                      {sub.desc}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {sub.githubUrl && (
                    <a
                      href={sub.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-action-btn"
                      style={{ fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' }}
                    >
                      <span>Repository</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                  {sub.demoUrl && (
                    <a
                      href={sub.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-action-btn"
                      style={{ fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--accent-blue)', color: '#ffffff', textTransform: 'uppercase' }}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Description & Engineering Notes */}
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-main)' }}>
          TECHNICAL ARCHITECTURE & VALIDATION
        </h4>
        {activeProject.fullDesc.map((par, i) => (
          <p key={i} style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            {par}
          </p>
        ))}
      </div>

      {/* Technologies */}
      <div style={{ marginTop: '16px' }}>
        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '6px', color: 'var(--text-muted)' }}>
          STACK & DEPENDENCIES
        </h4>
        <div className="project-tech-list">
          {activeProject.technologies.map((t, idx) => (
            <span key={idx} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      {(activeProject.githubUrl || activeProject.demoUrl) && (
        <div className="project-action-footer">
          {activeProject.githubUrl && (
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-cta-btn"
            >
              <span>OPEN REPOSITORY ON GITHUB</span>
              <ExternalLink size={16} />
            </a>
          )}
          {activeProject.demoUrl && (
            <a
              href={activeProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-cta-btn"
              style={{ background: 'var(--accent-blue)', color: '#ffffff', boxShadow: '4px 4px 0px var(--border-strong)' }}
            >
              <span>LAUNCH LIVE DEMO</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
