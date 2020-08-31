import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, ButtonText } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  isDisabled?: boolean;
  containerStyle?: {};
}

const Button: React.FC<IButtonProps> = ({
  children,
  isDisabled = false,
  containerStyle = {},
  ...rest
}) => {
  return (
    <Container
      style={containerStyle}
      activeOpacity={0.5}
      disabled={isDisabled}
      isDisabled={isDisabled}
      {...rest}
    >
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
