import { Game } from '@/app/components/GameCard';

export const games: Game[] = [
  {
    id: '1',
    title: 'School of Survival | อยู่รอดวิทยา',
    description:
      'Roblox game developed in collaboration with Dentsu team. Developed and implemented gameplay "Run Hide Fight" events with quick time events in "Fight" using real-time render with IK animation.',
    genre: 'Survival',
    platform: 'Roblox',
    releaseYear: '2024',
    imageUrl:
      'https://images.unsplash.com/photo-1763044655339-b58c31f55e62?auto=format&fit=crop&w=1920&q=80',
    tags: ['Roblox', 'Survival', 'Multiplayer'],
    role: 'Game Programmer',
    roleDetails:
      'Served as the primary game programmer responsible for implementing core gameplay mechanics. Developed the "Run Hide Fight" event system with complex state management. Created real-time rendering solutions with IK (Inverse Kinematics) animation for smooth character movements during combat sequences. Optimized performance for Roblox platform constraints while maintaining high-quality visual effects.',
    status: '2024 - Released',
    starred: true,
    features: [
      'Run Hide Fight event system',
      'Quick time events (QTE) implementation',
      'Real-time rendering with IK animation',
      'Multiplayer synchronization',
      'Performance optimization for Roblox',
      'Character animation system',
    ],
    awards: ['Featured Project Award', 'Best Survival Game 2024'],
    client: 'Dentsu',
    media: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        title: 'Gameplay Trailer',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        title: 'Combat System',
      },
      {
        type: 'gif',
        url: 'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif',
        title: 'Quick Time Events',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        title: 'Multiplayer Action',
      },
    ],
    badges: {
      star: true,
      trophy: true,
      partner: 'Dentsu',
      teamSize: 10,
      school: true,
    },
  },
  {
    id: '2',
    title: 'Unity Medicals Mobile AR',
    description:
      'Mobile AR application optimized for performance and compatibility. Improved performance and compatibility for mobile devices.',
    genre: 'AR Application',
    platform: 'Mobile',
    releaseYear: '2024',
    imageUrl:
      'https://images.unsplash.com/photo-1757119163075-fca8444244ad?auto=format&fit=crop&w=1920&q=80',
    tags: ['AR', 'Mobile', 'Optimization'],
    role: 'Optimizer',
    roleDetails:
      'Specialized in performance optimization and compatibility improvements for mobile AR applications. Analyzed and refactored rendering pipelines to reduce draw calls and improve frame rates. Implemented efficient memory management strategies to support lower-end devices. Optimized AR tracking algorithms for better accuracy and reduced battery consumption.',
    status: '2024 - Released',
    starred: true,
    features: [
      'AR tracking optimization',
      'Mobile performance tuning',
      'Memory management improvements',
      'Battery consumption optimization',
      'Cross-device compatibility',
      'Rendering pipeline optimization',
    ],
    awards: [],
    client: 'Unity Medicals',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        title: 'AR Tracking Demo',
      },
      {
        type: 'gif',
        url: 'https://media.giphy.com/media/l0MYC0LajboPy2vbi/giphy.gif',
        title: 'AR Object Detection',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
        title: 'Mobile Interface',
      },
    ],
    badges: {
      star: true,
      teamSize: 4,
    },
  },
  {
    id: '3',
    title: 'Unity Medicals VR & Mobile',
    description:
      'Prototype project as Lead Programmer. Developed VR and mobile versions with immersive medical training experiences.',
    genre: 'VR Application',
    platform: 'VR, Mobile',
    releaseYear: '2024',
    imageUrl:
      'https://images.unsplash.com/photo-1656381620321-bddff61435c3?auto=format&fit=crop&w=1920&q=80',
    tags: ['VR', 'Mobile', 'Medical'],
    role: 'Lead Programmer',
    roleDetails:
      'Led the development team as Lead Programmer for both VR and mobile platforms. Architected the cross-platform system architecture to support both VR and mobile experiences. Managed codebase synchronization between platforms while maintaining platform-specific optimizations. Coordinated with medical professionals to ensure accurate simulation of medical procedures.',
    status: '2024 - Prototype',
    starred: false,
    features: [
      'Cross-platform architecture (VR & Mobile)',
      'Medical procedure simulation',
      'Immersive VR training system',
      'Mobile companion app',
      'Real-time interaction system',
      'Medical data visualization',
    ],
    awards: [],
    client: 'Unity Medicals',
    media: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=800&q=80',
        title: 'VR Training Demo',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=800&q=80',
        title: 'Medical Simulation',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        title: 'Cross-Platform UI',
      },
    ],
    badges: {
      school: true,
      teamSize: 7,
    },
  },
  {
    id: '4',
    title: 'Unity Multiplayer VR',
    description:
      'Multiplayer VR prototype featuring Match Making, Voice Chat, Webcam integration, and avatar/environment changes. Developed as Lead Programmer.',
    genre: 'Multiplayer VR',
    platform: 'VR',
    releaseYear: '2024',
    imageUrl:
      'https://images.unsplash.com/photo-1611546191222-96fb7afd5af9?auto=format&fit=crop&w=1920&q=80',
    tags: ['VR', 'Multiplayer', 'Networking'],
    role: 'Lead Programmer',
    roleDetails:
      'Led development of a comprehensive multiplayer VR system from the ground up. Designed and implemented the matchmaking service with skill-based pairing algorithms. Integrated real-time voice chat with spatial audio for immersive communication. Developed webcam integration for avatar personalization. Created dynamic environment and avatar customization systems with real-time synchronization across all clients.',
    status: '2024 - Prototype',
    starred: false,
    features: [
      'Matchmaking system with skill-based pairing',
      'Real-time voice chat with spatial audio',
      'Webcam integration for avatar creation',
      'Avatar customization system',
      'Dynamic environment changes',
      'Multiplayer synchronization',
      'Network optimization for VR',
    ],
    awards: [],
    client: 'Academic Project',
    media: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1611546191222-96fb7afd5af9?auto=format&fit=crop&w=800&q=80',
        title: 'Multiplayer Gameplay',
      },
      {
        type: 'gif',
        url: 'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif',
        title: 'Avatar Customization',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        title: 'Matchmaking System',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        title: 'VR Environment',
      },
    ],
    badges: {
      school: true,
      teamSize: 8,
    },
  },
  {
    id: '5',
    title: 'TINY TUNA',
    description:
      'You are born as a Bluefin Tuna that must live in a cruel ocean. You must eat smaller fish in order to grow, and you also have to avoid larger animals and dangerous predators. Your objective is survival for the sake of breeding.',
    genre: 'Survival',
    platform: 'Unity',
    releaseYear: '2025',
    imageUrl: '/projects/tinytuna/tinytunacover.png',
    wallpaper: '/projects/tinytuna/tinytunawallpaper.png',
    tags: ['Casual', 'Survival', '2D Side Scroller', 'Unity', 'Single player', 'Coursework'],
    role: 'Programmer',
    roleDetails:
      'Served as a programmer on the development team, responsible for implementing core gameplay systems. Developed spawn logic for fish and predators, created the world stage system, and implemented AI behaviors using Unity\'s IJob system with Burst compilation for optimal performance. Built time-based event systems to manage dynamic gameplay elements throughout the survival experience.',
    status: 'Released Nov/2025',
    starred: false,
    features: [
      'Spawn Logic',
      'World Stage',
      'AI Logics with IJob & Burst',
      'Time base event',
    ],
    awards: [],
    client: 'Academic Project',
    teamMembers: [
      { name: 'Jakkaphong Boonyaritlakkhana', role: 'Programmer' },
      { name: 'Jirawat Damung', role: 'Programmer' },
      { name: 'Sirasit Tumvijit', role: 'Programmer' },
      { name: 'Tatsapong Jirabulvanit', role: 'Ai Artist' },
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
        title: 'Fish Gameplay',
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
    },
  },
];

