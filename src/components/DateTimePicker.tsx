import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';

interface DateTimePickerProps {
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onDateChange: (date: Date) => void;
  selectedDate: Date | null;
  startTime: string | null;
  endTime: string | null;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onStartTimeChange,
  onEndTimeChange,
  onDateChange,
  selectedDate,
  startTime,
  endTime,
}) => {
  const [showStartHours, setShowStartHours] = useState(false);
  const [showStartMinutes, setShowStartMinutes] = useState(false);
  const [showEndHours, setShowEndHours] = useState(false);
  const [showEndMinutes, setShowEndMinutes] = useState(false);

  const hours = Array.from({ length: 13 }, (_, i) => i + 9); // 9 AM to 21 PM
  const minutes = Array.from({ length: 4 }, (_, i) => i * 15); // 0, 15, 30, 45

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const parseTime = (timeString: string | null) => {
    if (!timeString) return { hour: 9, minute: 0 };
    const [hour, minute] = timeString.split(':').map(Number);
    return { hour, minute };
  };

  const handleStartTimeChange = (hour?: number, minute?: number) => {
    const current = parseTime(startTime);
    const newHour = hour ?? current.hour;
    const newMinute = minute ?? current.minute;
    onStartTimeChange(formatTime(newHour, newMinute));
    setShowStartHours(false);
    setShowStartMinutes(false);
  };

  const handleEndTimeChange = (hour?: number, minute?: number) => {
    const current = parseTime(endTime);
    const newHour = hour ?? current.hour;
    const newMinute = minute ?? current.minute;
    onEndTimeChange(formatTime(newHour, newMinute));
    setShowEndHours(false);
    setShowEndMinutes(false);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="text-indigo-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-700">Select Date</h2>
        </div>
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => onDateChange(new Date(e.target.value))}
          min={new Date().toISOString().split('T')[0]}
          value={selectedDate?.toISOString().split('T')[0] || ''}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Start Time */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-indigo-600 w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-700">Start Time</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setShowStartHours(!showStartHours);
                  setShowStartMinutes(false);
                }}
                className="w-full p-3 text-2xl font-bold text-gray-700 border border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center justify-between">
                  <span>{parseTime(startTime).hour.toString().padStart(2, '0')}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </button>
              {showStartHours && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => handleStartTimeChange(hour)}
                      className="w-full p-2 text-left hover:bg-indigo-50 text-gray-700"
                    >
                      {hour.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-2xl font-bold text-gray-700">:</span>
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setShowStartMinutes(!showStartMinutes);
                  setShowStartHours(false);
                }}
                className="w-full p-3 text-2xl font-bold text-gray-700 border border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center justify-between">
                  <span>{parseTime(startTime).minute.toString().padStart(2, '0')}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </button>
              {showStartMinutes && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      onClick={() => handleStartTimeChange(undefined, minute)}
                      className="w-full p-2 text-left hover:bg-indigo-50 text-gray-700"
                    >
                      {minute.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* End Time */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-indigo-600 w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-700">End Time</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setShowEndHours(!showEndHours);
                  setShowEndMinutes(false);
                }}
                className="w-full p-3 text-2xl font-bold text-gray-700 border border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center justify-between">
                  <span>{parseTime(endTime).hour.toString().padStart(2, '0')}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </button>
              {showEndHours && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => handleEndTimeChange(hour)}
                      className="w-full p-2 text-left hover:bg-indigo-50 text-gray-700"
                    >
                      {hour.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-2xl font-bold text-gray-700">:</span>
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setShowEndMinutes(!showEndMinutes);
                  setShowEndHours(false);
                }}
                className="w-full p-3 text-2xl font-bold text-gray-700 border border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center justify-between">
                  <span>{parseTime(endTime).minute.toString().padStart(2, '0')}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </button>
              {showEndMinutes && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      onClick={() => handleEndTimeChange(undefined, minute)}
                      className="w-full p-2 text-left hover:bg-indigo-50 text-gray-700"
                    >
                      {minute.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;