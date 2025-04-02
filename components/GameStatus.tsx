import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { scaleHorizontal, scaleVertical } from '@/helpers/scale';
import { useTheme } from '@/hooks/useTheme';
import { BoardSymbol } from '@/libs/game';
import { useGameStore } from '@/store/gameStore';

export default function GameStatus() {
  const { theme } = useTheme();
  const { currentPlayer, gameStatus, winner, computerSymbol } = useGameStore();

  const getStatusText = () => {
    if (gameStatus === 'won') {
      return winner === 'Computer' ? 'You Lost!' : 'You Won!';
    }
    if (gameStatus === 'draw') {
      return "It's a draw!";
    }
    if (!currentPlayer) {
      return 'No player selected';
    }
    if (currentPlayer === 'Computer') {
      return 'Computer is thinking...';
    }
    return `${currentPlayer}'s turn`;
  };

  const getPlayerSymbol = (player: string | null): BoardSymbol => {
    if (player === 'Computer') return computerSymbol;
    return computerSymbol === 'X' ? 'O' : 'X';
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundSecondary },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color:
              winner === 'Computer'
                ? theme.colors.backgroundDestructive
                : theme.colors.mutedForeground,
          },
        ]}
      >
        {getStatusText()}
      </Text>
      {currentPlayer && gameStatus === 'playing' && (
        <Ionicons
          name={
            getPlayerSymbol(currentPlayer) === 'X' ? 'close' : 'ellipse-outline'
          }
          size={30}
          color={
            getPlayerSymbol(currentPlayer) === 'X'
              ? theme.colors.primary
              : theme.colors.backgroundDestructive
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleHorizontal(220),
    height: scaleVertical(40),
    columnGap: scaleHorizontal(10),
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: scaleHorizontal(10),
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
