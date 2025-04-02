# React Native Tic Tac Toe

A single-player Tic Tac Toe game built with React Native and Expo, featuring an unbeatable AI opponent using the minimax algorithm with alpha-beta pruning.

## Features

- 3x3 game grid
- Option to play first or let computer go first
- Unbeatable AI opponent using minimax algorithm with alpha-beta pruning
- Beautiful and responsive UI with theme support
- Game status display showing wins, losses, and draws
- Ability to start new games
- Fully responsive design that works on all screen sizes

## Technical Details

### Technologies Used

- React Native
- Expo
- TypeScript
- Zustand (State Management)
- React Native Paper (UI Components)

### AI Implementation

The game features an unbeatable AI opponent implemented using the minimax algorithm with alpha-beta pruning. Here's how it works:

1. **Minimax Algorithm**: The AI evaluates all possible game states recursively, assuming both players play optimally.
2. **Alpha-Beta Pruning**: Optimizes the minimax algorithm by cutting off branches that won't affect the final decision.
3. **Evaluation Function**:
   - Win: +10 (minus depth for faster wins)
   - Loss: -10 (plus depth for slower losses)
   - Draw: 0

### State Management

The game state is managed using Zustand, a lightweight state management solution. The store handles:

- Board state
- Current player
- Game status
- Winner tracking
- Computer-first option

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tic-tac-toe
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on your preferred platform:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

## How to Play

1. Choose whether you want to go first or let the computer go first
2. Click on any empty cell to make your move
3. The computer will automatically make its move
4. Continue until someone wins or the game is a draw
5. Click "Reset Game" to start a new game

## Project Structure

```
tic-tac-toe/
├── app/                    # App entry point
├── components/            # React components
│   ├── GameBoard.tsx     # Game board UI
│   ├── GameController.tsx # Game controls
│   ├── GameStatus.tsx    # Game status display
│   └── ThemeContext.tsx  # Theme provider
├── store/                # State management
│   └── gameStore.ts     # Game state and logic
├── helpers/             # Utility functions
│   └── scale.ts        # Responsive scaling
├── hooks/              # Custom hooks
│   └── useTheme.ts    # Theme hook
└── constants/         # App constants
```

## Contributing

Feel free to submit issues and enhancement requests!
