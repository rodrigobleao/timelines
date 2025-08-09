import { useState, useMemo } from 'react';
import assignLanes from './assignLanes';
import type { TimelineItem } from './types';

export const useTimeline = (initialItems: TimelineItem[]) => {
  const [items, setItems] = useState<TimelineItem[]>(initialItems);

  const minDate = useMemo(() => {
    return new Date(
      Math.min(...items.map((item) => new Date(item.start).getTime()))
    );
  }, [items]);

  const lanes = useMemo(() => assignLanes(items, minDate), [items, minDate]);

  const handleNameChange = (id: number, newName: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  return { items, lanes, minDate, handleNameChange };
};
