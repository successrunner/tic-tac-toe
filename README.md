# Tic Tac Toe - React Native

A modern, interactive Tic Tac Toe game built with React Native and Expo. This project showcases the implementation of a classic game with a beautiful user interface, smooth animations, and engaging gameplay features.

## 🎮 Features

- Clean and modern UI design
- Smooth animations and transitions
- Haptic feedback for better user experience
- Game state management using Zustand
- TypeScript for type safety
- Comprehensive test coverage
- Cross-platform support (iOS, Android, and Web)

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Styling**: React Native StyleSheet
- **Testing**: Jest & React Native Testing Library
- **Type Checking**: TypeScript
- **Code Quality**: ESLint & Prettier

## 📱 Supported Platforms

- iOS
- Android
- Web

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

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tic-tac-toe.git
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
npm start
# or
yarn start
```

4. Run on your preferred platform:
```bash
# For iOS
npm run ios

# For Android
npm run android

# For Web
npm run web
```

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 📝 Code Quality

The project uses ESLint and Prettier for code quality and formatting. Run the following commands:

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🏗️ Project Structure

```
tic-tac-toe/
├── app/                    # Main application screens
├── components/            # Reusable UI components
├── constants/             # App-wide constants
├── hooks/                 # Custom React hooks
├── libs/                  # Utility libraries
├── store/                 # Zustand store
├── assets/               # Static assets
└── __tests__/            # Test files
```

## Contributing

Feel free to submit issues and enhancement requests!
