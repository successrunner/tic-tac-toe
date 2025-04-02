import { initialBoard } from '@/libs/game';
import { useGameStore } from '@/store/gameStore';

describe('Game Store', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  describe('resetGame', () => {
    it('should reset the game state to initial values', () => {
      const state = useGameStore.getState();
      expect(state.board).toEqual(initialBoard);
      expect(state.currentPlayer).toBeNull();
      expect(state.firstPlayer).toBeNull();
      expect(state.computerSymbol).toBe('X');
      expect(state.gameStatus).toBe('not_started');
      expect(state.winner).toBeNull();
      expect(state.moves).toBe(0);
    });
  });

  describe('setFirstPlayer', () => {
    it('should set user as first player', () => {
      useGameStore.getState().setFirstPlayer('User');
      const state = useGameStore.getState();
      expect(state.currentPlayer).toBe('User');
      expect(state.firstPlayer).toBe('User');
      expect(state.computerSymbol).toBe('O');
      expect(state.gameStatus).toBe('playing');
    });

    it('should set computer as first player and make first move', () => {
      useGameStore.getState().setFirstPlayer('Computer');
      const state = useGameStore.getState();
      expect(state.currentPlayer).toBe('User');
      expect(state.firstPlayer).toBe('Computer');
      expect(state.computerSymbol).toBe('X');
      expect(state.gameStatus).toBe('playing');
      expect(state.board[4]).toBe('X'); // Computer should choose center
    });
  });

  describe('makeMove', () => {
    it('should not make move if game is not in playing state', () => {
      useGameStore.getState().makeMove(0);
      expect(useGameStore.getState().board).toEqual(initialBoard);
    });

    it('should not make move if cell is already filled', () => {
      useGameStore.getState().setFirstPlayer('User');
      useGameStore.getState().makeMove(0);
      const board = useGameStore.getState().board;
      useGameStore.getState().makeMove(0);
      expect(useGameStore.getState().board).toEqual(board);
    });

    it('should make user move and computer move', () => {
      useGameStore.getState().setFirstPlayer('User');
      useGameStore.getState().makeMove(0);
      const state = useGameStore.getState();
      expect(state.board[0]).toBe('X'); // User move
      expect(state.currentPlayer).toBe('User');
      expect(state.moves).toBe(2); // User move + Computer move
    });

    it('should detect user win', () => {
      useGameStore.getState().setFirstPlayer('User');
      // Set up winning position for user
      const board = [...initialBoard];
      board[0] = 'O';
      board[1] = 'O';
      board[2] = 'O';
      useGameStore.setState({ board, gameStatus: 'playing' });

      useGameStore.getState().makeMove(3);
      const state = useGameStore.getState();
      expect(state.gameStatus).toBe('won');
      expect(state.winner).toBe('Computer');
    });

    it('should detect draw', () => {
      useGameStore.getState().setFirstPlayer('User');
      // Set up draw position
      const board = [...initialBoard];
      board[0] = 'O';
      board[1] = null;
      board[2] = 'O';
      board[3] = 'O';
      board[4] = 'X';
      board[5] = 'X';
      board[6] = 'X';
      board[7] = 'O';
      board[8] = 'O';
      useGameStore.setState({ board, gameStatus: 'playing' });

      useGameStore.getState().makeMove(1);
      const state = useGameStore.getState();
      expect(state.gameStatus).toBe('draw');
      expect(state.winner).toBeNull();
    });
  });
});
