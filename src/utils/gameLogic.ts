
export const initializeBoard = (): number[][] => {
  return Array(4).fill(null).map(() => Array(4).fill(0));
};

export const addRandomTile = (board: number[][]): void => {
  const emptyCells: [number, number][] = [];
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
};

const slideArray = (arr: number[]): { newArray: number[], score: number } => {
  const filtered = arr.filter(val => val !== 0);
  const newArray = [...filtered];
  let score = 0;
  
  for (let i = 0; i < newArray.length - 1; i++) {
    if (newArray[i] === newArray[i + 1]) {
      newArray[i] *= 2;
      score += newArray[i];
      newArray[i + 1] = 0;
    }
  }
  
  const finalArray = newArray.filter(val => val !== 0);
  while (finalArray.length < 4) {
    finalArray.push(0);
  }
  
  return { newArray: finalArray, score };
};

export const move = (board: number[][], direction: string): { newBoard: number[][], scoreGained: number } => {
  const newBoard = board.map(row => [...row]);
  let totalScore = 0;
  
  switch (direction) {
    case 'left':
      for (let i = 0; i < 4; i++) {
        const { newArray, score } = slideArray(newBoard[i]);
        newBoard[i] = newArray;
        totalScore += score;
      }
      break;
    case 'right':
      for (let i = 0; i < 4; i++) {
        const reversed = [...newBoard[i]].reverse();
        const { newArray, score } = slideArray(reversed);
        newBoard[i] = newArray.reverse();
        totalScore += score;
      }
      break;
    case 'up':
      for (let j = 0; j < 4; j++) {
        const column = [newBoard[0][j], newBoard[1][j], newBoard[2][j], newBoard[3][j]];
        const { newArray, score } = slideArray(column);
        for (let i = 0; i < 4; i++) {
          newBoard[i][j] = newArray[i];
        }
        totalScore += score;
      }
      break;
    case 'down':
      for (let j = 0; j < 4; j++) {
        const column = [newBoard[3][j], newBoard[2][j], newBoard[1][j], newBoard[0][j]];
        const { newArray, score } = slideArray(column);
        for (let i = 0; i < 4; i++) {
          newBoard[3 - i][j] = newArray[i];
        }
        totalScore += score;
      }
      break;
  }
  
  return { newBoard, scoreGained: totalScore };
};

export const canMove = (board: number[][], direction: string): boolean => {
  const { newBoard } = move(board, direction);
  return JSON.stringify(board) !== JSON.stringify(newBoard);
};

export const checkWin = (board: number[][]): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 2048) {
        return true;
      }
    }
  }
  return false;
};

export const checkGameOver = (board: number[][]): boolean => {
  // Check for empty cells
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  
  // Check for possible merges
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const current = board[i][j];
      if (
        (i < 3 && board[i + 1][j] === current) ||
        (j < 3 && board[i][j + 1] === current)
      ) {
        return false;
      }
    }
  }
  
  return true;
};
