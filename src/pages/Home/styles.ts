import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Header = styled.View`
  height: ${200 + getStatusBarHeight()}px;
  padding: 30px 20px;
  padding-top: ${30 + getStatusBarHeight()}px;
  background: #f7b731;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

export const UserInfo = styled.View`
  margin-bottom: 50px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserHello = styled.Text`
  color: #fff;
  font-size: 19px;
  font-family: 'Roboto-Medium';
`;

export const UserImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const OptionsList = styled.View`
  width: 320px;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Option = styled.TouchableOpacity`
  height: 150px;
  width: 150px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;

  justify-content: center;
  align-items: center;
`;

export const OptionLabel = styled.Text`
  margin-top: 15px;
  color: #2d3436;
`;
