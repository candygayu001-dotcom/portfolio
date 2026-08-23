export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  about: string;
  avatar: string;
  socials: { label: string; href: string; icon: string }[];
}

export interface StudyItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  grade: string;
}

export interface JobItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export const profile: Profile = {
  name: 'Alex Rivera',
  title: 'Full-Stack Engineer & UI Architect',
  tagline: 'I build fluid, human-centered software experiences.',
  location: 'San Francisco, CA',
  email: 'alex.rivera@example.com',
  phone: '+1 (415) 555-0142',
  bio: 'Engineer obsessed with the intersection of clean architecture and delightful interfaces. Six years turning ambiguous problems into shipped products used by millions. Currently exploring real-time collaboration and AI-assisted tooling.',
  about: 'I am a product-minded engineer who turns complex ideas into calm, intuitive digital experiences. My work blends thoughtful interaction design with resilient systems, helping teams move from a rough first concept to a product people genuinely enjoy using.',
  avatar:
    'https://images.unsplash.com/photo-1633332755192-727a05c33ad0?w=400&h=400&fit=crop&crop=faces',
  socials: [
    { label: 'GitHub', href: 'https://github.com', icon: 'Github' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
  ],
};

export const studies: StudyItem[] = [
  {
    id: 's1',
    degree: 'M.S. Computer Science',
    institution: 'Stanford University',
    period: '2018 — 2020',
    description:
      'Specialized in Human-Computer Interaction and distributed systems. Thesis on real-time collaborative editing primitives.',
    grade: 'GPA 3.92 / 4.0',
  },
  {
    id: 's2',
    degree: 'B.S. Software Engineering',
    institution: 'UC Berkeley',
    period: '2014 — 2018',
    description:
      'Foundations in algorithms, databases, and software design. Graduated with honors. President of the ACM student chapter.',
    grade: 'GPA 3.88 / 4.0',
  },
  {
    id: 's3',
    degree: 'Front-End Specialization',
    institution: 'Coursera / Meta',
    period: '2021',
    description:
      'Advanced coursework in React, accessibility, and design systems. Capstone: an open-source component library.',
    grade: 'Certificate with Distinction',
  },
];

export const jobs: JobItem[] = [
  {
    id: 'j1',
    role: 'Senior Software Engineer',
    company: 'Nimbus Labs',
    period: '2022 — Present',
    location: 'San Francisco, CA',
    description:
      'Lead engineer on a real-time collaboration platform serving 2M+ monthly active users.',
    highlights: [
      'Architected the CRDT sync engine, reducing conflict rate by 94%',
      'Mentored 5 engineers; established the front-end guild and design-token system',
      'Cut initial load time from 4.2s to 1.1s via code-splitting and edge caching',
    ],
  },
  {
    id: 'j2',
    role: 'Full-Stack Engineer',
    company: 'Lumen Health',
    period: '2020 — 2022',
    location: 'Remote',
    description:
      'Built patient-facing dashboards and the clinician portal for a Series B healthtech startup.',
    highlights: [
      'Shipped HIPAA-compliant messaging used by 12,000+ patients',
      'Designed the data pipeline ingesting 40M records with sub-second query latency',
      'Owned the component library adopted across 4 product teams',
    ],
  },
  {
    id: 'j3',
    role: 'Software Engineering Intern',
    company: 'Google',
    period: 'Summer 2019',
    location: 'Mountain View, CA',
    description:
      'Worked on the Chrome DevTools team improving performance profiling.',
    highlights: [
      'Built a flame-chart overlay adopted in the next DevTools release',
      'Wrote design docs reviewed by 3 senior engineers',
    ],
  },
];

export const achievements: AchievementItem[] = [
  {
    id: 'a1',
    title: 'AWS Solutions Architect — Professional',
    issuer: 'Amazon Web Services',
    date: '2023',
    description: 'Top-tier cloud architecture certification covering multi-tier, resilient systems.',
    icon: 'Cloud',
  },
  {
    id: 'a2',
    title: '1st Place — Global Hackathon 2022',
    issuer: 'Major League Hacking',
    date: '2022',
    description: 'Led a 4-person team to build an AI accessibility tool in 36 hours.',
    icon: 'Trophy',
  },
  {
    id: 'a3',
    title: 'Open Source Contributor of the Year',
    issuer: 'JS Foundation',
    date: '2021',
    description: 'Recognized for contributions to the React A11y ecosystem and design-system tooling.',
    icon: 'Award',
  },
  {
    id: 'a4',
    title: 'Patent — Collaborative Editing Protocol',
    issuer: 'USPTO',
    date: '2023',
    description: 'Co-inventor on a patent for conflict-free real-time document synchronization.',
    icon: 'FileBadge',
  },
];

export const skills: SkillItem[] = [
  { name: 'TypeScript / React', level: 96 },
  { name: 'Node.js / APIs', level: 90 },
  { name: 'Cloud (AWS / GCP)', level: 85 },
  { name: 'PostgreSQL / Supabase', level: 88 },
  { name: 'UI / Motion Design', level: 82 },
  { name: 'Rust / Systems', level: 70 },
];
