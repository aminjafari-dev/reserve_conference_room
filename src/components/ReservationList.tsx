import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Reservation, Room } from '../types';

interface ReservationListProps {
  reservations: Reservation[];
  rooms: Room[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations, rooms }) => {
  if (reservations.length === 0) return null;

  const groupedReservations = rooms.map(room => ({
    room,
    reservations: reservations.filter(r => r.roomId === room.id)
  }));

  return (
    <div className="mt-8 space-y-6">
      {groupedReservations.map(({ room, reservations }) => (
        <div key={room.id} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={room.image}
              alt={room.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <h2 className="text-xl font-semibold">{room.name} Reservations</h2>
          </div>
          
          {reservations.length === 0 ? (
            <p className="text-gray-500 italic">No current reservations</p>
          ) : (
            <div className="space-y-3">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="text-indigo-600 w-5 h-5" />
                    <span className="font-medium">{reservation.date.toLocaleDateString()}</span>
                    <Clock className="text-indigo-600 w-5 h-5 ml-4" />
                    <span>{reservation.startTime} - {reservation.endTime}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReservationList;