
import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';
import GameControls from './GameControls';
import { initializeBoard, addRandomTile, canMove, move, checkWin, checkGameOver } from '../utils/gameLogic';

const Game = () => {
  const [board, setBoard] = useState(() => {
    const initialBoard = initializeBoard();
    addRandomTile(initialBoard);
    addRandomTile(initialBoard);
    return initialBoard;
  });
  
  const [score, setScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('2048-best-score');
    return saved ? parseInt(saved) : 0;
  });
  const [gameTime, setGameTime] = useState(0);
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('2048-best-time');
    return saved ? parseInt(saved) : 0;
  });
  const [startTime, setStartTime] = useState(Date.now());

  const resetGame = () => {
    const newBoard = initializeBoard();
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setHasWon(false);
    setGameOver(false);
    setGameTime(0);
    setStartTime(Date.now());
  };

  const handleMove = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;
    
    if (!canMove(board, direction)) return;
    
    const { newBoard, scoreGained } = move(board, direction);
    addRandomTile(newBoard);
    
    const newScore = score + scoreGained;
    setBoard(newBoard);
    setScore(newScore);
    
    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem('2048-best-score', newScore.toString());
    }
    
    if (!hasWon && checkWin(newBoard)) {
      setHasWon(true);
      const winTime = gameTime;
      if (bestTime === 0 || winTime < bestTime) {
        setBestTime(winTime);
        localStorage.setItem('2048-best-time', winTime.toString());
      }
    }
    
    setTimeout(() => {
      if (checkGameOver(newBoard)) {
        setGameOver(true);
      }
    }, 150);
  }, [board, score, bestScore, hasWon, gameOver]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          handleMove('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          handleMove('down');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handleMove('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleMove('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMove]);

  useEffect(() => {
    if (!gameOver && !hasWon) {
      const timer = setInterval(() => {
        setGameTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, gameOver, hasWon]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <GameHeader 
        score={score} 
        bestScore={bestScore} 
        gameTime={formatTime(gameTime)}
        bestTime={bestTime > 0 ? formatTime(bestTime) : '--:--'}
        onReset={resetGame} 
      />
      <GameBoard board={board} onMove={handleMove} />
      <GameControls onMove={handleMove} />
      
      {hasWon && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">🎉 ניצחת!</h2>
            <p className="text-gray-700 mb-2">הגעת ל-2048!</p>
            <p className="text-gray-700 mb-4">זמן: {formatTime(gameTime)}</p>
            <button
              onClick={() => setHasWon(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              המשך לשחק
            </button>
          </div>
        </div>
      )}
      
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4">
            <h2 className="text-3xl font-bold text-red-600 mb-4">המשחק נגמר!</h2>
            <p className="text-gray-700 mb-4">הניקוד שלך: {score}</p>
            <button
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              שחק שוב
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
