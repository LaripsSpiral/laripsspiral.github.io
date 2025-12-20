import { Game, FeatureDetailItem } from '@/app/components/GameCard';

export const games: Game[] = [
  {
    id: '6',
    title: 'Augus Lost Without You',
    description:
      'The story of a cat named Augus, a magic-lover searching for his owner. After a tragic accident with a truck, he awakens in a fantasy world of his own memories, still determined to find his way back to his owner.',
    imageUrl: '/projects/AugusLostWithoutYou/AugusLostWithoutYou_cover.jpg',
    wallpaper: '/projects/AugusLostWithoutYou/AugusLostWithoutYou_cover.jpg',
    genres: ['Action', 'Fantasy', 'Single player'],
    tags: ['AI System'],
    platforms: ['PC'],
    tools: ['Unity'],
    role: 'Programmer',
    roleDetails:
      'Implemented core AI systems inspired by Monster Hunter, including character behavior, hitbox/hurtbox combat detection, alliance systems, stun & enrage mechanics, dynamic action selection, state machines, and boss phase management.',
    status: 'Prototype',
    startDate: '',
    lastDate: '',
    features: [
      'AI Character Behavior',
      'Hitbox / Hurtbox System',
      'Alliance System',
      'Stun & Enrage System',
      'Dynamic Action System',
      'Boss Phases',
    ],
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
          type: 'video',
          url: '/projects/AugusLostWithoutYou/features/Augus_feature_stun.mp4',
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
          type: 'video',
          url: '/projects/AugusLostWithoutYou/features/Augus_feature_boss.mp4',
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
      type: 'video',
      url: '/projects/AugusLostWithoutYou/gamepreviews/Augus_trailer.mp4',
      thumbnail: '/projects/AugusLostWithoutYou/gamepreviews/Augus_triler_thumpnail.jpg',
      title: 'Trailer',
      },
      {
      type: 'video',
      url: '/projects/AugusLostWithoutYou/gamepreviews/Augus_gameplay.mp4',
      thumbnail: '/projects/AugusLostWithoutYou/AugusLostWithoutYou_cover.jpg',
      title: 'Gameplay',
      },
    ],
    badges: {
      school: true,
      teamSize: 6,
    },
  },
  {
    id: '5',
    title: 'TINY TUNA',
    description:
      'You are born as a Bluefin Tuna that must live in a cruel ocean. You must eat smaller fish in order to grow, and you also have to avoid larger animals and dangerous predators. Your objective is survival for the sake of breeding.',
    imageUrl: '/projects/tinytuna/tinytunacover.png',
    wallpaper: '/projects/tinytuna/tinytunawallpaper.png',
    genres: ['Casual', 'Survival', '2D Side Scroller', 'Single player'],
    tags: ['AI System', 'IJob & Burst'],
    platforms: ['PC', 'Web', 'itch.io'],
    tools: ['Unity', 'AI (Suno AI, Gemini Art)'],
    role: 'Programmer',
    roleDetails:
      'Implemented core gameplay systems including spawn logic, world stage progression, and AI behaviors using Unity\'s IJob & Burst for performance optimization. Developed time-based event systems for dynamic gameplay management.',
    status: 'Released',
    startDate: '11 Nov 2024',
    lastDate: '28 Nov 2025',
    features: [
      'Spawn Logic',
      'World Stage',
      'Time base event',
      'AI Logics with IJob & Burst',
    ],
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
          type: 'video',
          url: '/projects/tinytuna/features/tinytuna_feature_ai.mp4',
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
        type: 'video',
        url: '/projects/tinytuna/gamepreviews/FishGameplay.mp4',
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
  },
];

