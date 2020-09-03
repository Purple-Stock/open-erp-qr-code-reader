import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QrReader from 'react-qr-reader';

import Button from '../../components/Button';
import api from '../../services/api';
import { useModal } from '../../hooks/modal';
import { usePopup } from '../../hooks/popup';
import {
  Container,
  CameraBox,
  CornerTopLeft,
  CornerTopRight,
  CornerBottomLeft,
  CornerBottomRight,
  PopupText,
  PopupButton,
  ModalTitle,
  ProductsList,
  ProductContainer,
  ProductName,
  ProductQuantity,
  ModalFooter,
} from './styles';

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
}

interface IScannedProduct {
  id: string;
  name: string;
}

const Register: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannerReady, setScannerReady] = useState(true);

  const [products, setProducts] = useState<IProduct[]>([]);

  const { showModal, closeModal } = useModal();
  const { showPopup, closePopup, closeCallback } = usePopup();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        setHasPermission(true);
        return;
      }
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const delay = useCallback(time => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), time);
    });
  }, []);

  const handleCloseAddPopup = useCallback(async () => {
    await delay(500);

    setScannerReady(true);
  }, [delay]);
  const handleShowAddPopup = useCallback(() => {
    closeCallback(handleCloseAddPopup);
    showPopup(
      <>
        <PopupText>Produto Adicionado!</PopupText>

        <Button onPress={closePopup} icon="check-circle">
          <PopupButton>Ok</PopupButton>
        </Button>
      </>
    );
  }, [handleCloseAddPopup, showPopup, closePopup, closeCallback]);

  const handleCloseSendPopup = useCallback(() => {
    closePopup();
    closeModal();
    setProducts([]);
  }, [closeModal, closePopup]);
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

  const findProduct = useCallback(
    (scannedProduct: IScannedProduct) => {
      return products.find(product => product.id === scannedProduct.id);
    },
    [products]
  );

  const transformProducts = useCallback(
    (scannedProduct: IScannedProduct) => {
      return [
        ...products.map(product =>
          product.id === scannedProduct.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      ];
    },
    [products]
  );

  const addProduct = useCallback(
    (scannedProduct: IScannedProduct) => {
      const productExists = findProduct(scannedProduct);

      if (productExists) {
        const transformedProducts = transformProducts(scannedProduct);
        setProducts(transformedProducts);
      } else {
        setProducts(state => [...state, { ...scannedProduct, quantity: 1 }]);
      }
    },
    [findProduct, transformProducts]
  );

  const handleScan = useCallback(
    data => {
      const product = JSON.parse(data);

      addProduct(product);
      handleShowAddPopup();
      setScannerReady(false);
    },
    [addProduct, handleShowAddPopup]
  );

  const handleScanWeb = useCallback(
    data => {
      if (data) {
        handleScan(data);
      }
    },
    [handleScan]
  );

  const handleScanMobile = useCallback(
    scan => {
      const { data } = scan;
      handleScan(data);
    },
    [handleScan]
  );

  const handleError = useCallback(err => {
    console.error(err);
  }, []);

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

  const handleOpenModal = useCallback(() => {
    showModal(
      <>
        <ModalTitle>Produtos</ModalTitle>

        <ProductsList
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item: product, index }) => (
            <ProductContainer last={index === products.length - 1}>
              <ProductName>Nome: {product.name}</ProductName>
              <ProductQuantity>Quantidade: {product.quantity}</ProductQuantity>
            </ProductContainer>
          )}
        />

        <ModalFooter>
          <Button containerStyle={{ width: 120 }} onPress={handleSendProducts}>
            Enviar
          </Button>
        </ModalFooter>
      </>
    );
  }, [handleSendProducts, products, showModal]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <LinearGradient
        colors={['#E0EAFC', '#CFDEF3']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />

      <CameraBox>
        {Platform.OS === 'web' ? (
          <QrReader
            delay={500}
            showViewFinder={false}
            onScan={handleScanWeb}
            onError={handleError}
          />
        ) : (
          <Camera
            style={{ flex: 1 }}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={scannerReady ? handleScanMobile : undefined}
          />
        )}
        <CornerTopLeft />
        <CornerTopRight />
        <CornerBottomLeft />
        <CornerBottomRight />
      </CameraBox>

      <Button isDisabled={!products.length} onPress={handleOpenModal}>
        Ver produtos ({products.length})
      </Button>
    </Container>
  );
};

export default Register;
