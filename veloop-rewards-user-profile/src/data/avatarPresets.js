export const AVATAR_PRESETS = [
  {
    category: 'Cyberpunk & Sci-Fi',
    items: [
      {
        id: 'cyber-1',
        name: 'Neon Blade',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'cyber-2',
        name: 'Cyber Samurai',
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'cyber-3',
        name: 'Quantum Pilot',
        url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'cyber-4',
        name: 'Mecha V',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'cyber-5',
        name: 'Synth Runner',
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'cyber-6',
        name: 'Neon Phantom',
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    category: '3D & Anime Gamers',
    items: [
      {
        id: 'gamer-1',
        name: 'Apex Striker',
        url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'gamer-2',
        name: 'Valkyrie 01',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'gamer-3',
        name: 'Shadow Caster',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'gamer-4',
        name: 'Solar Guardian',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'gamer-5',
        name: 'Pixel Champion',
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'gamer-6',
        name: 'Cosmic Empress',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    category: 'Vector & Illustrated',
    items: [
      {
        id: 'vec-1',
        name: 'Astro Bot',
        url: 'https://api.dicebear.com/7.x/bottts/svg?seed=AstroBot&backgroundColor=b6e3f4,c0aede,d1d4f9',
      },
      {
        id: 'vec-2',
        name: 'Neon Drake',
        url: 'https://api.dicebear.com/7.x/bottts/svg?seed=NeonDrake&backgroundColor=ffd5dc,ffdfbf',
      },
      {
        id: 'vec-3',
        name: 'Cyber Kitty',
        url: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberKitty&backgroundColor=c0aede,d1d4f9',
      },
      {
        id: 'vec-4',
        name: 'Vortex Sentinel',
        url: 'https://api.dicebear.com/7.x/bottts/svg?seed=VortexSentinel&backgroundColor=b6e3f4,ffdfbf',
      },
      {
        id: 'vec-5',
        name: 'Zero One',
        url: 'https://api.dicebear.com/7.x/bottts/svg?seed=ZeroOne&backgroundColor=ffd5dc,b6e3f4',
      },
      {
        id: 'vec-6',
        name: 'Hyperion X',
        url: 'https://api.dicebear.com/7.x/bottts/svg?seed=HyperionX&backgroundColor=c0aede,ffd5dc',
      },
    ],
  },
];

export const generateRandomAvatar = () => {
  const seeds = [
    'NovaPrime', 'GlitchGhost', 'CipherMatrix', 'VeloopKing', 'PulseRider',
    'ChronoWolf', 'SolarFlare', 'ShadowFox', 'QuantumByte', 'StarLord99',
    'ArcaneBlade', 'NeonViper', 'EchoWave', 'ApexHunter', 'CosmicRift'
  ];
  const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 1000);
  const styles = ['bottts', 'adventurer', 'avataaars', 'identicon', 'thumbs'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
};
