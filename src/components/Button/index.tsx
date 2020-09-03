import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, ButtonText, ButtonMargin, ButtonIcon } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  isDisabled?: boolean;
  containerStyle?: {};
  icon?: string;
}

const Button: React.FC<IButtonProps> = ({
  children,
  isDisabled = false,
  containerStyle = {},
  icon,
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
      {icon && (
        <>
          <ButtonMargin />
          <ButtonIcon name={icon} size={18} color="#2d3436" />
        </>
      )}
    </Container>
  );
};

export default Button;
