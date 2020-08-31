import React, { useCallback, useRef, useEffect } from 'react';
import {
  ModalProps,
  GestureResponderEvent,
  Animated,
  findNodeHandle,
} from 'react-native';

import { Backdrop, Container } from './styles';

interface IPopupProps extends ModalProps {
  onClose: () => void;
}

const Popup: React.FC<IPopupProps> = ({ children, onClose }) => {
  const backdropRef = useRef(null);
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [scaleAnimation]);

  const handleClose = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();

      const backdropNode = findNodeHandle(backdropRef.current);

      if (event.target !== backdropNode) {
        return;
      }

      onClose();
    },
    [onClose]
  );

  return (
    <Backdrop ref={backdropRef} activeOpacity={1} onPress={handleClose}>
      <Container
        style={{
          transform: [
            {
              scale: scaleAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        {children}
      </Container>
    </Backdrop>
  );
};

export default Popup;
