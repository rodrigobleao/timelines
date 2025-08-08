import React, { useState } from 'react';

interface TimelineCardProps {
  name: string;
  start: string;
  end: string;
  onNameChange?: (newName: string) => void;
  style?: React.CSSProperties;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  name,
  start,
  end,
  onNameChange,
  style,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onNameChange) {
        onNameChange(currentName);
      }
      setIsEditing(false);
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
            onBlur={() => {
              if (onNameChange) {
                onNameChange(currentName);
              }
              setIsEditing(false);
            }}
            onKeyDown={handleKeyPress}
            className="w-full font-bold text-lg bg-gray-100 rounded px-2"
            autoFocus
          />
        ) : (
          <h4 className="font-bold text-lg text-gray-800">{name}</h4>
        )}
        <p className="text-sm text-gray-600 mt-2">
          {start} to {end}
        </p>
      </div>
      <div className="text-right text-xs text-gray-400 mt-2">
        Double-click to edit
      </div>
    </div>
  );
};

export default TimelineCard;
