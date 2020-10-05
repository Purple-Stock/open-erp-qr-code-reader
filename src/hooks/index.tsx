import React from 'react';

import { ModalProvider } from './modal';
import { PopupProvider } from './popup';
import { ProductsProvider } from './products';
import { InventoryProvider } from './inventory';

const AppProvider: React.FC = ({ children }) => (
  <InventoryProvider>
    <ProductsProvider>
      <PopupProvider>
        <ModalProvider>{children}</ModalProvider>
      </PopupProvider>
    </ProductsProvider>
  </InventoryProvider>
);

export default AppProvider;
