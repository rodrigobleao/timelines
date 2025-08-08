import React, { useState, useMemo } from 'react';
import './App.css';
import assignLanes, { type TimelineItem } from './assignLanes';
import timelineItemsData from './timelineItems';
import TimelineCard from './timelineCard';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const WIDTH_PER_DAY = 40;
const MIN_WIDTH = 224;

const App: React.FC = () => {
  const [items, setItems] = useState<TimelineItem[]>(timelineItemsData);

  const lanes = useMemo(() => assignLanes(items), [items]);

  const handleNameChange = (
    oldName: string,
    start: string,
    newName: string
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === oldName && item.start === start
          ? { ...item, name: newName }
          : item
      )
    );
  };

  const minDate = useMemo(() => {
    let min = new Date(items[0].start);
    items.forEach(({ start }) => {
      const d = new Date(start);
      if (d < min) min = d;
    });
    return min;
  }, [items]);

  const totalTimelineWidth = useMemo(() => {
    if (items.length === 0) return 0;

    const maxEnd = items.reduce((max, item) => {
      const itemEnd = new Date(item.end);
      return itemEnd > max ? itemEnd : max;
    }, new Date(items[0].end));

    const days =
      Math.floor((maxEnd.getTime() - minDate.getTime()) / MS_PER_DAY) + 1;
    return days * WIDTH_PER_DAY + MIN_WIDTH;
  }, [items, minDate]);

  return (
    <div className="p-6 font-sans">
      <h3 className="mb-6 text-2xl font-semibold text-gray-700">
        Items to render ({items.length} items)
      </h3>

      <div
        className="overflow-x-auto overflow-y-auto rounded-xl shadow-inner bg-gray-50 p-4"
        style={{ width: '100%', height: 'calc(100vh - 120px)' }}
      >
        <div
          className="flex flex-col gap-8 relative"
          style={{ width: `${totalTimelineWidth}px` }}
        >
          {lanes.map((lane, laneIndex) => {
            let runningWidth = 0;
            return (
              <div
                key={laneIndex}
                className="relative flex flex-row items-center"
                style={{ height: 160 }}
              >
                {lane.map((item) => {
                  const days =
                    (new Date(item.end).getTime() -
                      new Date(item.start).getTime()) /
                      MS_PER_DAY +
                    1;
                  const customWidth = days * WIDTH_PER_DAY;
                  const width =
                    customWidth < MIN_WIDTH ? MIN_WIDTH : customWidth;

                  const idealOffset =
                    ((new Date(item.start).getTime() - minDate.getTime()) /
                      MS_PER_DAY) *
                    WIDTH_PER_DAY;

                  const marginLeft = idealOffset - runningWidth;

                  runningWidth += width + marginLeft;

                  return (
                    <TimelineCard
                      key={item.id}
                      name={item.name}
                      start={item.start}
                      end={item.end}
                      onNameChange={(newName) =>
                        handleNameChange(item.name, item.start, newName)
                      }
                      style={{
                        width,
                        minWidth: width,
                        maxWidth: width,
                        height: '100%',
                        marginLeft: `${marginLeft}px`,
                        flexShrink: 0,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
