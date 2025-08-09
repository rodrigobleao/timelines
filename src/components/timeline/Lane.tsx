import React from 'react';
import { calculateDays, calculateCardWidth, calculateOffset } from './utils';
import TimelineCard from './timelineCard';

interface TimelineItem {
  id: number;
  name: string;
  start: string;
  end: string;
}

interface LaneProps {
  lane: TimelineItem[];
  minDate: Date;
  onNameChange: (id: number, newName: string) => void;
}

const getAdjustedOffset = (
  item: TimelineItem,
  minDate: Date,
  prevItem?: TimelineItem
) => {
  const baseOffset = calculateOffset(item.start, minDate);
  if (!prevItem) return baseOffset;

  const prevOffset = calculateOffset(prevItem.start, minDate);
  const prevWidth = calculateCardWidth(
    calculateDays(prevItem.start, prevItem.end)
  );
  const prevVisualEnd = prevOffset + prevWidth;

  return Math.max(baseOffset, prevVisualEnd);
};

const Lane: React.FC<LaneProps> = ({ lane, minDate, onNameChange }) => {
  return (
    <div className="relative h-[120px]">
      {lane.map((item, index) => {
        const width = calculateCardWidth(calculateDays(item.start, item.end));
        const adjustedOffset = getAdjustedOffset(
          item,
          minDate,
          lane[index - 1]
        );

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
