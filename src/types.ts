export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription: string;
  category: 'react' | 'ui' | 'fullstack' | 'security';
  tags: string[];
  features: string[];
  metrics?: string;
  readingTime?: string;
  liveUrl?: string;
  githubUrl?: string;
  iconName: string;
  featured: boolean;
  privacyNote?: string;
  developerInfo?: {
    name: string;
    role: string;
  };
  overviewHighlights?: {
    label: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  isRemote?: boolean;
  bulletPoints: string[];
  technologies: string[];
  summaryHighlight: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    badge?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  highlights?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  levelPercentage: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
