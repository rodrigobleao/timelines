export interface TimelineItem {
  id: number;
  name: string;
  start: string;
  end: string;
}

export default function assignLanes(items: TimelineItem[]): TimelineItem[][] {
  const sortedItems = items
    .slice()
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  const lanes: TimelineItem[][] = [];

  function assignItemToLane(item: TimelineItem) {
    for (const lane of lanes) {
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item);
        return;
      }
    }
    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }
  return lanes;
}
