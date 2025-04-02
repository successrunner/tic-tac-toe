import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';

import { scaleHorizontal, scaleVertical } from '@/helpers/scale';
import { useTheme } from '@/hooks/useTheme';
import { useGameStore } from '@/store/gameStore';

const { width } = Dimensions.get('window');
const BOARD_SIZE = Math.min(width * 0.8, 320);
const CELL_SIZE = BOARD_SIZE / 3;

type CellProps = {
  cell: string | null;
  index: number;
  disabled: boolean;
  onPress: (index: number) => void;
};

const getCellColor = (cell: string | null, theme: any) => {
  if (cell === 'X') return theme.colors.primary;
  if (cell === 'O') return theme.colors.backgroundDestructive;
  return theme.colors.text;
};

const getBorderStyle = (index: number) => {
  const borderRightWidth = (index + 1) % 3 !== 0 ? 2 : 0;
  const borderBottomWidth = index < 6 ? 2 : 0;
  return { borderRightWidth, borderBottomWidth };
};

const Cell = ({ cell, index, disabled, onPress }: CellProps) => {
  const { theme } = useTheme();
  const cellColor = getCellColor(cell, theme);
  const borderStyle = getBorderStyle(index);

  return (
    <View
      style={[
        styles.cell,
        {
          ...borderStyle,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.cellButton,
          {
            backgroundColor: pressed ? theme.colors.muted : theme.colors.card,
          },
        ]}
        disabled={disabled}
        onPress={() => onPress(index)}
      >
        {cell && (
          <Ionicons
            name={cell === 'X' ? 'close' : 'ellipse-outline'}
            size={CELL_SIZE * 0.8}
            color={cellColor}
          />
        )}
      </Pressable>
    </View>
  );
};

export default function GameBoard() {
  const { theme } = useTheme();
  const { board, gameStatus, makeMove } = useGameStore();

  const handleCellPress = (index: number) => {
    if (gameStatus === 'playing' && board[index] === null) {
      makeMove(index);
    }
  };

  const isCellDisabled = (cell: string | null) => {
    return gameStatus !== 'playing' || cell !== null;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <View
        style={[
          styles.board,
          {
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.shadow,
          },
        ]}
      >
        {board.map((cell, index) => (
          <Cell
            key={index}
            cell={cell}
            index={index}
            disabled={isCellDisabled(cell)}
            onPress={handleCellPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingHorizontal: scaleHorizontal(15),
    paddingVertical: scaleVertical(15),
    borderRadius: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderRadius: 15,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  cellButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: CELL_SIZE * 0.6,
    fontWeight: 'bold',
  },
});
