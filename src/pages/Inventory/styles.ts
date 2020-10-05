import styled from 'styled-components/native';

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
