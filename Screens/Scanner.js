import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';


export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanning(false);
    // Navigate back to the previous screen with scanned data
    navigation.navigate('page1', { data });
  };

  const closeScanner = () => {
    setScanning(false);
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      <Modal
        transparent={true}
        visible={scanning}
        onRequestClose={closeScanner}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.scannerContainer}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeScanner}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  scannerContainer: {
    width: '90%', 
    height: '70%', 
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    bottom: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#264782',
    borderRadius: 20,
    
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
