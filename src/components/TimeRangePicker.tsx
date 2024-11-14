import React from 'react';
import { Clock } from 'lucide-react';

interface TimeRangePickerProps {
  startTime: string | null;
  endTime: string | null;
  onStartTimeSelect: (time: string) => void;
  onEndTimeSelect: (time: string) => void;
  isTimeSlotTaken: (time: string) => boolean;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  startTime,
  endTime,
  onStartTimeSelect,
  onEndTimeSelect,
  isTimeSlotTaken,
}) => {
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push(
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        );
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const isEndTimeValid = (time: string) => {
    if (!startTime) return false;
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${time}`);
    return end > start;
  };

  const isStartTimeValid = (time: string) => {
    if (endTime) {
      const start = new Date(`1970-01-01T${time}`);
      const end = new Date(`1970-01-01T${endTime}`);
      return start < end;
    }
    return true;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Time
        </label>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((time) => {
            const isTaken = isTimeSlotTaken(time);
            const isValid = isStartTimeValid(time);
            return (
              <button
                key={`start-${time}`}
                onClick={() => isValid && !isTaken && onStartTimeSelect(time)}
                disabled={isTaken || !isValid}
                className={`
                  p-2 rounded-lg text-sm flex items-center justify-center gap-1
                  ${isTaken || !isValid
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : startTime === time
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 hover:border-indigo-500 text-gray-700'
                  }
                `}
              >
                <Clock className="w-3 h-3" />
                {time}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Time
        </label>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((time) => {
            const isTaken = isTimeSlotTaken(time);
            const isValid = isEndTimeValid(time);
            return (
              <button
                key={`end-${time}`}
                onClick={() => isValid && !isTaken && onEndTimeSelect(time)}
                disabled={!isValid || isTaken}
                className={`
                  p-2 rounded-lg text-sm flex items-center justify-center gap-1
                  ${!isValid || isTaken
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : endTime === time
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 hover:border-indigo-500 text-gray-700'
                  }
                `}
              >
                <Clock className="w-3 h-3" />
                {time}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeRangePicker;