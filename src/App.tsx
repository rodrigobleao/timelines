import React from 'react';
import './App.css';
import assignLanes from './assignLanes';
import timelineItems from './timelineItems';
import TimelineCard from './timelineCard';

const App: React.FC = () => {
  const lanes = assignLanes(timelineItems);

  return (
    <div className="p-6 font-sans">
      <h3 className="mb-6">{timelineItems.length} timeline items to render</h3>

      {lanes.map((lane, laneIndex) => (
        <div key={laneIndex} className="flex gap-4 mb-6">
          {lane.map((item, itemIndex) => (
            <TimelineCard
              key={itemIndex}
              name={item.name}
              start={item.start}
              end={item.end}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
