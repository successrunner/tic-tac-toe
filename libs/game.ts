// Types
export type Player = 'Computer' | 'User';
export type BoardSymbol = 'X' | 'O';
export type GameStatus = 'not_started' | 'playing' | 'won' | 'draw';
export type Board = (BoardSymbol | null)[];

// Constants
export const BOARD_SIZE = 9;
export const WIN_PATTERNS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
] as const;

export const initialBoard: Board = Array(BOARD_SIZE).fill(null);

/**
 * Calculates the winner of the game based on the current board state
 * @param board - The current game board
 * @returns The winning symbol or null if no winner
 */
export const calculateWinner = (board: Board): BoardSymbol | null => {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

/**
 * Checks if the board is completely filled
 * @param board - The current game board
 * @returns boolean indicating if the board is full
 */
export const isBoardFull = (board: Board): boolean =>
  board.every((cell) => cell !== null);

/**
 * Optimized minimax algorithm with alpha-beta pruning
 * @param board - The current game board
 * @param depth - Current depth in the game tree
 * @param isMaximizing - Whether the current move is maximizing or minimizing
 * @param computerSymbol - The symbol used by the computer
 * @param alpha - Best score for maximizing player
 * @param beta - Best score for minimizing player
 * @returns The best score for the current position
 */
export const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  computerSymbol: BoardSymbol,
  alpha: number = -Infinity,
  beta: number = Infinity,
): number => {
  const winner = calculateWinner(board);
  const humanSymbol: BoardSymbol = computerSymbol === 'X' ? 'O' : 'X';

  // Early return for terminal states
  if (winner === computerSymbol) return 10 - depth;
  if (winner === humanSymbol) return depth - 10;
  if (isBoardFull(board)) return 0;

  // Get available moves
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const index of availableMoves) {
      const newBoard = [...board];
      newBoard[index] = computerSymbol;
      const score = minimax(
        newBoard,
        depth + 1,
        false,
        computerSymbol,
        alpha,
        beta,
      );
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const index of availableMoves) {
      const newBoard = [...board];
      newBoard[index] = humanSymbol;
      const score = minimax(
        newBoard,
        depth + 1,
        true,
        computerSymbol,
        alpha,
        beta,
      );
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return minScore;
  }
};

/**
 * Finds the best move for the computer using optimized minimax algorithm
 * @param board - The current game board
 * @param computerSymbol - The symbol used by the computer
 * @returns The index of the best move
 */
export const findBestMove = (
  board: Board,
  computerSymbol: BoardSymbol,
): number => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);

  // If only one move available, return it immediately
  if (availableMoves.length === 1) return availableMoves[0];

  // If it's the first move, return center for better strategy
  if (availableMoves.length === 9) return 4;

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const index of availableMoves) {
    const newBoard = [...board];
    newBoard[index] = computerSymbol;
    const score = minimax(newBoard, 0, false, computerSymbol);

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
};
