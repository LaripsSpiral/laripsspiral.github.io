import { Game, FeatureDetailItem } from '@/app/components/GameCard';
import { i } from 'framer-motion/client';

export const games: Game[] = [
  {title: 'School of Survival',
    description: 'Practice survival strategies for helping students to learning in an immerses realistic school setting where an emergency situation.',
    imageUrl: '/projects/SchoolOfSurvival/Yoorod_Cover.png',
    wallpaper: '/projects/SchoolOfSurvival/gamepreviews/Yoorod_Preview2.png',
    genres: ['Simulation'],
    playModes: ['Multiplayer'],
    othertags: [],
    platforms: ['Roblox'],
    tools: ['Roblox Studio'],
    role: 'Programmer',
    roleDetails:
      'Implemented core gameplay systems of run hide fight concept and quick time event with IK animation in realtime cutscene, with collaboration with Dentsu Creative Thailand.',
    status: 'Released',
    startDate: '1 Oct 2023',
    lastDate: '1 Apr 2025',
    featureDetails: [
      {
        topic: 'Hide Objectives',
        details: [
          'Implemented checklist objectives in hide situation for safety in emergency situation.',
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/Vgk775w87bM?si=fMgoXxcjcFsfp_Zm',
          title: 'Hide Objectives',
        },
      },
      {
        topic: 'Hiding Mechanic',
        details: [
          'Implemented a safe area for hiding in hide situation.',
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/r_1jCm2WmOY?si=4MNxwGmTwes0VtHB',
          title: 'Hiding Mechanic',
        },
      },
      {
        topic: 'Fight Quick Time Event',
        details: [
          'Implemented a quick time event for fight in situation of encounter using IK animation in realtime cutscene.'
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/54Q6QtvfWWQ?si=Cz5WYhQi0C9LT88R',
          title: 'Fight Quick Time Event',
        },
      },
    ] as FeatureDetailItem[],
    awards: [
      {
        title: 'ADPEOPLE 2024 (8 Awards)',
        link: 'https://bu.ac.th/en/featured-stories/1645',
        cover: '/projects/SchoolOfSurvival/awards/ADPEOPLE_2024.png',
      },
      {
        title: 'ADFEST 2025 (1 Award)',
        link: 'https://www.facebook.com/permalink.php/?story_fbid=122163891134304926&id=61559147805158',
        cover: '/projects/SchoolOfSurvival/awards/ADFEST_2025.png',
      },
    ] as (string | { title: string; link?: string; cover?: string })[],
    client: 'CoSI | Center of Specialty Innovation (Bangkok University)',
    teamMembers: [
      { name: 'Jirawat Damung', role: 'Programmer' },
      { name: 'Sirasit Tumvijit', role: 'Programmer' },
      { name: 'Thanapong Pensuwarn', role: 'Team Leader, Art' },
    ],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/YG4v2UuGFVs?si=v63k3Tjs2tcXq-WH',
        title: 'School Of Survival Trailer',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=MkZd_YYGaBA',
        title: 'School Of Survival Gameplay',
      },
      {
        type: 'image',
        url: '/projects/SchoolOfSurvival/gamepreviews/Yoorod_Preview1.png',
        title: 'School Of Survival Screenshot 1',
      },
      {
        type: 'image',
        url: '/projects/SchoolOfSurvival/gamepreviews/Yoorod_Preview2.png',
        title: 'School Of Survival Screenshot 2',
      },
    ],
    badges: {
      star: true,
      school: true,
      teamSize: 3,
      client: 'CoSI | Center of Specialty Innovation (Bangkok University)',
      clientLink: 'https://cosi.bu.ac.th/',
      collaboration: 'Dentsu Creative Thailand',
      collaborationLink: 'https://www.facebook.com/dentsuCreativeTH',
    },
    gameLink: 'https://www.roblox.com/games/16880223610/School-of-Survival',
    websiteLink: 'https://yoorodwittaya.com/',
  },
  {title: 'Augus Lost Without You',
    description:
      'The story of a cat named Augus, a magic-lover searching for his owner. After a tragic accident with a truck, he awakens in a fantasy world of his own memories, still determined to find his way back to his owner.',
    imageUrl: '/projects/AugusLostWithoutYou/AugusLostWithoutYou_cover.jpg',
    wallpaper: '/projects/AugusLostWithoutYou/AugusLostWithoutYou_cover.jpg',
    genres: ['Action', 'Fantasy'],
    playModes: ['Single player'],
    othertags: ['AI System'],
    platforms: ['PC'],
    tools: ['Unity'],
    role: 'Programmer',
    roleDetails:
      'Implemented core AI systems inspired by Monster Hunter, including character behavior, hitbox/hurtbox combat detection, alliance systems, stun & enrage mechanics, dynamic action selection, state machines, and boss phase management.',
    status: 'Prototype',
    startDate: '17 Feb 2025',
    lastDate: '20 May 2025',
    featureDetails: [
      {
        topic: 'AI Character Behavior',
        details: [
          'Implemented character AI inspired by Monster Hunter, featuring decision-making based on states, specific conditions, and combat context.',
        ],
      },
      {
        topic: 'Hitbox / Hurtbox System',
        details: [
          'Designed a precision hitbox and hurtbox system using Unity colliders.',
          'Assigned unique owners to each collider to accurately track damage to specific body parts.',
          'Configured actions to generate dynamic hitboxes per animation frame for precise combat detection.',
        ],
        media: {
          type: 'image',
          url: '/projects/AugusLostWithoutYou/features/Augus_feature_hitboxhurtbox.jpg',
          title: 'Hitbox / Hurtbox System',
        },
      },
      {
        topic: 'Alliance System',
        details: [
          'Implemented an alliance system to classify characters as allies or enemies, enabling appropriate AI reactions during combat.',
        ],
        media: {
          type: 'image',
          url: '/projects/AugusLostWithoutYou/features/Augus_feature_alliance.jpg',
          title: 'Alliance System',
        },
      },
      {
        topic: 'Stun & Enrage System',
        details: [
          'Developed a stun mechanic where characters are incapacitated based on specific gameplay conditions.',
          'Integrated a Stun Gauge system; once the gauge is depleted, the character enters an Enrage mode.',
          'While enraged, the character becomes immune to stun. All parameters (gauge size, stun duration, and enrage duration) are fully configurable.',
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/M06eBRbnNUY',
          title: 'Stun & Enrage System',
        },
      },
      {
        topic: 'Dynamic Action System',
        details: [
          'Developed a dynamic action system that allows actions to be assigned specific priorities and conditions.',
          'The AI evaluates these rules at runtime to select and execute the most appropriate action.',
          'Architected a state machine to manage character transitions.',
          'Each action functions as its own state, containing logic to determine the subsequent state or follow-up action.',
        ],
        media: {
          type: 'image',
          url: '/projects/AugusLostWithoutYou/features/Augus_feature_aiactions.jpg',
          title: 'Dynamic Action System',
        },
      },
      {
        topic: 'Boss Phases',
        details: [
          'Implemented phase-based boss behavior using the Dynamic Action system, allowing for unique action sets and behavior shifts across different health thresholds or phases.',
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/sUEFQxqothk',
          title: 'Boss Phases',
        },
      },
    ] as FeatureDetailItem[],
    awards: [],
    client: 'Coursework',
    teamMembers: [
      { name: 'Jirawat Damung', role: 'Programmer' },
      { name: 'Sirasit Tumvijit', role: 'Programmer' },
      { name: 'Naran Lamoonpandh', role: 'Programmer' },
      { name: 'Thanapong Pensuwarn', role: 'Art Director' },
      { name: 'Gittanon Vathanachai', role: 'Technical Artist' },
      { name: 'Ramida Tantrapirom', role: 'Sound Design' },
    ],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/wVn3l43QRs8',
        title: 'Trailer',
      },
      {
        type: 'youtube',
        url: 'https://youtu.be/sx26HipkoVQ',
        title: 'Gameplay',
      },
    ],
    badges: {
      school: true,
      teamSize: 6,
    },
    gameLink: 'https://myeboy-loues.itch.io/augus',
  },
  {title: 'TINY TUNA',
    description:
      'You are born as a Bluefin Tuna that must live in a cruel ocean. You must eat smaller fish in order to grow, and you also have to avoid larger animals and dangerous predators. Your objective is survival for the sake of breeding.',
    imageUrl: '/projects/tinytuna/tinytunacover.png',
    wallpaper: '/projects/tinytuna/tinytunawallpaper.png',
    genres: ['Casual', 'Survival', '2D Side Scroller', 'Single player'],
    othertags: ['AI System', 'IJob & Burst'],
    platforms: ['PC', 'Web', 'itch.io'],
    tools: ['Unity', 'AI (Suno AI, Gemini Art)'],
    role: 'Programmer',
    roleDetails:
      'Implemented core gameplay systems including spawn logic, world stage progression, and AI behaviors using Unity\'s IJob & Burst for performance optimization. Developed time-based event systems for dynamic gameplay management.',
    status: 'Released',
    startDate: '11 Nov 2024',
    lastDate: '28 Nov 2025',
    featureDetails: [
      {
        topic: 'Spawn Logic',
        details: [
          'Initial spawn: Fishes spawn inside the play area at the start to make the environment look lively',
          'World stage changes: New fishes spawn when the world stage transitions',
          'Seamless spawning: When fish count is low, spawns occur outside the play area to maintain a continuous flow of fish',
        ],
        media: {
          type: 'image',
          url: '/projects/tinytuna/features/tinytuna_feature_spawns.png',
          title: 'Spawn Logic System',
        },
      },
      {
        topic: 'World Stage',
        details: [
          'Dynamic progression: World stages change based on player progress',
          'Stage variants: Each stage features different environments, fish types, and behaviors',
          'Increasing difficulty: The number of hunters and challenges increases with each stage progression',
        ],
        media: {
          type: 'image',
          url: '/projects/tinytuna/features/tinytuna_feature_environments.png',
          title: 'World Stage Progression',
        },
      },
      {
        topic: 'Time base event',
        details: [
          'Event system: Implements a countdown manager using data events with unique IDs and cooldown timers',
          'Subscription model: Sends tick events to subscribed members at specified intervals',
          'Reset capability: Events can be reset by adding the same data ID again',
        ],
      },
      {
        topic: 'AI Logics with IJob & Burst',
        details: [],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/ibwgDwhygJM',
          title: 'AI Logic System',
        },
        subTopics: [
          {
            topic: 'Vision System',
            details: [
              'Creates a cone of view using mathematical calculations',
              'Detects fish within vision range',
              'Determines Hunter/Prey relationship based on character size',
            ],
          },
          {
            topic: 'Behavior States',
            details: [
              'Fleeing: Fish runs away from threats',
              'Hunting: Fish moves toward prey',
              'Idle: Fish moves randomly',
              'Boundary: When out of play area, moves toward center',
            ],
          },
          {
            topic: 'Data Processing Pipeline',
            details: [
              'Gathers data in Update() and converts to native arrays for job input',
              'Calculates AI fish logic in parallel jobs using Burst compilation',
              'Prepares output for all fishes',
              'Applies results in Update() to every living fish',
            ],
          },
        ],
      },
    ] as FeatureDetailItem[],
    awards: [],
    client: 'Academic Project',
    teamMembers: [
      { name: 'Jakkaphong Boonyaritlakkhana', role: 'Programmer' },
      { name: 'Jirawat Damung', role: 'Programmer' },
      { name: 'Sirasit Tumvijit', role: 'Programmer' },
      { name: 'Tatsapong Jirabulvanit', role: 'Art Director' },
      { name: 'Thirat Chanthawa', role: 'Game Designer' },
      { name: 'Sorawit Nartmanee', role: 'Level Designer' },
      { name: 'Nicha Munkongwongsiri', role: 'UX/UI Designer' },
      { name: 'Kanyanat Sermsup', role: 'UX/UI Designer' },
    ],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/RUj7Mr9sbJg',
        thumbnail: '/projects/tinytuna/gamepreviews/tinytuna_1.png',
        title: 'Gameplay',
      },
      {
        type: 'image',
        url: '/projects/tinytuna/gamepreviews/tinytuna_1.png',
        title: 'Tiny Tuna Screenshot 1',
      },
      {
        type: 'image',
        url: '/projects/tinytuna/gamepreviews/tinytuna_2.png',
        title: 'Tiny Tuna Screenshot 2',
      },
      {
        type: 'image',
        url: '/projects/tinytuna/gamepreviews/tinytuna_3.png',
        title: 'Tiny Tuna Screenshot 3',
      },
    ],
    badges: {
      school: true,
      teamSize: 8,
      star: true,
    },
    gameLink: 'https://laripsspiral.itch.io/tiny-tuna',
  },
  {title: 'MiceTrix',
    description: 'You play as a hacker with the mission to help The Lab Rat, known as "Mice," escape from of the matrix-like world.',
    imageUrl: '/projects/MiceTrix/MiceTrix_Cover.png',
    wallpaper: '',
    genres: ['Point and click', '2D Side Scroller', 'Single player'],
    othertags: [],
    platforms: ['PC', 'Web', 'itch.io'],
    tools: ['Unity'],
    role: 'Programmer',
    roleDetails:
      'Implemented core gameplay systems, hacking mechanics and character interaction with path navigation.',
    status: 'Prototype',
    startDate: '5 Nov 2025',
    lastDate: '3 Dec 2025',
    featureDetails: [
      {
        topic: 'Character Interaction',
        details: [
          'Synchronized character animations triggered during object interactions, seamlessly handling entry, exit, and override actions.',
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/CNySYmq9b1c',
          title: 'Character Interaction',
        },
      },
      {
        topic: 'Hacking Mechanics',
        details: [
          'Implemented raycasting interactions, enabling actions such as activation and path switching.',
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/9ztyeKtOCRA',
          title: 'Hacking Mechanics',
        },
      },
      {
        topic: 'Path Navigation',
        details: [
          'Navigate path with splines for movement, combined with colliders to manage character interactions, including entry, exit, and path overrides.',
        ],
        media: {
          type: 'youtube',
          url: 'https://youtu.be/7n7q5tB7FAU',
          title: 'Path Navigation',
        },
      },
    ] as FeatureDetailItem[],
    awards: [],
    client: 'Coursework',
    teamMembers: [
      { name: 'Jirawat Damung', role: 'Programmer' },
      { name: 'Sirasit Tumvijit', role: 'Programmer' },
      { name: 'Nathotsathon Saengarun', role: 'Game Designer' },
      { name: 'Yuranan Insuk', role: 'Game Designer' },
      { name: 'Supanat Siemtaku', role: 'Art Environment' },
      { name: 'Chinnakrit Phuengthong', role: 'Art Environment' },
      { name: 'Thamolwan Jomklang', role: 'Art Environment' },
      { name: 'Muanfan Rurksermsook', role: 'Art Character' },
    ],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/gEybr23IraQ',
        thumbnail: '/projects/MiceTrix/MiceTrix_Cover.png',
        title: 'Gameplay',
      },
    ],
    badges: {
      school: true,
      teamSize: 8,
    },
    gameLink: 'https://laripsspiral.itch.io/micetrix',
  },
];

