import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface IContainerProps {
  last: boolean;
}

export const Container = styled.View<IContainerProps>`
  height: 100px;
  width: 100%;
  border-top-width: 1px;
  border-top-color: #dfe6e9;
  padding: 20px 0;

  border-bottom-width: ${props => (props.last ? '1px' : 0)};
  border-bottom-color: ${props => (props.last ? '#dfe6e9' : 'transparent')};

  justify-content: center;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  line-height: 18px;
`;

export const Quantity = styled.View`
  height: 30px;
  margin-top: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const QuantityLabel = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  line-height: 18px;
`;

export const QuantityIcon = styled(Feather)`
  margin: 0 5px;
`;

export const TrashIcon = styled(Feather)`
  position: absolute;
  right: 5px;
`;
