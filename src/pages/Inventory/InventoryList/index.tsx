import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  TitleContainer,
  Title,
  SelectTitle,
  SelectText,
  SelectedText,
  Select,
  SelectItem,
  List,
  Footer,
} from './styles';
import { PopupText, PopupButton } from '../styles';
import InventoryItem from './InventoryItem';
import Button from '../../../components/Button';
import { useInventory } from '../../../hooks/inventory';
import { usePopup } from '../../../hooks/popup';
import { useModal } from '../../../hooks/modal';
import api from '../../../services/api';

interface IStore {
  name: string;
  value: number;
}

const InventoryList: React.FC = () => {
  const [stores] = useState<IStore[]>([
    { name: 'Purchase Store RS', value: 1 },
    { name: 'Purchase Store SP', value: 2 },
  ]);
  const [selectedStore, setSelectedStore] = useState<IStore>(stores[1]);
  const [showSelect, setShowSelect] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { inventory, updateInventory } = useInventory();
  const { closeCallback, closePopup, showPopup } = usePopup();
  const { closeModal } = useModal();

  const handleCloseSendPopup = useCallback(() => {
    closePopup();
    closeModal();
    updateInventory([]);
  }, [closeModal, closePopup, updateInventory]);

  const handleShowSendPopup = useCallback(() => {
    closeCallback(handleCloseSendPopup);
    showPopup(
      <>
        <PopupText>Enviado com sucesso!</PopupText>

        <Button onPress={closePopup} icon="check-circle">
          <PopupButton>Ok</PopupButton>
        </Button>
      </>
    );
  }, [handleCloseSendPopup, showPopup, closePopup, closeCallback]);

  const handleSendInventory = useCallback(async () => {
    const headers = { 'Content-Type': 'application/json' };
    const inventoryData = inventory.map(inventoryItem => ({
      product_id: inventoryItem.id,
      quantity: inventoryItem.quantity,
    }));

    await api.post(
      'purchase_products/add_inventory_quantity',
      { store_entrance: selectedStore.value, products: inventoryData },
      { headers }
    );

    handleShowSendPopup();
  }, [inventory, selectedStore.value, handleShowSendPopup]);

  const formData = useMemo(() => {
    const data = Object.fromEntries(
      inventory.map(({ id, quantity }) => [
        [`quantity-${id}`],
        String(quantity),
      ])
    );

    formRef.current?.setData(data);

    return data;
  }, [inventory]);

  const handleStoreChange = useCallback(
    value => {
      const storeItem = stores.find(store => store.value === value);

      if (storeItem) {
        setSelectedStore(storeItem);
        setShowSelect(false);
      }
    },
    [stores]
  );

  return (
    <Container>
      <Form
        initialData={formData}
        ref={formRef}
        onSubmit={() => null}
        style={{ height: '100%' }}
      >
        <TitleContainer>
          <Title>Produtos</Title>
          <SelectTitle>
            <SelectText>Loja: </SelectText>
            <SelectedText>{selectedStore.name}</SelectedText>
            <Feather
              name="edit"
              size={18}
              style={{ marginLeft: 20 }}
              onPress={() => setShowSelect(prev => !prev)}
            />
          </SelectTitle>
        </TitleContainer>

        {showSelect && (
          <Select
            selectedValue={selectedStore.value}
            onValueChange={handleStoreChange}
          >
            {stores.map(({ name, value }) => (
              <SelectItem key={value} label={name} value={value} />
            ))}
          </Select>
        )}

        <List
          data={inventory}
          keyExtractor={inventoryItem => String(inventoryItem.id)}
          renderItem={({ item: inventoryItem, index }) => (
            <InventoryItem
              data={inventoryItem}
              last={index === inventory.length - 1}
            />
          )}
        />

        <Footer>
          <Button containerStyle={{ width: 120 }} onPress={handleSendInventory}>
            Enviar
          </Button>
        </Footer>
      </Form>
    </Container>
  );
};

export default InventoryList;
