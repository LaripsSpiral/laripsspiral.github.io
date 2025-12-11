export interface PersonalInfo {
  name: string;
  title: string;
  languages: string[];
  skills: {
    programming: string[];
    tools: string[];
  };
  strengths: string[];
  interests: string[];
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
      titleLinks?: Array<{
        text: string;
        link: string;
      }>;
      responsibilities: string[];
      subProjects?: Array<{
        title: string;
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
    tools: ['Unity', 'Unreal', 'Github'],
  },
  strengths: ['Responsibility', 'Quick Learner', 'Resourceful', 'Proactive Developer'],
  interests: ['Creative Ideas', 'Optimizations', 'Netcode for Entity & DOTS (Learning)'],
  education: {
    period: 'June/2023 - Ongoing',
    university: "Bangkok University 3'rd year",
    degree: "Bachelor's Degree in Information Technology",
    major: 'Majoring in Game and Interactive Media',
  },
  professionalSummary:
    '**Unity Game Programmer** with hands-on experience in **research, rapid prototyping** and **collaborative development**, specializing in **optimization**. Strong **responsibility, problem-solving skills** and a highly **receptive** approach to the team.',
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
      position: 'Research Assistant',
      period: 'Oct/2023 - Apr/2025 (1 year 7 months)',
      projects: [
        {
          title: 'Roblox School of Survival | อยู่รอดวิทยา (Game Programmer):',
          titleLinks: [
            { text: 'Roblox School of Survival | อยู่รอดวิทยา', link: 'https://yoorodwittaya.com/' },
          ],
          responsibilities: [
            "Collaborated with 'Dentsu Creative Thailand' in development.",
            "Developed and implemented gameplay 'Run Hide Fight' events.",
            "Created quick time event in 'Fight' with real time render by using IK animation.",
          ],
        },
        {
          title: 'Unity Project Medicals Mobile AR (Optimizer):',
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
              responsibilities: [
                "Created 'Training Simulation' for nurses by focusing on 'Patient Screening' and 'Medication Dispensing'.",
              ],
            },
            {
              title: 'Unity Medicals VR Multiplayer (Netcode):',
              responsibilities: [
                "Implemented a match making to queue patient, allowing them to receive invitations to the host's lobby.",
                'Implementing webcam streaming over the network by converting to texture and encoding to jpg, i improve performance by reducing resolution of image and separating the encoded image bytes into chunk due to maximum transmission limits.',
                'Implementing networked physics and state synchronization to ensure all clients see the same position, rotation, and appearance of avatars and environments.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

