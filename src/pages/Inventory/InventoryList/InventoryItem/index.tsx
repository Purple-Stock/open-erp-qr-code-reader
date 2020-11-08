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
import { useInventory } from '../../../../hooks/inventory';

interface IInventoryItem {
  data: IProduct;
  last: boolean;
}

const InventoryItem: React.FC<IInventoryItem> = ({
  data: inventoryData,
  last,
}) => {
  const { id, name, quantity } = inventoryData;

  const { inventory, updateInventory } = useInventory();

  const updateProductsQuantity = useCallback(
    (updatedQuantity: number) => {
      const transformedQuantity =
        Number.isNaN(updatedQuantity) || updatedQuantity < 0
          ? 0
          : updatedQuantity;

      return inventory.map(inventoryItem => {
        if (inventoryItem.id === id) {
          return {
            ...inventoryItem,
            quantity: transformedQuantity,
          };
        }

        return { ...inventoryItem };
      });
    },
    [id, inventory]
  );

  const updateQuantity = useCallback(
    (updatedQuantity: number) => {
      const updatedInventory = updateProductsQuantity(updatedQuantity);

      updateInventory(updatedInventory);
    },
    [updateInventory, updateProductsQuantity]
  );

  const decrementQuantity = useCallback(() => {
    if (quantity >= 1) {
      const updatedQuantity = quantity - 1;

      updateQuantity(updatedQuantity);
    }
  }, [quantity, updateQuantity]);

  const incrementQuantity = useCallback(() => {
    const updatedQuantity = quantity + 1;

    updateQuantity(updatedQuantity);
  }, [quantity, updateQuantity]);

  const deleteItem = useCallback(() => {
    const updatedInventory = inventory.filter(
      inventoryItem => inventoryItem.id !== id
    );

    updateInventory(updatedInventory);
  }, [id, inventory, updateInventory]);

  const handleNegativeNumbers = useCallback(
    (value: string) => {
      const numberValue = Number(value);

      if (Number.isNaN(numberValue) || numberValue < 0) {
        return updateQuantity(1);
      }

      return value;
    },
    [updateQuantity]
  );

  return (
    <Container last={last}>
      <Name>Nome: {name}</Name>

      <Quantity>
        <QuantityLabel>Quantidade: </QuantityLabel>
        <QuantityIcon name="minus" size={18} onPress={decrementQuantity} />
        <Input
          name={`quantity-${id}`}
          keyboardType="number-pad"
          onChangeText={handleNegativeNumbers}
          onEndEditing={event => updateQuantity(Number(event.nativeEvent.text))}
        />
        <QuantityIcon name="plus" size={18} onPress={incrementQuantity} />
      </Quantity>

      <TrashIcon name="trash" color="#ff7979" size={18} onPress={deleteItem} />
    </Container>
  );
};

export default InventoryItem;
