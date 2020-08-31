import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Backdrop = styled.TouchableOpacity`
  width: ${width}px;
  height: ${height}px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);

  justify-content: center;
  align-items: center;
`;

export const Container = styled(Animated.View)`
  height: 150px;
  width: 300px;
  padding: 30px 0;
  background: #fff;
  border-radius: 24px;
  z-index: 10;

  justify-content: space-between;
  align-items: center;
`;
