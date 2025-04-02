import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { scaleHorizontal, scaleVertical } from '@/helpers/scale';
import { useTheme } from '@/hooks/useTheme';
import { useGameStore } from '@/store/gameStore';

export default function GameController() {
  const { theme } = useTheme();
  const { gameStatus, setFirstPlayer, firstPlayer } = useGameStore();

  const isGameStarted =
    gameStatus === 'playing' || gameStatus === 'won' || gameStatus === 'draw';

  const renderPlayerButton = (player: 'User' | 'Computer') => {
    const isActive = firstPlayer === player;

    return (
      <TouchableOpacity
        style={[
          styles.playerButton,
          {
            backgroundColor: isActive
              ? theme.colors.primary
              : theme.colors.card,
            borderColor: theme.colors.primary,
            opacity: isGameStarted ? 0.5 : 1,
          },
        ]}
        onPress={() => setFirstPlayer(player)}
        disabled={isGameStarted}
      >
        <Ionicons
          name={player === 'User' ? 'person' : 'desktop'}
          size={24}
          color={
            isActive ? theme.colors.primaryForeground : theme.colors.primary
          }
        />
        <Text
          style={[
            styles.playerButtonText,
            {
              color: isActive
                ? theme.colors.primaryForeground
                : theme.colors.primary,
            },
          ]}
        >
          {player}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          shadowColor: theme.colors.shadow,
          backgroundColor: theme.colors.card,
        },
      ]}
    >
      <View style={styles.playerSelectionContainer}>
        <Text style={[styles.headline, { color: theme.colors.text }]}>
          Select Who Goes First
        </Text>
        <View style={styles.buttonContainer}>
          {renderPlayerButton('User')}
          {renderPlayerButton('Computer')}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container styles
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleHorizontal(15),
    paddingVertical: scaleVertical(15),
    rowGap: scaleVertical(20),
    // Shadow styles
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Border styles
    borderRadius: 20,
  },

  // Layout containers
  playerSelectionContainer: {
    alignItems: 'center',
    gap: scaleVertical(15),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: scaleHorizontal(20),
  },

  // Button styles
  playerButton: {
    width: scaleHorizontal(100),
    height: scaleVertical(60),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaleVertical(5),
    // Border styles
    borderRadius: 15,
    borderWidth: 2,
  },

  // Typography styles
  headline: {
    fontSize: scaleVertical(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
