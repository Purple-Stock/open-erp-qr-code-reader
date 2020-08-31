import React from 'react';

import { ModalProvider } from './modal';
import { PopupProvider } from './popup';

const AppProvider: React.FC = ({ children }) => (
  <PopupProvider>
    <ModalProvider>{children}</ModalProvider>
  </PopupProvider>
);

export default AppProvider;
