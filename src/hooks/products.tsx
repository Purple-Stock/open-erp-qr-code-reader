import React, { createContext, useCallback, useContext, useState } from 'react';

interface IProduct {
  id: string;
  name: string;
  quantity: number;
}

interface ProductsState {
  products: IProduct;
}

interface ProductsContextData {
  products: IProduct[];
  updateProducts(products: IProduct[]): void;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([
    { id: 'asdghdga', name: 'Tetas', quantity: 3 },
    { id: 'fgfgddfg', name: 'Tetas', quantity: 3 },
    { id: 'dasdasasd', name: 'Tetas', quantity: 3 },
    { id: 'sfgfgddf', name: 'Tetas', quantity: 3 },
    { id: 'gfgffgfg', name: 'Tetas', quantity: 3 },
    { id: 'sdfgsdfsdf', name: 'Tetas', quantity: 3 },
    { id: 'gffgfgfgfg', name: 'Tetas', quantity: 3 },
    { id: 'gffgfffff', name: 'Tetas', quantity: 3 },
  ]);

  const updateProducts = useCallback((productsData: IProduct[]) => {
    setProducts(productsData);
  }, []);

  return (
    <ProductsContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

function useProducts(): ProductsContextData {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within an ProductsProvider');
  }

  return context;
}

export { ProductsProvider, useProducts };
