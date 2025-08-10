import { useState } from 'react';

export const useZoom = (initialZoom = 1) => {
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = () => setZoom((z) => parseFloat((z + 0.1).toFixed(2)));
  const zoomOut = () =>
    setZoom((z) => Math.max(0.1, parseFloat((z - 0.1).toFixed(2))));

  return { zoom, zoomIn, zoomOut };
};
