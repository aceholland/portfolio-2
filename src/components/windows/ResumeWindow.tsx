import React from 'react';
import { RESUME_DATA, ResumeItem } from '../../data/resume';
import { Printer, ExternalLink, Download } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ResumeWindow: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-window-body">
      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1.5px solid var(--border-strong)', paddingBottom: '12px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>
          CURRICULUM VITAE // VERIFIED SYSTEM DOSSIER
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href="/Anushka_Verma_Resume.pdf"
            download="Anushka_Verma_Resume.pdf"
            className="contact-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--accent-blue)', color: '#ffffff' }}
            onClick={() => sound.playFolderClick()}
          >
            <Download size={13} />
            <span>DOWNLOAD CV</span>
          </a>
          <button
            onClick={handlePrint}
            className="contact-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={13} />
            <span>PRINT DOSSIER</span>
          </button>
          <a
            href={RESUME_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ExternalLink size={13} />
            <span>GITHUB PROFILE</span>
          </a>
        </div>
      </div>

      {/* Paper Document Representation */}
      <div className="resume-paper-document">
        <header className="resume-header">
          <h1 className="resume-name">{RESUME_DATA.name}</h1>
          <div className="resume-role">{RESUME_DATA.role}</div>
          <div className="resume-meta-bar">
            <span>LOCATION: {RESUME_DATA.location}</span>
            <span>•</span>
            <span>GITHUB: {RESUME_DATA.contact.github}</span>
            <span>•</span>
            <span>STATUS: {RESUME_DATA.status}</span>
          </div>
          <p style={{ marginTop: '12px', fontSize: '12.5px', lineHeight: '1.55', color: 'var(--text-secondary)' }}>
            {RESUME_DATA.summary}
          </p>
        </header>

        {RESUME_DATA.sections.map((section, idx) => (
          <section key={idx} className="resume-section">
            <h3 className="resume-section-title">{section.title}</h3>
            {section.items.map((item: ResumeItem, itemIdx: number) => (
              <div key={itemIdx} className="resume-item">
                <div className="resume-item-top">
                  <span className="resume-item-heading">{item.heading}</span>
                  {item.date && <span className="resume-item-date">{item.date}</span>}
                </div>
                {item.subheading && (
                  <div className="resume-item-subheading">{item.subheading}</div>
                )}
                <ul className="resume-bullets">
                  {item.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
                {item.metrics && (
                  <div className="resume-badge-group">
                    {item.metrics.map((met: string, mIdx: number) => (
                      <span key={mIdx} className="resume-badge">{met}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};
