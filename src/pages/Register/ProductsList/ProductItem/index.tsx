import React, { useCallback } from 'react';

import {
  Container,
  Name,
  Quantity,
  QuantityIcon,
  QuantityLabel,
  TrashIcon,
} from './styles';
import Input from '../../../../components/Input';
import { IProduct } from '../..';
import { useProducts } from '../../../../hooks/products';

interface IProductItem {
  data: IProduct;
  last: boolean;
}

const ProductItem: React.FC<IProductItem> = ({ data: productData, last }) => {
  const { id, name, quantity } = productData;

  const { products, updateProducts } = useProducts();

  const updateProductsQuantity = useCallback(
    (updatedQuantity: number) => {
      return products.map(product => {
        if (product.id === id) {
          return { ...product, quantity: updatedQuantity };
        }

        return { ...product };
      });
    },
    [id, products]
  );

  const updateQuantity = useCallback(
    (updatedQuantity: number) => {
      const updatedProducts = updateProductsQuantity(updatedQuantity);

      updateProducts(updatedProducts);
    },
    [updateProducts, updateProductsQuantity]
  );

  const decrementQuantity = useCallback(() => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;

      updateQuantity(updatedQuantity);
    }
  }, [quantity, updateQuantity]);

  const incrementQuantity = useCallback(() => {
    const updatedQuantity = quantity + 1;

    updateQuantity(updatedQuantity);
  }, [quantity, updateQuantity]);

  const deleteItem = useCallback(() => {
    const updatedProducts = products.filter(product => product.id !== id);

    updateProducts(updatedProducts);
  }, [id, products, updateProducts]);

  return (
    <Container last={last}>
      <Name>Nome: {name}</Name>

      <Quantity>
        <QuantityLabel>Quantidade: </QuantityLabel>
        <QuantityIcon name="minus" size={18} onPress={decrementQuantity} />
        <Input
          name={`quantity-${id}`}
          keyboardType="number-pad"
          onChangeText={value => updateQuantity(Number(value))}
        />
        <QuantityIcon name="plus" size={18} onPress={incrementQuantity} />
      </Quantity>

      <TrashIcon name="trash" color="#ff7979" size={18} onPress={deleteItem} />
    </Container>
  );
};

export default ProductItem;
