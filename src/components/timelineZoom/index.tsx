import React from 'react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut }) => {
  const baseBtn =
    'p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition text-lg font-bold flex items-center justify-center w-8 h-8';

  return (
    <div className="flex gap-2">
      <button className={baseBtn} onClick={onZoomOut} aria-label="Zoom out">
        −
      </button>
      <button className={baseBtn} onClick={onZoomIn} aria-label="Zoom in">
        +
      </button>
    </div>
  );
};

export default ZoomControls;
