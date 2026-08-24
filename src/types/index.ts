export type WindowId = 'projects' | 'resume' | 'skills' | 'about' | 'contact';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface ProjectMetric {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

export interface SubProject {
  title: string;
  desc?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string[];
  githubUrl?: string;
  demoUrl?: string;
  technologies: string[];
  metrics: ProjectMetric[];
  benchmarkData?: { model: string; r2: number; highlight?: boolean }[];
  simulationParams?: { name: string; label: string; min: number; max: number; default: number; unit: string }[];
  tags: string[];
  subProjects?: SubProject[];
}

export interface SkillCategory {
  category: string;
  description: string;
  items: {
    name: string;
    level: 'Core' | 'Advanced' | 'Proficient';
    category: string;
    description: string;
    icon?: string;
  }[];
}

export interface DesktopFolderItem {
  id: WindowId;
  projectId?: string; // Maps folders directly to specific projects
  label: string;
  sublabel: string;
  xPercent: number;
  yPercent: number;
  badge?: string;
  question?: string;
}
