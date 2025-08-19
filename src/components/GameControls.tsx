
import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface GameControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const GameControls = ({ onMove }: GameControlsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-36">
      <div></div>
      <button
        onClick={() => onMove('up')}
        className="bg-white bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <ChevronUp size={18} />
      </button>
      <div></div>
      
      <button
        onClick={() => onMove('left')}
        className="bg-white bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <ChevronRight size={18} />
      </button>
      <div></div>
      <button
        onClick={() => onMove('right')}
        className="bg-white bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <ChevronLeft size={18} />
      </button>
      
      <div></div>
      <button
        onClick={() => onMove('down')}
        className="bg-white bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <ChevronDown size={18} />
      </button>
      <div></div>
    </div>
  );
};

export default GameControls;
