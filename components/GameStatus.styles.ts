import { StyleSheet } from 'react-native';

import { scaleHorizontal, scaleVertical } from '@/helpers/scale';

export const styles = StyleSheet.create({
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
