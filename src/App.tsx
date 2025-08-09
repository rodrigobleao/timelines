import React from 'react';
import './App.css';
import Timeline from './components/timeline';

const App: React.FC = () => {
  return (
    <div className="p-6 font-sans">
      <h3 className="mb-6 text-2xl font-semibold text-gray-700">My timeline</h3>
      <Timeline />
    </div>
  );
};

export default App;
