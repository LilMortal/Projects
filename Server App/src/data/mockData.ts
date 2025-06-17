import { Server, User } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  status: 'online'
};

export const mockServers: Server[] = [
  {
    id: 'server-1',
    name: 'Design Team',
    description: 'Creative collaboration space',
    icon: '🎨',
    members: [
      currentUser,
      { id: 'user-2', name: 'Sarah Chen', status: 'online' },
      { id: 'user-3', name: 'Mike Rodriguez', status: 'away' },
      { id: 'user-4', name: 'Emma Wilson', status: 'offline' }
    ],
    channels: [
      {
        id: 'channel-1',
        name: 'general',
        description: 'General discussion',
        type: 'text',
        messages: [
          {
            id: 'msg-1',
            content: 'Welcome to the Design Team workspace! 🎉',
            userId: 'user-2',
            timestamp: new Date('2024-01-15T09:00:00Z')
          },
          {
            id: 'msg-2',
            content: 'Excited to collaborate with everyone here!',
            userId: 'user-1',
            timestamp: new Date('2024-01-15T09:15:00Z')
          },
          {
            id: 'msg-3',
            content: 'Should we start with the new project mockups?',
            userId: 'user-3',
            timestamp: new Date('2024-01-15T10:30:00Z')
          }
        ]
      },
      {
        id: 'channel-2',
        name: 'projects',
        description: 'Project discussions',
        type: 'text',
        messages: [
          {
            id: 'msg-4',
            content: 'Here are the latest wireframes for the mobile app',
            userId: 'user-2',
            timestamp: new Date('2024-01-14T14:20:00Z')
          },
          {
            id: 'msg-5',
            content: 'The color palette looks great! Love the soft blues.',
            userId: 'user-4',
            timestamp: new Date('2024-01-14T15:45:00Z')
          }
        ]
      },
      {
        id: 'channel-3',
        name: 'resources',
        description: 'Shared resources and links',
        type: 'text',
        messages: [
          {
            id: 'msg-6',
            content: 'Added some great design inspiration links to our shared folder',
            userId: 'user-3',
            timestamp: new Date('2024-01-13T11:00:00Z')
          }
        ]
      }
    ]
  },
  {
    id: 'server-2',
    name: 'Dev Squad',
    description: 'Development team coordination',
    icon: '💻',
    members: [
      currentUser,
      { id: 'user-5', name: 'David Kim', status: 'online' },
      { id: 'user-6', name: 'Lisa Park', status: 'online' },
      { id: 'user-7', name: 'Tom Anderson', status: 'away' }
    ],
    channels: [
      {
        id: 'channel-4',
        name: 'general',
        description: 'General chat',
        type: 'text',
        messages: [
          {
            id: 'msg-7',
            content: 'Morning everyone! Ready for another productive day? ☕',
            userId: 'user-5',
            timestamp: new Date('2024-01-15T08:30:00Z')
          },
          {
            id: 'msg-8',
            content: 'Good morning! Just pushed the latest updates to staging.',
            userId: 'user-1',
            timestamp: new Date('2024-01-15T08:45:00Z')
          }
        ]
      },
      {
        id: 'channel-5',
        name: 'backend',
        description: 'Backend development',
        type: 'text',
        messages: [
          {
            id: 'msg-9',
            content: 'API performance improvements are looking good!',
            userId: 'user-6',
            timestamp: new Date('2024-01-14T16:20:00Z')
          }
        ]
      }
    ]
  },
  {
    id: 'server-3',
    name: 'Product Hub',
    description: 'Product strategy and planning',
    icon: '🚀',
    members: [
      currentUser,
      { id: 'user-8', name: 'Jennifer Lopez', status: 'online' },
      { id: 'user-9', name: 'Robert Taylor', status: 'offline' }
    ],
    channels: [
      {
        id: 'channel-6',
        name: 'strategy',
        description: 'Product strategy discussions',
        type: 'text',
        messages: [
          {
            id: 'msg-10',
            content: 'Q1 roadmap is shaping up nicely. Great work team! 📊',
            userId: 'user-8',
            timestamp: new Date('2024-01-12T13:15:00Z')
          }
        ]
      }
    ]
  }
];