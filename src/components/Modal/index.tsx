import React, { useRef, useCallback, useEffect } from 'react';
import {
  ModalProps,
  GestureResponderEvent,
  findNodeHandle,
  Animated,
  Dimensions,
} from 'react-native';

import { Container, Backdrop, Content } from './styles';

const { height } = Dimensions.get('window');

interface IModalProps extends ModalProps {
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, onClose }) => {
  const backdropRef = useRef(null);
  const translateAnimation = useRef(new Animated.Value(height)).current;

  const handleAnimation = useCallback(
    (value: number) => {
      Animated.timing(translateAnimation, {
        toValue: value,
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    [translateAnimation]
  );

  const handleClose = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();

      const backdropNode = findNodeHandle(backdropRef.current);

      if (event.target !== backdropNode) {
        return;
      }

      handleAnimation(height);

      setTimeout(() => {
        onClose();
      }, 500);
    },
    [handleAnimation, onClose]
  );

  useEffect(() => handleAnimation(0), [handleAnimation]);

  return (
    <Container>
      <Backdrop ref={backdropRef} activeOpacity={1} onPress={handleClose} />
      <Content
        style={{
          transform: [
            {
              translateY: translateAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        {children}
      </Content>
    </Container>
  );
};

export default Modal;
