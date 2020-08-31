import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react';

import Modal from '../components/Modal';

interface ModalContextData {
  show: boolean;
  showModal(content: ReactNode): void;
  closeModal(): void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(null);

  const showModal = useCallback(modalContent => {
    setShow(true);
    setContent(modalContent);
  }, []);

  const closeModal = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <ModalContext.Provider value={{ show, showModal, closeModal }}>
      {show ? (
        <>
          {children}
          <Modal onClose={closeModal}>{content}</Modal>
        </>
      ) : (
        children
      )}
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within an AuthProvider');
  }

  return context;
}

export { ModalProvider, useModal };
