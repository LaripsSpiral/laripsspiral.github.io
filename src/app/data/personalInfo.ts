export interface PersonalInfo {
  name: string;
  title: string;
  languages: string[];
  skills: {
    programming: string[];
    gameEngines: string[];
    tools: string[];
  };
  education: {
    period: string;
    university: string;
    degree: string;
    major: string;
  };
  professionalSummary: string;
  achievements: Array<{
    title: string;
    titleLinks?: Array<{
      text: string;
      link: string;
    }>;
    awards?: Array<{
      text: string;
      link?: string;
    }>;
  }>;
  experience: Array<{
    company: string;
    companyLink?: string;
    position: string;
    period: string;
    projects: Array<{
      title: string;
      period?: string;
      about?: string;
      titleLinks?: Array<{
        text: string;
        link: string;
      }>;
      responsibilities: string[];
      subProjects?: Array<{
        title: string;
        period?: string;
        about?: string;
        titleLinks?: Array<{
          text: string;
          link: string;
        }>;
        responsibilities: string[];
      }>;
    }>;
  }>;
}

export const personalInfo: PersonalInfo = {
  name: 'SIRASIT TUMVIJIT',
  title: 'Game Developer',
  languages: ['Thai', 'English'],
  skills: {
    programming: ['C#', 'C', 'Python'],
    gameEngines: ['Unity', 'Unreal'],
    tools: ['GitHub'],
  },
  education: {
    period: 'June/2023 - Present',
    university: 'Bangkok University (School of Information Technology and Innovation)',
    degree: 'Bachelor of Science',
    major: 'Major in Games and Interactive Media',
  },
  professionalSummary:
    'Unity Game Programmer with hands-on experience in VR, multiplayer systems, AI behavior, and performance optimization. Experienced in rapid prototyping, collaborative development, and projects for education and healthcare simulations.',
  achievements: [
    {
      title: 'School of Survival | อยู่รอดวิทยา (CoSI x Dentsu Creative Thailand)',
      titleLinks: [
        { text: 'School of Survival | อยู่รอดวิทยา', link: 'https://yoorodwittaya.com' },
        { text: 'CoSI', link: 'https://cosi.bu.ac.th' },
        { text: 'Dentsu Creative Thailand', link: 'https://www.facebook.com/dentsuCreativeTH' },
      ],
      awards: [
        { text: 'ADPEOPLE 2024 (8 Awards)', link: 'https://bu.ac.th/en/featured-stories/1645' },
        { text: 'ADFEST 2025 (1 Award)', link: 'https://www.facebook.com/permalink.php/?story_fbid=122163891134304926&id=61559147805158' },
      ],
    },
    {
      title: 'Third place of IEEE 2nd ChatGPT4PCG Competition 2024',
      titleLinks: [
        { text: 'IEEE 2nd ChatGPT4PCG Competition 2024', link: 'https://chatgpt4pcg.github.io/' },
      ],
    },
  ],
  experience: [
    {
      company: 'CoSI | Center of Specialty Innovation',
      companyLink: 'https://cosi.bu.ac.th',
      position: 'Research Assistant | Game Developer',
      period: 'Oct/2023 - Apr/2025 (1 year 7 months)',
      projects: [
        {
          title: 'Roblox School of Survival (Game Programmer):',
          about: 'Practice survival strategies for students to learn in an immersive realistic school setting, was exhibited at more than 8 events.',
          titleLinks: [
            { text: 'Roblox School of Survival | อยู่รอดวิทยา', link: 'https://yoorodwittaya.com/' },
            { text: 'Roblox Game', link: 'https://www.roblox.com/games/16880223610/School-of-Survival' },
          ],
          responsibilities: [
            "Collaborated with 'Dentsu Creative Thailand' in development.",
            "Developed and implemented gameplay 'Run Hide Fight' events.",
            "Created quick time event in 'Fight' with real time render by using IK animation.",
          ],
        },
        {
          title: 'Unity Project Medicals Mobile AR (Optimizer):',
          about: 'Optimized performance and compatibility for mobile.',
          titleLinks: [
            { text: 'Medical AR Project', link: 'https://cosi.bu.ac.th' },
          ],
          responsibilities: [
            'Optimized performance and compatibility for mobile.',
            'Reduced garbage collection, optimized texture and mesh sizes.',
            'Refactored codebase by remove unnecessary code.',
          ],
        },
        {
          title: 'Prototype (Lead Programmer):',
          responsibilities: [],
          subProjects: [
            {
              title: 'Unity Medicals VR & Mobile:',
              about: "Created 'Training Simulation' for nurses by focusing on 'Patient Screening' and 'Medication Dispensing'.",
              titleLinks: [
                { text: 'Medical VR Training', link: 'https://cosi.bu.ac.th' },
              ],
              responsibilities: [
                "Created 'Training Simulation' for nurses by focusing on 'Patient Screening' and 'Medication Dispensing'.",
              ],
            },
            {
              title: 'Unity Medicals VR Multiplayer (Netcode):',
              about: 'Therapy Session for observe and diagnose.',
              titleLinks: [
                { text: 'Medical VR Multiplayer', link: 'https://cosi.bu.ac.th' },
              ],
              responsibilities: [
                'Implemented real-time webcam streaming over network by encoding frames to JPG textures.',
                'Improved performance by reducing resolution and chunking data to meet transmission limits.',
                'Implemented networked physics and state synchronization for consistent avatar and environment states across clients.',
              ],
            },
          ],
        },
      ],
    }
  ],
};

