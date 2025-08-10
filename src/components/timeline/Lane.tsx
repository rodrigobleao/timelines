import React from 'react';
import { calculateDays, calculateCardWidth, calculateOffset } from './utils';
import type { TimelineItem } from './types';
import TimelineCard from './TimelineCard';

interface LaneProps {
  lane: TimelineItem[];
  minDate: Date;
  onNameChange: (id: number, newName: string) => void;
  zoom: number;
}

const Lane: React.FC<LaneProps> = ({ lane, minDate, onNameChange, zoom }) => {
  let prevVisualEnd = 0;

  return (
    <div className="relative h-[120px]">
      {lane.map((item) => {
        const width = calculateCardWidth(
          calculateDays(item.start, item.end),
          zoom
        );
        const baseOffset = calculateOffset(item.start, minDate, zoom);

        const adjustedOffset = Math.max(baseOffset, prevVisualEnd);

        prevVisualEnd = adjustedOffset + width;

        return (
          <TimelineCard
            key={item.id}
            id={item.id}
            name={item.name}
            start={item.start}
            end={item.end}
            onNameChange={onNameChange}
            style={{
              position: 'absolute',
              width,
              left: adjustedOffset,
              height: '100%',
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
};

export default Lane;
