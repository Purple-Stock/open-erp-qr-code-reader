import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { IProduct } from '.';
import Input from '../../components/Input';

interface IProductContainerProps {
  last: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
`;

export const CameraBox = styled.View`
  height: 275px;
  width: 275px;
  position: relative;
`;

export const CornerTopLeft = styled.View`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -20px;
  left: -20px;
  border-top-width: 8px;
  border-top-color: #2d3436;
  border-left-width: 8px;
  border-left-color: #2d3436;
  border-top-left-radius: 20px;
`;

export const CornerTopRight = styled.View`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -20px;
  right: -20px;
  border-top-width: 8px;
  border-top-color: #2d3436;
  border-right-width: 8px;
  border-right-color: #2d3436;
  border-top-right-radius: 20px;
`;

export const CornerBottomLeft = styled.View`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: -20px;
  left: -20px;
  border-bottom-width: 8px;
  border-bottom-color: #2d3436;
  border-left-width: 8px;
  border-left-color: #2d3436;
  border-bottom-left-radius: 20px;
`;

export const CornerBottomRight = styled.View`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: -20px;
  right: -20px;
  border-bottom-width: 8px;
  border-bottom-color: #2d3436;
  border-right-width: 8px;
  border-right-color: #2d3436;
  border-bottom-right-radius: 20px;
`;

export const PopupText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 24px;
`;

export const PopupButton = styled.Text`
  font-size: 16px;
`;

export const ModalContent = styled.ScrollView``;

export const ModalTitle = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 26px;
  text-align: center;
`;

export const ProductsList = styled(FlatList as new () => FlatList<IProduct>)`
  padding: 32px 24px 16px;
  width: 100%;
`;

export const ProductContainer = styled.View<IProductContainerProps>`
  height: 100px;
  width: 100%;
  border-top-width: 1px;
  border-top-color: #dfe6e9;
  padding: 20px 0;

  border-bottom-width: ${props => (props.last ? '1px' : 0)};
  border-bottom-color: ${props => (props.last ? '#dfe6e9' : 'transparent')};

  justify-content: center;
`;

export const ProductName = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  line-height: 18px;
`;

export const ProductQuantity = styled.View`
  height: 30px;
  margin-top: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ProductQuantityLabel = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  line-height: 18px;
`;

export const ProductQuantityInput = styled(Input)``;

export const ModalFooter = styled.View`
  min-height: ${60 + getBottomSpace()}px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;
