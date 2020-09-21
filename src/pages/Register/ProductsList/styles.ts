import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { IProduct } from '..';

export const Container = styled.View``;

export const Title = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 26px;
  text-align: center;
`;

export const List = styled(FlatList as new () => FlatList<IProduct>)`
  padding: 32px 24px 16px;
  width: 100%;
`;

export const Footer = styled.View`
  min-height: ${60 + getBottomSpace()}px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;
