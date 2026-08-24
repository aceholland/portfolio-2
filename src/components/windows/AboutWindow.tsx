import React from 'react';

export const AboutWindow: React.FC = () => {
  const awards = [
    'Top 5 – GDG Cloud Kolkata 2026',
    'Top 10 – Entrepreneurship Event, IIT Kharagpur 2026',
    'Top 15 – PromptWars Hackathon, Hack2Skill 2026',
    'Rank 28/256 – Techathon 3.0, West Bengal 2026',
    'Finalist (650+ teams) – Kalyani University Hackathon 2026',
    'Finalist – IIT Kharagpur Hackathon 2026',
    'Top 12 – Hult Prize College Round 2026',
    'Selected – International Research Hackathon, NSRI 2026',
    'Mathematics Essay Published – Tom Rocks Maths (Oxford) 2025'
  ];

  const awardsStr = awards.join('   ·   ');

  return (
    <div className="about-window-body">
      <style>{`
        @keyframes customMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          display: inline-block;
          white-space: nowrap;
          animation: customMarquee 35s linear infinite;
        }
      `}</style>
      
      <div className="about-editorial-sheet">
        {/* Editorial Header Note */}
        <div style={{ marginBottom: '24px', borderBottom: '2px solid var(--text-main)', paddingBottom: '12px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', color: 'var(--accent-blue)', fontWeight: 700 }}>
            EDITORIAL STATEMENT // 2026
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '24px', color: 'var(--text-main)', marginTop: '4px' }}>
            "Mathematics is the blueprint; machine learning is the accelerator."
          </div>
        </div>

        {/* Question 1 */}
        <div className="about-question-item">
          <h3 className="about-question-title">
            <span className="yellow-bullet">■</span>
            <span>WHO AM I?</span>
          </h3>
          <p className="about-answer-text">
            I am Anushka Verma, an AI & Machine Learning student and computational researcher. I split my focus between deep learning architectures, computer vision applications, and building fast automated scripts. I thrive on translating statistical physics patterns and complex datasets into responsive, high-performance applications.
          </p>
        </div>

        {/* Question 2 */}
        <div className="about-question-item">
          <h3 className="about-question-title">
            <span className="yellow-bullet">■</span>
            <span>WHAT AM I BUILDING?</span>
          </h3>
          <p className="about-answer-text">
            My work spans telemetry systems like remote photoplethysmography (rPPG) to track heart rates from camera feeds, comparative ML pipelines modeling agricultural parameters, and voice-controlled automated scripts (Jarvis). I also create front-end productivity tools (StellaSyncs planner) and news portals integrated with AI summarization tools.
          </p>
        </div>

        {/* Question 3 */}
        <div className="about-question-item">
          <h3 className="about-question-title">
            <span className="yellow-bullet">■</span>
            <span>WHAT AM I LEARNING?</span>
          </h3>
          <p className="about-answer-text">
            Currently advancing my skills in Linux Systems Administration, cybersecurity fundamentals, and advanced Python frameworks for high-velocity data science.
          </p>
        </div>

        {/* Ticker / Awards */}
        <div style={{ marginTop: '28px', marginBottom: '28px', background: '#f4f4f2', border: '1.5px solid var(--border-strong)', padding: '16px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.08em', marginBottom: '10px' }}>
            AWARDS & COMPETITIVE HIGHLIGHTS:
          </div>
          {/* Animated Marquee Ticker */}
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '12px' }}>
            <div className="marquee-track" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>
              <span style={{ paddingRight: '40px' }}>{awardsStr}</span>
              <span style={{ paddingRight: '40px' }}>{awardsStr}</span>
            </div>
          </div>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', fontSize: '12px', paddingLeft: '16px', color: 'var(--text-secondary)' }}>
            {awards.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        </div>

        {/* Leadership & Additional Context */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
              LEADERSHIP & OUTREACH:
            </div>
            <ul style={{ fontSize: '12px', lineHeight: '1.5', paddingLeft: '16px', color: 'var(--text-secondary)' }}>
              <li>Campus Ambassador — IIT Kharagpur Tech Fest</li>
              <li>Campus Ambassador — IIT Bombay E-Cell</li>
              <li>Campus Ambassador — IIT Bombay Techfest</li>
            </ul>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
              COMMUNICATION:
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Fluent in English, Hindi, and Bengali.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
