import React from 'react';
import './App.css';
import Timeline from './components/timeline';
import { useZoom } from './components/timelineZoom/useZoom';
import ZoomControls from './components/timelineZoom';

const App: React.FC = () => {
  const { zoom, zoomIn, zoomOut } = useZoom();

  return (
    <div className="p-6 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Timeline</h1>
        <ZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} />
      </div>
      <Timeline zoom={zoom} />
    </div>
  );
};

export default App;
