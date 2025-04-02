import {
  Board,
  calculateWinner,
  findBestMove,
  initialBoard,
  isBoardFull,
} from '@/libs/game';

describe('Game Logic', () => {
  describe('calculateWinner', () => {
    it('should return null for empty board', () => {
      expect(calculateWinner(initialBoard)).toBeNull();
    });

    it('should return null for no winner', () => {
      const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      expect(calculateWinner(board)).toBeNull();
    });

    it('should detect horizontal wins', () => {
      const board: Board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      expect(calculateWinner(board)).toBe('X');
    });

    it('should detect vertical wins', () => {
      const board: Board = ['X', 'O', 'O', 'X', null, null, 'X', null, null];
      expect(calculateWinner(board)).toBe('X');
    });

    it('should detect diagonal wins', () => {
      const board: Board = ['X', 'O', 'O', 'O', 'X', null, null, null, 'X'];
      expect(calculateWinner(board)).toBe('X');
    });
  });

  describe('isBoardFull', () => {
    it('should return true for full board', () => {
      const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      expect(isBoardFull(board)).toBe(true);
    });

    it('should return false for empty board', () => {
      expect(isBoardFull(initialBoard)).toBe(false);
    });

    it('should return false for partially filled board', () => {
      const board: Board = ['X', 'O', 'X', 'O', null, 'O', 'O', 'X', 'O'];
      expect(isBoardFull(board)).toBe(false);
    });
  });

  describe('findBestMove', () => {
    it('should choose center on empty board', () => {
      expect(findBestMove(initialBoard, 'X')).toBe(4);
    });

    it('should block opponent from winning', () => {
      const board: Board = ['X', 'X', null, 'O', 'O', null, null, null, null];
      expect(findBestMove(board, 'O')).toBe(5);
    });

    it('should take winning move when available', () => {
      const board: Board = ['O', 'O', null, 'X', 'X', null, null, null, null];
      expect(findBestMove(board, 'O')).toBe(2);
    });

    it('should choose only available move', () => {
      const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
      expect(findBestMove(board, 'O')).toBe(8);
    });
  });
});
