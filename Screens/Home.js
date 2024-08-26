import { useNavigation ,useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window');

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
    }, [])
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.hcontainer}>
      <StatusBar />
      <View style={styles.h1container}>
        <View style={styles.hview1}>
          {/* Add any content you need here */}
        </View>
        <View style={styles.hview2}>
          <View style={styles.header}>
            <Text style={styles.htext}>Let's Get</Text>
            <Text style={styles.htext}>Started</Text>
          </View>
          <View style={{ paddingTop: height * 0.02 }}>
            <Text style={styles.text}>
              Your complaints help us build 
            </Text>
            <Text style={styles.text}>
              a better and safer community.
            </Text>
          </View>
          <View style={styles.btnview}>
            <TouchableOpacity onPress={openModal}>
              <Text style={styles.btntext}>Complaint</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal for Popup */}
      <Modal
        animationType="zoomIn"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal} 
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:width*0.03}}>
            <Text style={styles.modalText}>Register your complaint</Text>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign name='close' size={20} style={styles.close}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('scanner')}>
                        <Text style={styles.pbtn}>Scan QR</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('page1')}>
                        <Text style={styles.pbtn}>Manual</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  hcontainer: {
    flex: 1,
  },
  h1container: {
    flex: 1,
    backgroundColor: '#E03546',
  },
  hview1: {
    height: height * 0.55,
  },
  hview2: {
    height: height * 0.45,
    paddingHorizontal: width * 0.04,
  },
  htext: {
    fontSize: width * 0.11,
    fontWeight: '600',
    color: 'white',
    lineHeight: width * 0.13,
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: width * 0.035,
    lineHeight: width * 0.05,
  },
  btntext: {
    textAlign: 'center',
    backgroundColor: 'white',
    paddingVertical: height * 0.013,
    fontWeight: '700',
    fontSize: width * 0.05,
    borderRadius: 10,
    color: '#E03546',
  },
  btnview: {
    paddingTop: height * 0.1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    
  },
  modalContent: {
    width: width * 0.8,
     paddingHorizontal: 20,
    paddingTop:15,
    paddingBottom:25,
    backgroundColor: 'ghostwhite',
    borderRadius: 5,
    // alignItems: 'center',
    borderTopWidth: 10, 
    borderTopColor: '#E03546', 
  },
  modalText: {
    fontSize: width*0.04,
    fontWeight: '600',
    marginBottom: 20,
  },
  close: {
    paddingTop:4,
    color: 'black',
    paddingLeft:width*0.13
  },
  pbtn:{
    fontSize:width*0.038,
    paddingHorizontal:width*0.05,
    paddingVertical:width*0.02,
    backgroundColor:'#E03546',
    color:'white',
    fontWeight:'500',
    borderRadius:5
  }
});
