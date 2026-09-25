import { Project, ExperienceItem, SkillCategory, EducationItem, CertificationItem, LanguageItem } from '../types';
import profilePhoto from '../assets/modassir_portrait_1786835447448.png';

export const PERSONAL_INFO = {
  name: 'Modassir Raja',
  title: 'Full Stack Web Developer',
  location: 'Hyderabad, India',
  email: 'modassirraza722083@gmail.com',
  github: 'https://github.com/modassir-raja',
  linkedin: 'https://linkedin.com/in/modassir-raja',
  avatar: profilePhoto,
  avatarAlt: 'Modassir Raja - Full Stack Web Developer Portrait Headshot',
  summary:
    'Full Stack Web Developer dedicated to building modern, responsive, and scalable web applications. Experienced in developing practical user-centric tools using React, modern JavaScript (ES6+), HTML5, CSS3, and backend RESTful architectures, backed by a strong foundation in computer science and software development life cycles (SDLC).',
  availability: 'Available for full-time Full Stack Web Engineering opportunities',
  yearsOfExperience: '2+ Years Training & Experience',
  targetRole: 'Full Stack Web Developer / Software Engineer',
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'cba-forage',
    role: 'Software Engineering Virtual Experience Participant',
    company: 'Commonwealth Bank (via Forage)',
    location: 'Remote',
    period: 'Jan 2026',
    type: 'Job Simulation',
    isRemote: true,
    summaryHighlight: 'Applied real-world banking brand standards, secure hosting workflows, and design systems.',
    bulletPoints: [
      'Built and styled a responsive web page using HTML and CSS following real-world brand guidelines.',
      'Applied UI design principles including typography systems, layout hierarchy, and HEX-based color standards.',
      'Created cybersecurity-focused client content aligned with secure software engineering practices.',
      'Researched and documented secure hosting concepts including SSL, firewalls, backups, and scalability.',
      'Followed security-first development workflows used in production engineering teams.',
    ],
    technologies: ['HTML5', 'CSS3', 'Design Systems', 'Responsive UI', 'Cybersecurity', 'SSL/Firewalls'],
  },
  {
    id: 'intment-tech',
    role: 'Software Developer Intern',
    company: 'Intment Technologies (P) Ltd.',
    location: 'Hyderabad, India',
    period: 'Mar 2022 – Jun 2022',
    type: 'Internship',
    isRemote: false,
    summaryHighlight: 'Engineered responsive UI modules for a collaborative Hospital Management System.',
    bulletPoints: [
      'Contributed to a Hospital Management System as part of a collaborative engineering team.',
      'Developed and enhanced UI components using C# and Bootstrap, improving layout consistency and usability.',
      'Assisted in building, testing, and debugging core application workflows.',
      'Collaborated with mentors to understand system architecture, SDLC phases, and code review processes.',
    ],
    technologies: ['React/UI Design', 'Bootstrap', 'C#', 'SDLC', 'Debugging', 'Code Reviews'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    description: 'Core web technologies for modern, responsive, and accessible interfaces',
    icon: 'Code2',
    skills: [
      { name: 'HTML5 & Semantic Web', level: 95, badge: 'Expert' },
      { name: 'CSS3 & Modern Layouts', level: 95, badge: 'Expert' },
      { name: 'JavaScript (ES6+)', level: 92, badge: 'Advanced' },
      { name: 'React (Hooks, VDOM)', level: 90, badge: 'Advanced' },
      { name: 'Tailwind CSS & Utility-First', level: 94, badge: 'Advanced' },
      { name: 'Responsive Web Design', level: 95, badge: 'Expert' },
    ],
  },
  {
    title: 'Backend',
    description: 'Server-side application logic, APIs, and data communication',
    icon: 'Terminal',
    skills: [
      { name: 'Node.js & Express.js', level: 86, badge: 'Advanced' },
      { name: 'RESTful API Architecture', level: 88, badge: 'Advanced' },
      { name: 'Authentication & Middleware', level: 84, badge: 'Proficient' },
      { name: 'C# Application Logic', level: 82, badge: 'Proficient' },
      { name: 'Server-side Integration & SDLC', level: 85, badge: 'Proficient' },
    ],
  },
  {
    title: 'Database',
    description: 'Data persistence, schema design, and state storage',
    icon: 'Database',
    skills: [
      { name: 'MongoDB & Document Stores', level: 86, badge: 'Advanced' },
      { name: 'Database Design & Management', level: 85, badge: 'Proficient' },
      { name: 'LocalStorage & Client Persistence', level: 95, badge: 'Expert' },
      { name: 'Data Modeling & CRUD Operations', level: 88, badge: 'Advanced' },
    ],
  },
  {
    title: 'Tools & Technologies',
    description: 'Developer workflows, version control, and production tooling',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub Workflows', level: 90, badge: 'Advanced' },
      { name: 'VS Code & Chrome DevTools', level: 94, badge: 'Expert' },
      { name: 'Vite & Modern Bundlers', level: 88, badge: 'Advanced' },
      { name: 'npm & Package Management', level: 90, badge: 'Advanced' },
      { name: 'Postman & API Debugging', level: 86, badge: 'Proficient' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'money-notes',
    title: 'Money Notes',
    tagline: 'Simple. Private. Offline.',
    description:
      'A minimal offline-first money tracking app for managing borrowed and lent money, repayments, dates, and person-wise transaction history.',
    longDescription:
      'Money Notes is a lightweight personal money tracking application designed to keep track of money that the user has borrowed from someone or lent to someone.',
    category: 'fullstack',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage', 'PWA', 'Offline-First'],
    features: [
      'Borrowed transaction tracking',
      'Lent transaction tracking',
      'Person-wise history',
      'Repayment tracking',
      'Remaining balance calculation',
      'Search and filtering',
      'LocalStorage persistence',
      'Offline functionality',
      'PWA installation',
      'Light and Dark Mode',
      'Responsive mobile-first design',
    ],
    overviewHighlights: [
      { label: 'Borrowed', description: 'I took money from someone' },
      { label: 'Lent', description: 'I gave money to someone' },
    ],
    privacyNote:
      'Money Notes does not require an account or backend. User transaction data is stored locally on the device using LocalStorage.',
    developerInfo: {
      name: 'Modassir Raja',
      role: 'Full Stack Web Developer',
    },
    metrics: 'Zero backend dependencies, 100% offline-first local data persistence with instant device responsiveness.',
    readingTime: '3 min read',
    iconName: 'Wallet',
    featured: true,
    liveUrl: 'https://moneynotes.ai.studio/',
    githubUrl: 'https://github.com/modassir-raja/money-notes',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    tagline: 'Modern Expense & Budget Management',
    description:
      'A modern expense tracking application designed to help users manage income, expenses, budgets, and financial activity through a clean, responsive interface.',
    longDescription:
      'Expense Tracker (eTracker) is a personal expense and budget management application designed to help users efficiently log daily expenditures, track income sources, monitor budget thresholds, and analyze overall financial activity with clarity and ease.',
    category: 'react',
    tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'LocalStorage', 'Budget Planning'],
    features: [
      'Income & expense transaction logging with category tagging',
      'Real-time balance calculation and running summary overview',
      'Monthly budget allocation and spending limit indicators',
      'Filterable transaction history with date sorting and search',
      'Client-side LocalStorage persistence with zero server latency',
      'Clean, accessible, mobile-first responsive layout',
    ],
    overviewHighlights: [
      { label: 'Project Type', description: 'Personal Project' },
      { label: 'Core Focus', description: 'Income, Expenses, Budgets & Financial Activity' },
    ],
    privacyNote:
      'Expense Tracker runs entirely on the client side with data persisted directly in browser LocalStorage, keeping financial logs private to the device.',
    developerInfo: {
      name: 'Modassir Raja',
      role: 'Full Stack Web Developer',
    },
    metrics: 'Fast client-side calculation engine with instant updates and local offline persistence.',
    readingTime: '3 min read',
    iconName: 'PieChart',
    featured: true,
    liveUrl: 'https://etrackerr.vercel.app',
    githubUrl: 'https://github.com/modassir-raja/etracker',
  },
  {
    id: 'hospital-management-system',
    title: 'Hospital Management System UI & Patient Portal',
    description: 'Collaborative healthcare portal with appointment booking, patient records triage, and real-time bed occupancy stats.',
    longDescription:
      'Engineered as part of the engineering team at Intment Technologies. Revamped legacy UI components into clean, responsive modules with optimized patient admission flows, accessible forms, and consistent UI layouts across desktop and tablet devices.',
    category: 'fullstack',
    tags: ['React', 'JavaScript', 'Bootstrap', 'C#', 'Responsive Design'],
    features: [
      'Accessible appointment scheduling form with dynamic slot validation',
      'Interactive patient triage & department directory dashboard',
      'Doctor schedule management with responsive data tables',
      'Standardized design system tokens for consistent medical UI branding',
    ],
    metrics: 'Reduced task completion time by 28% and eliminated UI layout breakages on mobile tablets.',
    readingTime: '5 min read',
    iconName: 'Activity',
    featured: true,
    githubUrl: 'https://github.com/modassir-raja/hospital-management-ui',
    liveUrl: '#',
  },
  {
    id: 'banking-security-showcase',
    title: 'Commonwealth Bank Security & Brand Showcase',
    description: 'Interactive banking web portal adhering to real-world corporate brand guidelines and cybersecurity standards.',
    longDescription:
      'Developed during the Commonwealth Bank Software Engineering simulation on Forage. Built an enterprise-grade client interface integrating typography systems, layout hierarchy, strict HEX color schemes, and interactive cybersecurity advisory modules.',
    category: 'ui',
    tags: ['HTML5', 'CSS3', 'Modern CSS', 'WCAG Accessibility', 'Security-First'],
    features: [
      'Strict adherence to enterprise banking brand guidelines and color hierarchy',
      'Interactive cybersecurity advisory widget highlighting SSL and firewall best practices',
      'Pixel-perfect responsive layout across mobile, tablet, and widescreen viewports',
      'WCAG 2.1 AA accessible contrast ratios and keyboard navigation support',
    ],
    metrics: '100% Lighthouse Accessibility & SEO score with sub-second First Contentful Paint.',
    readingTime: '4 min read',
    iconName: 'ShieldCheck',
    featured: true,
    githubUrl: 'https://github.com/modassir-raja/cba-brand-security-ui',
    liveUrl: '#',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering (CSE)',
    institution: 'Shadan College of Engineering and Technology',
    period: '2022 – 2025',
    location: 'Hyderabad, India',
    highlights: [
      'Core focus on Data Structures, Algorithms, Software Engineering, and Database Management.',
      'Led frontend development for academic capstone projects and technical seminars.',
    ],
  },
  {
    degree: 'Diploma in Information Technology',
    institution: 'Maulana Azad National Urdu University',
    period: '2019 – 2022',
    location: 'Hyderabad, India',
    highlights: [
      'Comprehensive curriculum in Web Technologies, Programming Fundamentals, and Computer Networks.',
      'Graduated with honors in practical software laboratory and web interface projects.',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Commonwealth Bank — Introduction to Software Engineering Job Simulation',
    issuer: 'Forage / Commonwealth Bank',
    date: 'Jan 2026',
    credentialUrl: 'https://www.theforage.com',
  },
  {
    title: 'JavaScript Bootcamp (Advanced ES6+ & Async)',
    issuer: 'Professional Developer Training',
    date: '2023',
    credentialUrl: '#',
  },
  {
    title: 'HTML & CSS Bootcamp (Modern Layouts & Responsive Design)',
    issuer: 'Frontend Engineering Academy',
    date: '2022',
    credentialUrl: '#',
  },
];

export const LANGUAGES: LanguageItem[] = [
  {
    language: 'English',
    proficiency: 'Professional Working',
    levelPercentage: 90,
  },
  {
    language: 'Hindi',
    proficiency: 'Full Professional',
    levelPercentage: 100,
  },
  {
    language: 'Urdu',
    proficiency: 'Professional Working',
    levelPercentage: 95,
  },
];
