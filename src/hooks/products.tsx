import React, { createContext, useCallback, useContext, useState } from 'react';

interface IProduct {
  id: string;
  name: string;
  quantity: number;
}

interface ProductsContextData {
  products: IProduct[];
  updateProducts(products: IProduct[]): void;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

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
