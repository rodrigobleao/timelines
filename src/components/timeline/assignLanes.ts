import type { TimelineItem } from './types';
import { calculateDays, calculateOffset, WIDTH_PER_DAY } from './utils';

export default function assignLanes(
  items: TimelineItem[],
  minDate: Date,
  zoom: number
): TimelineItem[][] {
  const sortedItems = items
    .slice()
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const lanes: TimelineItem[][] = [];
  const laneMaxEndOffset: number[] = [];

  for (const item of sortedItems) {
    let placed = false;

    const itemOffset = calculateOffset(item.start, minDate, zoom);
    const days = calculateDays(item.start, item.end);
    const itemVisualEnd = itemOffset + days * WIDTH_PER_DAY;

    for (let laneIndex = 0; laneIndex < lanes.length; laneIndex++) {
      if (itemOffset >= laneMaxEndOffset[laneIndex]) {
        lanes[laneIndex].push(item);
        laneMaxEndOffset[laneIndex] = itemVisualEnd;
        placed = true;
        break;
      }
    }

    if (!placed) {
      lanes.push([item]);
      laneMaxEndOffset.push(itemVisualEnd);
    }
  }

  return lanes;
}
