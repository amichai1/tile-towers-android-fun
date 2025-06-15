
import React from 'react';
import GameTile from './GameTile';

interface GameBoardProps {
  board: number[][];
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const GameBoard = ({ board, onMove }: GameBoardProps) => {
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endTouch = endEvent.changedTouches[0];
      const deltaX = endTouch.clientX - startX;
      const deltaY = endTouch.clientY - startY;
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          onMove(deltaX > 0 ? 'right' : 'left');
        }
      } else {
        if (Math.abs(deltaY) > minSwipeDistance) {
          onMove(deltaY > 0 ? 'down' : 'up');
        }
      }

      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl mb-6"
      onTouchStart={handleTouchStart}
    >
      <div className="grid grid-cols-4 gap-3">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <GameTile
              key={`${rowIndex}-${colIndex}`}
              value={value}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
