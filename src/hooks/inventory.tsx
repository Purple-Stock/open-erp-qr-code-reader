import React, { createContext, useCallback, useContext, useState } from 'react';

interface IProduct {
  id: string;
  name: string;
  quantity: number;
}

interface InventoryContextData {
  inventory: IProduct[];
  updateInventory(inventory: IProduct[]): void;
}

const InventoryContext = createContext<InventoryContextData>(
  {} as InventoryContextData
);

const InventoryProvider: React.FC = ({ children }) => {
  const [inventory, setInventory] = useState<IProduct[]>([]);

  const updateInventory = useCallback((inventoryData: IProduct[]) => {
    setInventory(inventoryData);
  }, []);

  return (
    <InventoryContext.Provider value={{ inventory, updateInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

function useInventory(): InventoryContextData {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }

  return context;
}

export { InventoryProvider, useInventory };
