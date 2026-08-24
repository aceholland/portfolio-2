import { ProjectData } from '../types';

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'astronomy-ml',
    number: '01',
    title: 'ML in Astronomy Ensemble',
    category: 'ASTROPHYSICAL DATA SCIENCE',
    shortDesc: 'A compilation of Machine Learning applications predicting solar flares, stellar luminosity, and exoplanet detection.',
    fullDesc: [
      'Applying predictive models to astronomical datasets to forecast celestial events and identify exoplanetary systems.',
      'Includes three main sub-projects targeting high-risk solar eruptions, stellar classification, and transit signal analysis.'
    ],
    technologies: ['Python', 'Scikit-learn', 'LightGBM', 'XGBoost', 'Pandas', 'NumPy'],
    metrics: [
      { label: 'MODELS USED', value: 'LightGBM/RF', highlight: true },
      { label: 'EVALUATION', value: 'Recall/F1-Score', note: 'Prioritized predicting rare flare events' }
    ],
    tags: ['ASTRONOMY', 'SOLAR FLARES', 'EXOPLANETS', 'STELLAR PHYSICS'],
    subProjects: [
      {
        title: 'M5 Solar Flare Prediction (24hr Lead Time)',
        desc: 'Predicting the Sun\'s most dangerous eruptions 24 hours in advance using space-weather magnetometer data.',
        githubUrl: 'https://github.com/aceholland/Predicting-Sun-s-Most-Dangerous-Eruptions---24-hours-before'
      },
      {
        title: 'Stellar Luminosity Prediction',
        desc: 'Regression and classification modeling to predict stellar physical features and absolute magnitude.',
        githubUrl: 'https://github.com/aceholland/IIT-Guwahati--Assignment-2'
      },
      {
        title: 'Exoplanet Transit Detection',
        desc: 'Deep binary classification to isolate exoplanetary transit signatures from Kepler space telescope light curves.',
        githubUrl: 'https://github.com/aceholland/IIT-Guwahati--Assignment-3'
      }
    ]
  },
  {
    id: 'agricultural-housing-ml',
    number: '02',
    title: 'Crop & Housing Regression Benchmark',
    category: 'COMPARATIVE REGRESSION PIPELINES',
    shortDesc: 'Comparative machine learning benchmarks analyzing agricultural crop yields and Boston housing price indicators.',
    fullDesc: [
      'Engineered complete Exploratory Data Analysis (EDA), feature scaling, and multi-model regression pipelines to evaluate prediction accuracies on physical/geographical datasets.'
    ],
    technologies: ['Python', 'Random Forest', 'XGBoost', 'Linear Regression', 'Scikit-learn'],
    metrics: [
      { label: 'CROP YIELD R²', value: '0.987', highlight: true, note: 'Random Forest Ensemble' },
      { label: 'ARCHITECTURES', value: '5 Models', note: 'Linear to Gradient Boosted' }
    ],
    tags: ['REGRESSION PIPELINE', 'EDA', 'RANDOM FOREST', 'MODEL BENCHMARKS'],
    subProjects: [
      {
        title: 'Crop Yield Prediction',
        desc: 'Analyzing climate, rainfall, and soil parameters to predict agricultural crop output yields.',
        githubUrl: 'https://github.com/aceholland/Crop-Yield-Prediction-ML_Trying-different-Models'
      },
      {
        title: 'Boston House Price Prediction',
        desc: 'Multi-variable linear regression analyzing socioeconomic and geographical factors influencing housing value.',
        githubUrl: 'https://github.com/aceholland/Boston-House-Price-Prediction_-ML-_-Linear-Regression'
      }
    ]
  },
  {
    id: 'web-apps',
    number: '03',
    title: 'Interactive Web Applications Portfolio',
    category: 'FRONTEND & INTERACTIVE SYSTEMS',
    shortDesc: 'A portfolio of utility and AI-powered web applications built using HTML, CSS, JavaScript, and React.',
    fullDesc: [
      'A collection of digital queue management, mental health trackers, planning tools, and AI summarizers focused on high-performance UX.'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vercel'],
    metrics: [
      { label: 'APPLICATIONS', value: '08 Active', highlight: true },
      { label: 'DEPLOYMENT', value: 'Vercel / Git', note: 'CI/CD pipeline' }
    ],
    tags: ['WEB DEVELOPMENT', 'INTERACTIVE UI', 'AI UTILITIES', 'REACT APPS'],
    subProjects: [
      {
        title: 'Digital Queue System (PromptWars)',
        desc: 'Collaborative real-time queuing dashboard built for PromptWars.',
        githubUrl: 'https://github.com/aceholland/promptwars',
        demoUrl: 'https://promptwars-rho-two.vercel.app'
      },
      {
        title: 'Student Mental Health Tracker',
        desc: 'Dashboard checking indicators and tracking mental well-being for academic environments.',
        githubUrl: 'https://github.com/aceholland/Student_Mental_Health_Tracker',
        demoUrl: 'https://student-mental-health-tracker.vercel.app'
      },
      {
        title: 'StellaSyncs Digital Planner',
        desc: 'Interactive schedule organizer and tactical daily productivity planner.',
        githubUrl: 'https://github.com/aceholland/StellaSyncs-Digital-Planner',
        demoUrl: 'https://stella-syncs-digital-planner.vercel.app'
      },
      {
        title: 'AI News Summarizer Dashboard',
        desc: 'Live news board that leverages LLMs to compile and summarize top global articles.',
        githubUrl: 'https://github.com/aceholland/IIT-Kharagpur-Assignment-4--News-Dashboard-with-AI-Summarizer',
        demoUrl: 'https://news-dashboard-with-ai-summarizer.vercel.app'
      },
      {
        title: 'My Diary / Portfolio',
        desc: 'Interactive personal journaling platform and media archive.',
        githubUrl: 'https://github.com/aceholland/mydiary_portfolio',
        demoUrl: 'https://mydiary-portfolio.vercel.app'
      },
      {
        title: 'Habit Tracker',
        desc: 'Habit-building calendar dashboard submitted for IIT Kharagpur assignments.',
        githubUrl: 'https://github.com/aceholland/IIT-Kharagpur-Assignment-3',
        demoUrl: 'https://iit-kharagpur-assignment-3.vercel.app'
      },
      {
        title: 'College Website (Synapse)',
        desc: 'Modern responsive portal landing page built for college event organization.',
        githubUrl: 'https://github.com/aceholland/synapse-website'
      },
      {
        title: 'Minesweeper Game',
        desc: 'Pure client-side Minesweeper implementation with customizable difficulty grids.',
        githubUrl: 'https://github.com/aceholland/minesweepergame_iitkgp2'
      }
    ]
  },
  {
    id: 'rppg-heart-rate',
    number: '04',
    title: 'Contactless Heart Rate Detection (rPPG)',
    category: 'TELEMEDICINE & COMPUTER VISION',
    shortDesc: 'A remote photoplethysmography platform using face scanning to estimate heart rate (BPM) without physical sensors.',
    fullDesc: [
      ' rPPG measures micro-cardiac color variations in human skin cells from normal camera feeds.',
      'Developed as a hackathon team project, it processes continuous video streams, extracts region-of-interest (ROI) skin metrics, normalizes color channel changes, and applies spectral analysis to calculate BPM in real-time.',
      'Highly applicable for contactless patient monitoring and virtual telemedicine platforms.'
    ],
    demoUrl: 'https://nova-pulse-chi.vercel.app',
    technologies: ['Python', 'OpenCV', 'AI/ML', 'Signal Processing', 'WebRTC'],
    metrics: [
      { label: 'SCAN SPEED', value: '30 FPS', note: 'Real-time analysis' },
      { label: 'ACCURACY', value: '±3 BPM', highlight: true, note: 'Compared to pulse oximeter' }
    ],
    tags: ['COMPUTER VISION', 'RPPG', 'HEALTH TECH', 'OPENCV', 'AI SIGNAL']
  },
  {
    id: 'physics-surrogate',
    number: '05',
    title: 'Physics-Aware Reactor Yield Predictor',
    category: 'PHYSICS-INFORMED MACHINE LEARNING',
    shortDesc: 'ML regression ensembles replacing complex differential equations to estimate chemical reactor product yield.',
    fullDesc: [
      'Traditional continuous-flow reactor thermal calculations require solving computationally expensive systems of differential equations.',
      'This surrogate model substitutes physical equations with gradient boosted regression ensembles.',
      'Incorporates physics-informed features: residence times (τ), thermalジャケット offsets (ΔT), and chemical concentration variables.'
    ],
    githubUrl: 'https://github.com/aceholland/Reactor_Yield_Predictor',
    technologies: ['Python', 'XGBoost', 'Random Forest', 'SciPy', 'Pandas'],
    metrics: [
      { label: 'COMPUTE SPEEDUP', value: '120x', highlight: true, note: 'vs. numerical ODE solver' },
      { label: 'EVALUATION', value: 'RMSE / R²', note: 'Rigorously cross-validated' }
    ],
    tags: ['SURROGATE MODEL', 'PROCESS AUTOMATION', 'PHYSICS ML', 'XGBOOST']
  },
  {
    id: 'jarvis-voice',
    number: '06',
    title: 'Jarvis Voice Assistant',
    category: 'AUTOMATION & AGENTIC AI',
    shortDesc: 'A local voice assistant executing shell tasks and browser automation using speech-to-text and AI agents.',
    fullDesc: [
      'A personal voice assistant framework automating common system procedures (launching development terminals, checking schedules, controlling media).'
    ],
    githubUrl: 'https://github.com/aceholland/trial_Jarvis_01',
    technologies: ['Python', 'Speech Recognition', 'NLP', 'System Automation'],
    metrics: [
      { label: 'LATENCY', value: '0.45s', note: 'Local response trigger' }
    ],
    tags: ['SPEECH TO TEXT', 'AUTOMATION', 'LOCAL AGENT', 'PYTHON SCRIPTS']
  },
  {
    id: 'chatbot-whatsapp',
    number: '07',
    title: 'AI Automatic WhatsApp Chatbot',
    category: 'NLP & CONVERSATIONAL AUTOMATION',
    shortDesc: 'An automated chatbot connecting NLP models directly to client message interfaces for real-time customer replies.',
    fullDesc: [
      'Integrates local semantic understanding modules with browser automation scripts to parse, classify, and trigger responses to incoming client inquiries.'
    ],
    githubUrl: 'https://github.com/aceholland/automatereply_AIchatbot',
    technologies: ['Python', 'NLP', 'Selenium', 'Regex Matching'],
    metrics: [
      { label: 'RESPONSE RATE', value: '100%', note: '24/7 autonomous runtime' }
    ],
    tags: ['NLP', 'BOT DEVELOPMENT', 'PROCESS AUTOMATION', 'CLIENT ROUTING']
  }
];
