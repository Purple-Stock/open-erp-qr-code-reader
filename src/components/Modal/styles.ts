import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Backdrop = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.6);
  width: ${width}px;
  height: ${height}px;
  position: absolute;
  bottom: 0;
`;

export const Container = styled(Animated.View)`
  height: 85%;
  width: 100%;
  background: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 30px 20px 0;
  position: absolute;
  bottom: 0;

  justify-content: space-between;
  align-items: center;
`;
