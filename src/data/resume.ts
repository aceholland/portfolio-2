export interface ResumeItem {
  heading: string;
  subheading?: string;
  date?: string;
  location?: string;
  bullets: string[];
  metrics?: string[];
}

export interface ResumeSection {
  title: string;
  items: ResumeItem[];
}

export interface ResumeData {
  name: string;
  role: string;
  location: string;
  status: string;
  contact: {
    github: string;
    email: string;
    portfolio: string;
  };
  summary: string;
  sections: ResumeSection[];
}

export const RESUME_DATA: ResumeData = {
  name: 'ANUSHKA VERMA',
  role: 'AI / ML ENGINEER & COMPUTATIONAL SYSTEMS',
  location: 'KOLKATA, INDIA / REMOTE',
  status: 'RESEARCH & SOFTWARE ROLES / COLLABORATIONS',
  contact: {
    github: 'https://github.com/aceholland',
    email: 'verma.anushka2007@gmail.com',
    portfolio: 'https://github.com/aceholland'
  },
  summary: 'Data Science & Artificial Intelligence student focused on predictive models, computer vision applications, and system automation. Experienced in cross-framework machine learning evaluation, prompt engineering optimization, and remote photoplethysmography (rPPG). Competitive hackathon finalist with leadership experience in campus tech ecosystems.',
  sections: [
    {
      title: 'EDUCATION & SCHOLARSHIP',
      items: [
        {
          heading: 'IIT Madras (Indian Institute of Technology)',
          subheading: 'Bachelor of Science (BS) in Data Science and Applications',
          date: 'Jan 2025 – 2029',
          location: 'Chennai, India (Hybrid)',
          bullets: [
            'Rigorous foundations in statistics, programming, database management, machine learning, and application development.',
            'Collaborating on predictive modeling and regression benchmarking for domain-specific problems.'
          ]
        },
        {
          heading: 'Techno India University',
          subheading: 'Bachelor of Technology (B.Tech) in Computer Science (AI & ML)',
          date: '2025 – 2029',
          location: 'Kolkata, India',
          bullets: [
            'Specializing in Deep Learning architectures, computer vision pipelines, and intelligent automation systems.',
            'Active member of competitive coding and hackathon dev teams.'
          ]
        }
      ]
    },
    {
      title: 'KEY HACKATHONS & ACHIEVEMENTS',
      items: [
        {
          heading: 'rPPG Contactless Heart Rate Monitor',
          subheading: 'Hackathon Finalist Development (rPPG & OpenCV)',
          date: '2026',
          bullets: [
            'Co-developed a telemedicine remote photoplethysmography platform estimating heart rate from face video feeds.',
            'Implemented real-time RGB color channel analysis over facial regions of interest to extract heart rate frequencies.',
            'Finalist at several key hackathons including Kalyani University, IIT Kharagpur, and GDG Cloud Kolkata.'
          ]
        }
      ]
    }
  ]
};
