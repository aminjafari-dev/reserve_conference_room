import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import DateTimePicker from './components/DateTimePicker';
import ReservationList from './components/ReservationList';
import RoomCard from './components/RoomCard';
import { rooms } from './data/rooms';
import { Reservation } from './types';

function App() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string | null>('09:00');
  const [endTime, setEndTime] = useState<string | null>('10:00');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleReservation = () => {
    if (selectedRoomId && selectedDate && startTime && endTime) {
      const newReservation: Reservation = {
        id: Math.random().toString(36).substr(2, 9),
        roomId: selectedRoomId,
        date: selectedDate,
        startTime,
        endTime
      };
      
      setReservations([...reservations, newReservation]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setStartTime('09:00');
      setEndTime('10:00');
      setSelectedDate(null);
    }
  };

  const isTimeSlotTaken = (date: Date, start: string, end: string) => {
    return reservations.some((r) => {
      if (r.roomId !== selectedRoomId) return false;
      if (r.date.toDateString() !== date.toDateString()) return false;
      const currentStart = new Date(`1970-01-01T${start}`);
      const currentEnd = new Date(`1970-01-01T${end}`);
      const reservationStart = new Date(`1970-01-01T${r.startTime}`);
      const reservationEnd = new Date(`1970-01-01T${r.endTime}`);
      return (
        (currentStart >= reservationStart && currentStart < reservationEnd) ||
        (currentEnd > reservationStart && currentEnd <= reservationEnd) ||
        (currentStart <= reservationStart && currentEnd >= reservationEnd)
      );
    });
  };

  const canReserve = selectedRoomId && selectedDate && startTime && endTime && 
    !isTimeSlotTaken(selectedDate, startTime, endTime);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Room Reservation</h1>
            <p className="text-gray-600">Select a room and book your perfect time</p>
          </header>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isSelected={selectedRoomId === room.id}
                onClick={() => setSelectedRoomId(room.id)}
              />
            ))}
          </div>

          {selectedRoomId && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <DateTimePicker
                selectedDate={selectedDate}
                startTime={startTime}
                endTime={endTime}
                onDateChange={setSelectedDate}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
              />

              {!canReserve && selectedDate && startTime && endTime && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  This time slot is already taken. Please select a different time.
                </div>
              )}

              <button
                onClick={handleReservation}
                disabled={!canReserve}
                className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold transition-colors
                  ${canReserve
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Confirm Reservation
              </button>

              {showSuccess && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Reservation confirmed successfully!</span>
                </div>
              )}
            </div>
          )}

          <ReservationList reservations={reservations} rooms={rooms} />
        </div>
      </div>
    </div>
  );
}

export default App;