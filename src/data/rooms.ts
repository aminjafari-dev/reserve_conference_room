import { Room } from '../types';
import { Users, Wifi, Monitor, Coffee, Mic, HeadphonesIcon, SpeakerIcon } from 'lucide-react';

export const rooms: Room[] = [
  {
    id: 'meeting-room',
    name: 'Executive Conference Room',
    type: 'Meeting Room',
    capacity: 12,
    location: '4th Floor, East Wing',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    amenities: [
      { icon: 'Wifi', label: 'High-speed WiFi' },
      { icon: 'Monitor', label: '4K Display' },
      { icon: 'Coffee', label: 'Refreshments' }
    ]
  },
  {
    id: 'podcast-room',
    name: 'Professional Podcast Studio',
    type: 'Podcast Room',
    capacity: 4,
    location: '3rd Floor, West Wing',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000',
    amenities: [
      { icon: 'Mic', label: 'Professional Microphones' },
      { icon: 'HeadphonesIcon', label: 'Studio Headphones' },
      { icon: 'SpeakerIcon', label: 'Monitor Speakers' }
    ]
  }
];