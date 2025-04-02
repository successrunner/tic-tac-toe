import { create } from 'zustand';

import {
  Board,
  BoardSymbol,
  calculateWinner,
  findBestMove,
  GameStatus,
  initialBoard,
  isBoardFull,
  Player,
} from '@/libs/game';

// Interfaces
interface GameState {
  board: Board;
  currentPlayer: Player | null;
  firstPlayer: Player | null;
  computerSymbol: BoardSymbol;
  gameStatus: GameStatus;
  winner: Player | null;
  moves: number;
  resetGame: () => void;
  makeMove: (index: number) => void;
  setFirstPlayer: (player: Player) => void;
}

export const useGameStore = create<GameState>((set) => ({
  board: initialBoard,
  currentPlayer: null,
  firstPlayer: null,
  computerSymbol: 'X',
  gameStatus: 'not_started',
  winner: null,
  moves: 0,

  resetGame: () =>
    set({
      board: initialBoard,
      currentPlayer: null,
      firstPlayer: null,
      computerSymbol: 'X',
      gameStatus: 'not_started',
      winner: null,
      moves: 0,
    }),

  setFirstPlayer: (player: Player) =>
    set((state) => {
      let computerSymbol: BoardSymbol;
      if (player === 'Computer') {
        computerSymbol = 'X';
      } else {
        computerSymbol = 'O';
      }

      const newState = {
        ...state,
        currentPlayer: player,
        firstPlayer: player,
        gameStatus: 'playing' as GameStatus,
        computerSymbol,
      };

      if (player === 'Computer') {
        const computerMove = findBestMove([...initialBoard], 'X');
        const newBoard = [...initialBoard];
        newBoard[computerMove] = 'X';
        return { ...newState, board: newBoard, currentPlayer: 'User' };
      }

      return newState;
    }),

  makeMove: (index: number) =>
    set((state) => {
      if (state.gameStatus !== 'playing' || state.board[index] !== null) {
        return state;
      }

      const newBoard = [...state.board];
      let userSymbol: BoardSymbol;
      if (state.computerSymbol === 'X') {
        userSymbol = 'O';
      } else {
        userSymbol = 'X';
      }
      newBoard[index] = userSymbol;

      const winner = calculateWinner(newBoard);
      const isFull = isBoardFull(newBoard);

      if (winner || isFull) {
        let gameWinner: Player | null = null;
        if (winner) {
          if (winner === state.computerSymbol) {
            gameWinner = 'Computer';
          } else {
            gameWinner = 'User';
          }
        }

        return {
          board: newBoard,
          currentPlayer: 'Computer',
          gameStatus: winner ? 'won' : 'draw',
          winner: gameWinner,
          moves: state.moves + 1,
        };
      }

      const computerMove = findBestMove([...newBoard], state.computerSymbol);
      newBoard[computerMove] = state.computerSymbol;

      const computerWinner = calculateWinner(newBoard);
      const computerIsFull = isBoardFull(newBoard);

      let gameStatus: GameStatus;
      if (computerWinner) {
        gameStatus = 'won';
      } else if (computerIsFull) {
        gameStatus = 'draw';
      } else {
        gameStatus = 'playing';
      }

      let gameWinner: Player | null = null;
      if (computerWinner) {
        gameWinner = 'Computer';
      }

      return {
        board: newBoard,
        currentPlayer: 'User',
        gameStatus,
        winner: gameWinner,
        moves: state.moves + 2,
      };
    }),
}));
