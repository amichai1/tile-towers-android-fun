
import React from 'react';

interface GameHeaderProps {
  score: number;
  bestScore: number;
  onReset: () => void;
}

const GameHeader = ({ score, bestScore, onReset }: GameHeaderProps) => {
  return (
    <div className="w-full mb-6">
      <h1 className="text-5xl font-bold text-center text-white mb-6 drop-shadow-lg">2048</h1>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-white text-sm font-medium">ניקוד</div>
            <div className="text-white text-xl font-bold">{score.toLocaleString()}</div>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-white text-sm font-medium">שיא</div>
            <div className="text-white text-xl font-bold">{bestScore.toLocaleString()}</div>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="bg-white bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          משחק חדש
        </button>
      </div>
      
      <p className="text-white text-center text-sm opacity-80">
        החלק כדי לחבר מספרים ולהגיע ל-2048!
      </p>
    </div>
  );
};

export default GameHeader;
