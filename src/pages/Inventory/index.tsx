import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QrReader from 'react-qr-reader';
import { useBackHandler } from '@react-native-community/hooks';

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
import InventoryList from './InventoryList';
import Button from '../../components/Button';
import { useModal } from '../../hooks/modal';
import { usePopup } from '../../hooks/popup';
import { useInventory } from '../../hooks/inventory';

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
}

interface IScannedProduct {
  id: string;
  name: string;
}

const Inventory: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannerReady, setScannerReady] = useState(true);

  const { inventory, updateInventory } = useInventory();
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
      return inventory.find(inventoryItem => inventoryItem.id === productId);
    },
    [inventory]
  );

  const transformProducts = useCallback(
    (scannedProduct: IScannedProduct) => {
      return [
        ...inventory.map(inventoryItem =>
          inventoryItem.id === scannedProduct.id
            ? { ...inventoryItem, quantity: inventoryItem.quantity + 1 }
            : inventoryItem
        ),
      ];
    },
    [inventory]
  );

  const addProduct = useCallback(
    (scannedProduct: IScannedProduct) => {
      const productExists = findProduct(scannedProduct.id);

      if (productExists) {
        const transformedInventory = transformProducts(scannedProduct);
        updateInventory(transformedInventory);
      } else {
        const updatedInventory = [
          ...inventory,
          { ...scannedProduct, quantity: 1 },
        ];
        updateInventory(updatedInventory);
      }
    },
    [findProduct, inventory, updateInventory, transformProducts]
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
    showModal(<InventoryList />);
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

      <Button isDisabled={!inventory.length} onPress={handleOpenModal}>
        Ver produtos ({inventory.length})
      </Button>
    </Container>
  );
};

export default Inventory;
