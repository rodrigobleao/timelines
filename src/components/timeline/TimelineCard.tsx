import React, { useState } from 'react';
import { calculateDays } from './utils';

interface TimelineCardProps {
  id: number;
  name: string;
  start: string;
  end: string;
  onNameChange: (id: number, newName: string) => void;
  style?: React.CSSProperties;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  id,
  name,
  start,
  end,
  onNameChange,
  style,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  const finishEditing = () => {
    if (currentName.trim() !== name) {
      onNameChange(id, currentName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      finishEditing();
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-lg"
      style={style}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div>
        {isEditing ? (
          <input
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            onBlur={finishEditing}
            onKeyDown={handleKeyPress}
            className="w-full font-bold text-lg bg-gray-100 rounded px-2"
            autoFocus
          />
        ) : (
          <h4 className="font-bold text-lg text-gray-800">{currentName}</h4>
        )}
        <p className="text-sm text-gray-500">
          {start} to {end}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Duration: {calculateDays(start, end)} days
        </p>
      </div>
    </div>
  );
};

export default TimelineCard;
