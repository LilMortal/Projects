import { User, Chirp } from '../types/chirp';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Software developer passionate about React and TypeScript. Building the future one line of code at a time. 🚀',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers: ['2', '3', '4'],
    following: ['2', '5'],
    joinedDate: '2020-01-15',
    verified: true,
  },
  {
    id: '2',
    username: 'sarahtech',
    displayName: 'Sarah Chen',
    bio: 'UX Designer & Frontend Developer. Creating beautiful and accessible web experiences. Design systems enthusiast.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers: ['1', '3', '4', '5'],
    following: ['1', '4'],
    joinedDate: '2019-08-22',
    verified: true,
  },
  {
    id: '3',
    username: 'mikecoder',
    displayName: 'Mike Rodriguez',
    bio: 'Full-stack developer | Open source contributor | Coffee addict ☕ | Building cool stuff with JavaScript',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers: ['1', '2'],
    following: ['1', '2', '4', '5'],
    joinedDate: '2021-03-10',
    verified: false,
  },
  {
    id: '4',
    username: 'emmadesign',
    displayName: 'Emma Wilson',
    bio: 'Product Designer at @TechCorp | Figma expert | Design thinking advocate | Making digital products more human',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers: ['1', '2', '3', '5'],
    following: ['2', '3'],
    joinedDate: '2020-11-05',
    verified: true,
  },
  {
    id: '5',
    username: 'alexstartup',
    displayName: 'Alex Thompson',
    bio: 'Entrepreneur | Startup founder | Tech enthusiast | Building the next big thing in AI and machine learning',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers: ['2', '3', '4'],
    following: ['1', '2', '3', '4'],
    joinedDate: '2018-06-18',
    verified: true,
  },
];

export const mockChirps: Chirp[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just shipped a new feature using React 18! The concurrent features are game-changing for user experience. Who else is excited about the future of React? 🚀',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likes: ['2', '3', '4'],
    rechirps: ['2'],
    comments: [
      {
        id: 'c1',
        userId: '2',
        content: 'Absolutely! The automatic batching feature alone is worth the upgrade.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        likes: ['1', '3'],
      },
    ],
  },
  {
    id: '2',
    userId: '2',
    content: 'Design systems are not just about components - they\'re about creating a shared language between design and development teams. Here\'s what I\'ve learned after 3 years of building them...',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: ['1', '3', '4', '5'],
    rechirps: ['1', '4'],
    comments: [
      {
        id: 'c2',
        userId: '4',
        content: 'This is so true! Documentation is key to making design systems successful.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        likes: ['2', '1'],
      },
    ],
  },
  {
    id: '3',
    userId: '3',
    content: 'Hot take: TypeScript isn\'t just about catching bugs - it\'s about making your code more readable and self-documenting. The developer experience improvements are incredible! 💯',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    likes: ['1', '2', '5'],
    rechirps: ['1'],
    comments: [],
  },
  {
    id: '4',
    userId: '4',
    content: 'Working on a new mobile app design and I\'m amazed by how much user research can change your perspective. Always start with understanding your users! 📱✨',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    likes: ['2', '3', '5'],
    rechirps: ['2', '5'],
    comments: [
      {
        id: 'c3',
        userId: '5',
        content: 'User research is everything! What methods do you use for mobile app research?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        likes: ['4'],
      },
    ],
  },
  {
    id: '5',
    userId: '5',
    content: 'The AI revolution is here, but it\'s not about replacing humans - it\'s about augmenting human capabilities. Excited to see how this transforms every industry! 🤖',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    likes: ['1', '2', '3', '4'],
    rechirps: ['3', '4'],
    comments: [
      {
        id: 'c4',
        userId: '1',
        content: 'Completely agree! AI as a tool to enhance creativity and productivity.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
        likes: ['5', '2'],
      },
    ],
  },
  {
    id: '6',
    userId: '1',
    content: 'Beautiful sunset today! Sometimes you need to step away from the code and appreciate the simple things in life. 🌅',
    image: 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    likes: ['2', '4', '5'],
    rechirps: ['2'],
    comments: [],
  },
  {
    id: '7',
    userId: '3',
    content: 'Just discovered this amazing open source library that makes API calls so much cleaner. The developer experience is fantastic! Link in the comments 👇',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(), // 16 hours ago
    likes: ['1', '2'],
    rechirps: [],
    comments: [
      {
        id: 'c5',
        userId: '3',
        content: 'Here\'s the link: github.com/awesome-api-lib - definitely worth checking out!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
        likes: ['1'],
      },
    ],
  },
  {
    id: '8',
    userId: '2',
    content: 'Accessibility isn\'t an afterthought - it should be built into every design decision from day one. Here are 5 simple ways to make your designs more inclusive...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // 20 hours ago
    likes: ['1', '3', '4', '5'],
    rechirps: ['1', '4', '5'],
    comments: [
      {
        id: 'c6',
        userId: '4',
        content: 'This should be required reading for every designer and developer!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString(),
        likes: ['2', '1', '3'],
      },
    ],
  },
];