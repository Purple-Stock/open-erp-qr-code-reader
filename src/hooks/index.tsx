import React from 'react';

import { ModalProvider } from './modal';
import { PopupProvider } from './popup';
import { ProductsProvider } from './products';

const AppProvider: React.FC = ({ children }) => (
  <ProductsProvider>
    <PopupProvider>
      <ModalProvider>{children}</ModalProvider>
    </PopupProvider>
  </ProductsProvider>
);

export default AppProvider;
