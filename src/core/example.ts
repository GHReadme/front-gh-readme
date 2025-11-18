/* ─────────────────────────────────────────────────────────────
 * Пример заполненного конфига
 * ────────────────────────────────────────────────────────────*/
import { ProfileReadmeConfig } from './types';

export const exampleProfileConfig: ProfileReadmeConfig = {
  profile: {
    username: 'your-username',
    fullName: 'John Doe',
    role: 'Senior Frontend Developer',
    company: 'AwesomeCorp',
    location: 'Oslo, Norway',
    timezone: 'Europe/Oslo',
    mainStackLine: 'React · TypeScript · Node.js',
    languages: ['English', 'Russian'],
    avatarUrl: 'https://avatars.githubusercontent.com/u/1234567',
  },

  about: {
    active: true,
    shortBio: 'Senior frontend engineer focusing on scalable React + TypeScript apps and developer experience.',
    currentFocus: 'Improving frontend architecture and internal DX tools.',
    currentlyLearning: 'Web security, pentesting basics and performance profiling.',
    lookingFor: 'Open to senior/lead frontend roles (remote, Europe timezones) and interesting OSS collaborations.',
    values: [
      'I care about clean architecture and explicit boundaries.',
      'I prefer strong typing, tests and gradual refactoring over quick hacks.',
      'I like building tools that make other developers faster and happier.',
    ],
  },

  contacts: {
    active: true,
    items: [
      {
        type: 'github',
        url: 'https://github.com/your-username',
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/your-username',
      },
      {
        type: 'telegram',
        label: 'Telegram',
        url: 'https://t.me/your_handle',
      },
      {
        type: 'email',
        label: 'Email',
        url: 'mailto:you@example.com',
      },
      {
        type: 'website',
        label: 'Portfolio',
        url: 'https://your-portfolio.dev',
      },
    ],
  },

  techStack: {
    active: true,
    grouped: true,
    groups: [
      {
        title: 'Languages',
        items: [
          { name: 'TypeScript', category: 'language', level: 'expert', icon: 'typescript' },
          { name: 'JavaScript', category: 'language', level: 'expert', icon: 'javascript' },
        ],
      },
      {
        title: 'Frontend',
        items: [
          { name: 'React', category: 'frontend', level: 'expert', icon: 'react' },
          { name: 'Next.js', category: 'frontend', level: 'advanced', icon: 'nextjs' },
          { name: 'Redux Toolkit', category: 'frontend', level: 'advanced' },
        ],
      },
      {
        title: 'Backend',
        items: [
          { name: 'Node.js', category: 'backend', level: 'advanced' },
          { name: 'NestJS', category: 'backend', level: 'intermediate' },
        ],
      },
      {
        title: 'Testing & Tooling',
        items: [
          { name: 'Jest', category: 'testing', level: 'advanced' },
          { name: 'Playwright', category: 'testing', level: 'intermediate' },
          { name: 'Docker', category: 'devops', level: 'intermediate' },
        ],
      },
    ],
  },

  projects: {
    active: true,
    maxToShow: 3,
    showHighlightedFirst: true,
    items: [
      {
        id: 'readme-builder',
        name: 'github-readme-builder',
        description: 'Config-driven GitHub README generator with visual editor, live preview and presets.',
        repoUrl: 'https://github.com/your-username/github-readme-builder',
        demoUrl: 'https://readme-builder.dev',
        tech: ['React', 'TypeScript', 'Vite', 'Node.js'],
        highlight: true,
        role: 'Solo developer',
        period: '2024 — now',
      },
      {
        id: 'architecture-playbook',
        name: 'frontend-architecture-playbook',
        description: 'Opinionated guide and code examples for maintainable React + TypeScript architectures.',
        repoUrl: 'https://github.com/your-username/frontend-architecture-playbook',
        tech: ['React', 'TypeScript'],
        highlight: true,
        role: 'Author',
        period: '2023',
      },
      {
        id: 'security-lab',
        name: 'web-security-lab',
        description: 'Collection of intentionally vulnerable apps and writeups for learning web security.',
        repoUrl: 'https://github.com/your-username/web-security-lab',
        tech: ['Node.js', 'Express', 'MongoDB'],
        role: 'Maintainer',
        period: '2023 — now',
      },
    ],
  },

  githubStats: {
    active: true,
    showOverviewCard: true,
    showTopLangs: true,
    showStreak: true,
    theme: 'dark',
    customUsername: undefined, // можно переопределить при необходимости
  },

  activity: {
    active: true,
    flags: [
      {
        label: 'Open to work',
        value: true,
        note: 'Senior/Lead Frontend roles (remote, Europe timezones).',
      },
      {
        label: 'Open source contributor',
        value: true,
        note: 'Interested in React/TypeScript tooling and web security projects.',
      },
      {
        label: 'Mentoring',
        value: false,
        note: 'Occasionally help with code reviews, but not taking regular mentees now.',
      },
    ],
    preferredContact: 'Telegram or email',
  },

  content: {
    active: true,
    baseUrl: 'https://dev.to/your-username',
    latest: [
      {
        title: 'Practical patterns for scalable React + TypeScript frontends',
        url: 'https://dev.to/your-username/scalable-react-ts-patterns',
        platform: 'dev.to',
        publishedAt: '2024-05-01',
      },
      {
        title: 'From messy components to clean architecture: a refactoring story',
        url: 'https://dev.to/your-username/refactoring-to-clean-frontend-architecture',
        platform: 'dev.to',
        publishedAt: '2024-03-15',
      },
    ],
  },

  funFacts: {
    active: false, // можно включить, если нужно чуть более "живое" README
    items: [
      'I enjoy refactoring legacy frontends more than greenfield projects.',
      'I like measuring performance and reducing bundle size.',
    ],
  },
};
