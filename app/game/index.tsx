import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import GameBoard from '@/components/GameBoard';
import GameController from '@/components/GameController';
import GameStatus from '@/components/GameStatus';
import { scaleHorizontal, scaleVertical } from '@/helpers/scale';
import { useTheme } from '@/hooks/useTheme';
import { useGameStore } from '@/store/gameStore';

const ResetButton = ({ isLandscape }: { isLandscape: boolean }) => {
  const { theme } = useTheme();
  const { resetGame } = useGameStore();

  const buttonStyles = useMemo(
    () => [
      styles.resetButton,
      {
        shadowColor: theme.colors.shadowDestructive,
        backgroundColor: theme.colors.backgroundDestructive,
      },
      isLandscape && styles.resetButtonLandscape,
    ],
    [
      isLandscape,
      theme.colors.shadowDestructive,
      theme.colors.backgroundDestructive,
    ],
  );

  return (
    <TouchableOpacity style={buttonStyles} onPress={resetGame}>
      <Ionicons name="refresh" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default function Game() {
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();

  const isLandscape = useMemo(() => width > height, [width, height]);

  const containerStyles = useMemo(
    () => [styles.container, { backgroundColor: theme.colors.background }],
    [theme.colors.background],
  );

  const contentStyles = useMemo(
    () => [styles.content, isLandscape && styles.contentLandscape],
    [isLandscape],
  );

  return (
    <View style={containerStyles}>
      <ResetButton isLandscape={isLandscape} />
      <View style={contentStyles}>
        <View style={styles.gameControls}>
          <GameController />
          {isLandscape && <GameStatus />}
        </View>
        <GameBoard />
        {!isLandscape && <GameStatus />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    position: 'absolute',
    top: scaleVertical(60),
    right: scaleHorizontal(20),
    width: scaleHorizontal(50),
    height: scaleVertical(50),
    borderRadius: scaleHorizontal(25),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  resetButtonLandscape: {
    top: scaleVertical(40),
    left: scaleHorizontal(20),
    right: 'auto',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleHorizontal(20),
    gap: scaleVertical(40),
  },
  contentLandscape: {
    flexDirection: 'row',
    paddingHorizontal: scaleHorizontal(40),
    gap: scaleHorizontal(40),
  },
  gameControls: {
    alignItems: 'center',
    gap: scaleVertical(40),
  },
});
