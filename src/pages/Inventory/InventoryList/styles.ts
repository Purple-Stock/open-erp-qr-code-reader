import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Picker } from '@react-native-community/picker';

import { IProduct } from '..';

export const Container = styled.View``;

export const TitleContainer = styled.View`
  margin: 0 24px;
`;

export const Title = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 26px;
`;

export const SelectTitle = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
`;

export const SelectText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  line-height: 22px;
`;

export const SelectedText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto';
  line-height: 22px;
  margin-left: 5px;
`;

export const Select = styled(Picker)`
  margin: 0 24px;
`;

export const SelectItem = styled(Picker.Item)``;

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
