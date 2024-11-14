import React from 'react';
import { Room } from '../types';
import { Users, MapPin, Wifi, Monitor, Coffee, Mic, Headphones, Speaker } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Wifi,
  Monitor,
  Coffee,
  Mic,
  HeadphonesIcon: Headphones,
  SpeakerIcon: Speaker
};

const RoomCard: React.FC<RoomCardProps> = ({ room, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all
        ${isSelected ? 'ring-2 ring-indigo-600' : 'hover:shadow-xl'}`}
    >
      <div className="relative mb-6">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
          {room.type}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">{room.name}</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Users className="text-indigo-600" />
          <span>Capacity: {room.capacity} people</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="text-indigo-600" />
          <span>Location: {room.location}</span>
        </div>

        <div className="border-t pt-4 mt-4">
          <h4 className="font-semibold mb-3">Amenities</h4>
          <div className="grid grid-cols-2 gap-3">
            {room.amenities.map((amenity, index) => {
              const Icon = iconMap[amenity.icon];
              return (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <Icon className="w-4 h-4 text-indigo-600" />
                  <span>{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;