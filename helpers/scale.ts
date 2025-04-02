import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard screen mobile device
const guidelineBaseWidth = 420;
const guidelineBaseHeight = 840;

const scaleVertical = (size: number) => (height / guidelineBaseHeight) * size;
const scaleHorizontal = (size: number) => (width / guidelineBaseWidth) * size;
const scaleModerate = (size: number, factor: number = 0.5) =>
  size + (scaleHorizontal(size) - size) * factor;

export { height, scaleHorizontal, scaleModerate, scaleVertical, width };
