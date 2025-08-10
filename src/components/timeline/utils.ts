export const MS_PER_DAY = 1000 * 60 * 60 * 24;
export const WIDTH_PER_DAY = 40;
export const MIN_WIDTH = 224;

export function calculateDays(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getTime() - startDate.getTime()) / MS_PER_DAY + 1;
}

export function calculateCardWidth(days: number, zoom: number): number {
  const width = days * WIDTH_PER_DAY * zoom;
  return width < MIN_WIDTH ? MIN_WIDTH : width;
}

export function calculateOffset(
  start: string,
  minDate: Date,
  zoom: number
): number {
  const startDate = new Date(start);
  return (
    ((startDate.getTime() - minDate.getTime()) / MS_PER_DAY) *
    WIDTH_PER_DAY *
    zoom
  );
}

export function calculateEndDate(dateString: string): Date {
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 999);
  return date;
}
