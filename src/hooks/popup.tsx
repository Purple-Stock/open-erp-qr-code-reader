import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

import Popup from '../components/Popup';

interface PopupContextData {
  show: boolean;
  showPopup(content: ReactNode): void;
  closeCallback(callback: Function): void;
  closePopup(): void;
}

const PopupContext = createContext<PopupContextData>({} as PopupContextData);

const PopupProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(null);

  const showPopup = useCallback(popupContent => {
    setShow(true);
    setContent(popupContent);
  }, []);

  const closeCallback = useCallback((callback?: Function) => {
    if (callback) {
      callback();
    }
  }, []);

  const closePopup = useCallback(() => {
    setShow(false);
    closeCallback();
  }, [closeCallback]);

  return (
    <PopupContext.Provider
      value={{ show, showPopup, closePopup, closeCallback }}
    >
      {show ? (
        <>
          {children}
          <Popup onClose={closePopup}>{content}</Popup>
        </>
      ) : (
        children
      )}
    </PopupContext.Provider>
  );
};

function usePopup(): PopupContextData {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error('usePopup must be used within an AuthProvider');
  }

  return context;
}

export { PopupProvider, usePopup };
