import React from 'react';
import { Users, MapPin, Wifi, Monitor, Coffee } from 'lucide-react';

const RoomDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="relative mb-6">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
          alt="Meeting Room"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
          Premium Room
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Executive Conference Room</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Users className="text-indigo-600" />
          <span>Capacity: 12 people</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="text-indigo-600" />
          <span>Location: 4th Floor, East Wing</span>
        </div>

        <div className="border-t pt-4 mt-4">
          <h4 className="font-semibold mb-3">Amenities</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Wifi className="w-4 h-4 text-indigo-600" />
              <span>High-speed WiFi</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Monitor className="w-4 h-4 text-indigo-600" />
              <span>4K Display</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Coffee className="w-4 h-4 text-indigo-600" />
              <span>Refreshments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;