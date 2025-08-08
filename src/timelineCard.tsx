import React from 'react';

interface TimelineCardProps {
  name: string;
  start: string;
  end: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ name, start, end }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 min-w-[224px] bg-gray-50 shadow-sm text-center">
      <strong className="block truncate">{name}</strong>
      <div className="mt-2 text-sm text-gray-600">
        {start} → {end}
      </div>
    </div>
  );
};

export default TimelineCard;
