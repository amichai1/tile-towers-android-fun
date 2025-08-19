
import React from 'react';

interface GameTileProps {
  value: number;
}

const GameTile = ({ value }: GameTileProps) => {
  const getTileStyles = (val: number) => {
    if (val === 0) {
      return 'bg-white bg-opacity-30 text-transparent';
    }
    
    const styles: { [key: number]: string } = {
      2: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900',
      4: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-900',
      8: 'bg-gradient-to-br from-pink-200 to-pink-300 text-pink-900',
      16: 'bg-gradient-to-br from-orange-200 to-orange-300 text-orange-900',
      32: 'bg-gradient-to-br from-red-300 to-red-400 text-red-900',
      64: 'bg-gradient-to-br from-yellow-300 to-yellow-400 text-yellow-900',
      128: 'bg-gradient-to-br from-green-300 to-green-400 text-green-900',
      256: 'bg-gradient-to-br from-teal-400 to-teal-500 text-teal-900',
      512: 'bg-gradient-to-br from-cyan-400 to-cyan-500 text-cyan-900',
      1024: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white',
      2048: 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
    };
    
    return styles[val] || 'bg-gradient-to-br from-gray-700 to-gray-800 text-white';
  };

  return (
    <div
      className={`
        w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm
        transform transition-all duration-150 ease-in-out
        ${getTileStyles(value)}
        ${value >= 1024 ? 'text-xs' : ''}
        ${value === 2048 ? 'animate-pulse' : ''}
      `}
    >
      {value > 0 && value.toLocaleString()}
    </div>
  );
};

export default GameTile;
