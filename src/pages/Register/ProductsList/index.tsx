import React, { useCallback, useMemo, useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, Title, List, Footer } from './styles';
import { PopupText, PopupButton } from '../styles';
import ProductItem from './ProductItem';
import Button from '../../../components/Button';
import { useProducts } from '../../../hooks/products';
import { usePopup } from '../../../hooks/popup';
import { useModal } from '../../../hooks/modal';
import api from '../../../services/api';

const ProductsList: React.FC = () => {
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
      { products: productsData },
      { headers }
    );

    handleShowSendPopup();
  }, [products, handleShowSendPopup]);

  const formData = useMemo(() => {
    const data = Object.fromEntries(
      products.map(({ id, quantity }) => [[`quantity-${id}`], String(quantity)])
    );

    formRef.current?.setData(data);

    return data;
  }, [products]);

  return (
    <Container>
      <Form
        initialData={formData}
        ref={formRef}
        onSubmit={() => null}
        style={{ height: '100%' }}
      >
        <Title>Produtos</Title>

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
