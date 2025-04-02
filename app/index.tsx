import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { scaleHorizontal, scaleVertical } from '@/helpers/scale';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  const handleStartGame = () => {
    router.push({
      pathname: '/game',
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        isLandscape && styles.containerLandscape,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.themeButton,
          { backgroundColor: theme.colors.card },
          isLandscape && styles.themeButtonLandscape,
        ]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={isDark ? 'sunny' : 'moon'}
          size={24}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textSecondary }]}>
          TIC TAC TOE
        </Text>
      </View>

      <View style={[styles.content, { width: width * 0.9 }]}>
        <BlurView intensity={20} style={styles.blurContainer}>
          <View
            style={[
              styles.card,
              {
                shadowColor: theme.colors.shadow,
                backgroundColor: theme.colors.card,
              },
            ]}
          >
            <Ionicons
              name="game-controller"
              size={60}
              color={theme.colors.primary}
            />

            <Text style={[styles.description, { color: theme.colors.text }]}>
              Test your skills against the ultimate Tic Tac Toe AI. Can you
              force a draw or find a way to win?
            </Text>

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text
                  style={[
                    styles.featureText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Choose who goes first
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text
                  style={[
                    styles.featureText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Advanced AI opponent
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              activeOpacity={0.8}
              onPress={handleStartGame}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.primaryForeground },
                ]}
              >
                Start Playing
              </Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={theme.colors.primaryForeground}
              />
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: scaleVertical(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLandscape: {
    columnGap: scaleHorizontal(40),
    flexDirection: 'row',
  },
  header: {
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: scaleVertical(40),
    fontWeight: 'bold',
  },
  themeButton: {
    position: 'absolute',
    right: scaleHorizontal(20),
    top: scaleVertical(60),
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  themeButtonLandscape: {
    top: scaleVertical(40),
    left: scaleHorizontal(20),
  },
  content: {
    maxWidth: scaleHorizontal(420),
    alignItems: 'center',
    borderRadius: 20,
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  card: {
    rowGap: scaleVertical(20),
    elevation: 3,
    alignItems: 'center',
    borderRadius: 20,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    paddingVertical: scaleVertical(30),
    paddingHorizontal: scaleHorizontal(30),
  },
  description: {
    textAlign: 'center',
  },
  features: {
    rowGap: scaleVertical(12),
    alignSelf: 'stretch',
  },
  featureItem: {
    columnGap: scaleHorizontal(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  featureText: {
    fontWeight: 'semibold',
  },
  button: {
    columnGap: 10,
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
