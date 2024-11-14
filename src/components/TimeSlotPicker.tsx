import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotPickerProps {
  onTimeSelect: (time: string) => void;
  selectedTime: string | null;
  isTimeSlotTaken: (time: string) => boolean;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  onTimeSelect,
  selectedTime,
  isTimeSlotTaken,
}) => {
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {timeSlots.map((time) => {
        const isTaken = isTimeSlotTaken(time);
        return (
          <button
            key={time}
            onClick={() => !isTaken && onTimeSelect(time)}
            disabled={isTaken}
            className={`
              p-3 rounded-lg flex items-center justify-center gap-2
              ${isTaken 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : selectedTime === time
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 hover:border-indigo-500 text-gray-700'
              }
            `}
          >
            <Clock className="w-4 h-4" />
            {time}
          </button>
        );
      })}
    </div>
  );
};

export default TimeSlotPicker;