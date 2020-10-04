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
import ProductItem from './ProductItem';
import Button from '../../../components/Button';
import { useProducts } from '../../../hooks/products';
import { usePopup } from '../../../hooks/popup';
import { useModal } from '../../../hooks/modal';
import api from '../../../services/api';

interface IStore {
  name: string;
  value: number;
}

const ProductsList: React.FC = () => {
  const [stores] = useState<IStore[]>([
    { name: 'Purchase Store RS', value: 1 },
    { name: 'Purchase Store SP', value: 2 },
  ]);
  const [selectedStore, setSelectedStore] = useState<IStore>(stores[1]);
  const [showSelect, setShowSelect] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { products, updateProducts } = useProducts();
  const { closeCallback, closePopup, showPopup } = usePopup();
  const { closeModal } = useModal();

  const handleCloseSendPopup = useCallback(() => {
    closePopup();
    closeModal();
    updateProducts([]);
  }, [closeModal, closePopup, updateProducts]);

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

  const handleSendProducts = useCallback(async () => {
    const headers = { 'Content-Type': 'application/json' };
    const productsData = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
    }));

    await api.post(
      'purchase_products/add_products',
      { store_entrance: selectedStore.value, products: productsData },
      { headers }
    );

    handleShowSendPopup();
  }, [products, selectedStore.value, handleShowSendPopup]);

  const formData = useMemo(() => {
    const data = Object.fromEntries(
      products.map(({ id, quantity }) => [[`quantity-${id}`], String(quantity)])
    );

    formRef.current?.setData(data);

    return data;
  }, [products]);

  const handleStoreChange = useCallback(
    value => {
      const storeItem = stores.find(store => store.value === value);

      if (storeItem) {
        setSelectedStore(storeItem);
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
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item: product, index }) => (
            <ProductItem data={product} last={index === products.length - 1} />
          )}
        />

        <Footer>
          <Button containerStyle={{ width: 120 }} onPress={handleSendProducts}>
            Enviar
          </Button>
        </Footer>
      </Form>
    </Container>
  );
};

export default ProductsList;
