
import React from 'react';

interface GameHeaderProps {
  score: number;
  bestScore: number;
  gameTime: string;
  bestTime: string;
  onReset: () => void;
}

const GameHeader = ({ score, bestScore, gameTime, bestTime, onReset }: GameHeaderProps) => {
  return (
    <div className="w-full mb-3">
      <h1 className="text-3xl font-bold text-center text-white mb-3 drop-shadow-lg">2048</h1>
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-3">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
            <div className="text-white text-xs font-medium">ניקוד</div>
            <div className="text-white text-sm font-bold">{score.toLocaleString()}</div>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
            <div className="text-white text-xs font-medium">שיא</div>
            <div className="text-white text-sm font-bold">{bestScore.toLocaleString()}</div>
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
            <div className="text-white text-xs font-medium">זמן</div>
            <div className="text-white text-sm font-bold">{gameTime}</div>
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
            <div className="text-white text-xs font-medium">שיא זמן</div>
            <div className="text-white text-sm font-bold">{bestTime}</div>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="bg-white bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm text-white px-4 py-1 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105"
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
