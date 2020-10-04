import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QrReader from 'react-qr-reader';
import { useBackHandler } from '@react-native-community/hooks';

import ProductsList from './ProductsList';
import Button from '../../components/Button';
import { useModal } from '../../hooks/modal';
import { usePopup } from '../../hooks/popup';
import { useProducts } from '../../hooks/products';
import {
  Container,
  CameraBox,
  CornerTopLeft,
  CornerTopRight,
  CornerBottomLeft,
  CornerBottomRight,
  PopupText,
  PopupButton,
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

  const { products, updateProducts } = useProducts();
  const { showModal, closeModal, show: isModalVisible } = useModal();
  const { showPopup, closePopup, closeCallback } = usePopup();

  useBackHandler(() => {
    if (isModalVisible) {
      closeModal();
      return true;
    }

    return false;
  });

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

  useEffect(() => {
    if (!isModalVisible) {
      setScannerReady(true);
    }
  }, [isModalVisible]);

  const delay = useCallback((time: number) => {
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

  const findProduct = useCallback(
    (productId: string) => {
      return products.find(product => product.id === productId);
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
      const productExists = findProduct(scannedProduct.id);

      if (productExists) {
        const transformedProducts = transformProducts(scannedProduct);
        updateProducts(transformedProducts);
      } else {
        const updatedProducts = [
          ...products,
          { ...scannedProduct, quantity: 1 },
        ];
        updateProducts(updatedProducts);
      }
    },
    [findProduct, products, updateProducts, transformProducts]
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

  const handleOpenModal = useCallback(() => {
    showModal(<ProductsList />);
    setScannerReady(false);
  }, [showModal]);

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
