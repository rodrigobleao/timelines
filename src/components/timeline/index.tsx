import React from 'react';
import { useTimeline } from './useTimeLine';
import timelineItemsData from './timelineItems';
import Lane from './Lane';

const Timeline: React.FC = () => {
  const { lanes, minDate, handleNameChange } = useTimeline(timelineItemsData);

  return (
    <div
      className="overflow-auto rounded-xl shadow-inner bg-gray-50 p-4 w-full"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className="flex flex-col gap-8 relative w-full">
        {lanes.map((lane, idx) => (
          <Lane
            key={idx}
            lane={lane}
            minDate={minDate}
            onNameChange={handleNameChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
