import { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'LANGUAGES',
    description: 'Languages used for scientific calculation, database queries, and web systems.',
    items: [
      { name: 'Python', level: 'Core', category: 'LANG', description: 'Primary language for ML, scientific scripts, and automation' },
      { name: 'C', level: 'Proficient', category: 'LANG', description: 'Systems programming, memory mechanics & fundamental algorithms' },
      { name: 'Java', level: 'Proficient', category: 'LANG', description: 'Object-oriented programming and application development' },
      { name: 'JavaScript', level: 'Advanced', category: 'LANG', description: 'Dynamic web behavior, runtime logic, and frontend interactions' },
      { name: 'SQL', level: 'Proficient', category: 'LANG', description: 'Structured query creation and relational database schemas' },
      { name: 'HTML & CSS', level: 'Core', category: 'LANG', description: 'Semantic layout composition and modern grid layouts' },
      { name: 'Node.js', level: 'Proficient', category: 'LANG', description: 'Server-side runtimes and package ecosystem pipelines' }
    ]
  },
  {
    category: 'AI / ML & DATA SCIENCE',
    description: 'Tabular prediction models, deep learning nets, and scientific matrices.',
    items: [
      { name: 'Machine Learning', level: 'Core', category: 'ML', description: 'Supervised classification, regression, and model validation' },
      { name: 'Deep Learning', level: 'Core', category: 'ML', description: 'Foundations of ANN, CNN, and RNN network architectures' },
      { name: 'OpenCV & rPPG', level: 'Advanced', category: 'ML', description: 'Computer vision pixel manipulation and blood-flow signal extraction' },
      { name: 'Pandas', level: 'Core', category: 'ML', description: 'Tabular dataset wrangling, cleansing, and formatting' },
      { name: 'NumPy', level: 'Core', category: 'ML', description: 'High-speed array/matrix math and mathematical arrays' },
      { name: 'Jupyter Notebook', level: 'Core', category: 'ML', description: 'Iterative data workflows, visualization, and validation logs' }
    ]
  },
  {
    category: 'PROMPT ENGINEERING',
    description: 'Optimizing and structuring interactions with large language models.',
    items: [
      { name: 'LLM Prompt Design', level: 'Advanced', category: 'PROMPT', description: 'Zero/few-shot prompting configurations' },
      { name: 'Chain-of-Thought', level: 'Advanced', category: 'PROMPT', description: 'Decomposing complex reasoning processes for reliable LLM output' },
      { name: 'System Optimization', level: 'Core', category: 'PROMPT', description: 'Structuring robust guidelines to anchor LLM persona boundaries' }
    ]
  },
  {
    category: 'TOOLS & PLATFORMS',
    description: 'Infrastructure, environment setups, and repositories.',
    items: [
      { name: 'Git & GitHub', level: 'Core', category: 'TOOL', description: 'Version control branch strategies, repository distribution & actions' },
      { name: 'Linux Systems', level: 'Advanced', category: 'TOOL', description: 'POSIX command utilities, automation scripts & environment setup' },
      { name: 'VS Code', level: 'Core', category: 'TOOL', description: 'Primary environment configuring custom debugger runtimes' }
    ]
  },
  {
    category: 'DOMAINS',
    description: 'Core application focus areas combining research and software engineering.',
    items: [
      { name: 'Data Science', level: 'Core', category: 'DOMAIN', description: 'Extracting knowledge and predicting outcomes from complex datasets' },
      { name: 'ML in Astronomy', level: 'Advanced', category: 'DOMAIN', description: 'Predictive space-weather modeling and Kepler transit extraction' },
      { name: 'Health Tech AI', level: 'Advanced', category: 'DOMAIN', description: 'Remote photoplethysmography and contactless bio-monitoring' },
      { name: 'Web Development', level: 'Core', category: 'DOMAIN', description: 'Interactive application architectures and client portal systems' }
    ]
  },
  {
    category: 'SOFT SKILLS & LEADERSHIP',
    description: 'Collaborative team mechanics, campus outreach, and creative reasoning.',
    items: [
      { name: 'Leadership & Ambassadorship', level: 'Core', category: 'SOFT', description: 'Techfest Campus Ambassador (IIT Kharagpur, IIT Bombay E-Cell)' },
      { name: 'Problem Solving', level: 'Core', category: 'SOFT', description: 'Applying analytical logic to break down multi-variable dilemmas' },
      { name: 'Public Speaking', level: 'Core', category: 'SOFT', description: 'Presenting research concepts and pitch presentations at conferences' },
      { name: 'Team Collaboration', level: 'Core', category: 'SOFT', description: 'Cross-functional engineering and team coordination in hackathons' }
    ]
  }
];
