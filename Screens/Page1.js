import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image , Button } from 'react-native'
import React, { useState, useEffect ,useRef } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Provider as PaperProvider, TextInput as PaperInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import { Audio } from 'expo-av';
import { RadioButton } from 'react-native-paper';
import { useNavigation , useRoute} from '@react-navigation/native';
import * as Location from 'expo-location';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Modalize } from 'react-native-modalize';
const { width, height } = Dimensions.get('window')

export default function Page1() {
    const navigation = useNavigation();
    const route = useRoute();
    const [shopname, setShopname] = useState();
    const [complaintdetails, setComplaintdetails] = useState();
    const [recording, setRecording] = useState(null);
    const [recordedURI, setRecordedURI] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [complaintType, setComplaintType] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const [location, setLocation] = useState(null);
    const [district, setDistrict] = useState('');
    const [mandal, setMandal] = useState('');
    const [village, setVillage] = useState('');
    const [pincode, setPincode] = useState('');
    const [imageUri, setImageUri] = useState(null);
    
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const modalizeRef = useRef(null);


    const goToNextSlide = () => {
        setCurrentSlide(currentSlide + 1);
    };
  
    const goToPreviousSlide = () => {
        setCurrentSlide(currentSlide - 1);
    };

    useEffect(() => {
        if (route.params?.scannedData) {
            const parsedData = JSON.parse(route.params.scannedData); // Assuming data is in JSON format
            setDistrict(parsedData.district || '');
            setMandal(parsedData.mandal || '');
            setVillage(parsedData.village || '');
            setPincode(parsedData.pincode || '');
            setShopname(parsedData.wineshop || '');
        }
    }, [route.params?.scannedData]);

    useEffect(() => {
        (async () => {
            await Audio.requestPermissionsAsync();
        })();
    }, []);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
    
          // Reverse geocode to get the address details
          let address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
    
          if (address.length > 0) {
            setDistrict(address[0].subregion || '');
            setMandal(address[0].district || '');
            setVillage(address[0].name || '');
            setPincode(address[0].postalCode || '');
            
          }
        })();
      }, []);
    

    const startRecording = async () => {
        try {
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                alert('You need to enable audio recording permissions.');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );

            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setRecordedURI(uri);
            setRecording(null);
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const playRecording = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: recordedURI });
            setSound(sound);
            setIsPlaying(true);
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isPlaying) {
                    setIsPlaying(false);
                }
            });
        } catch (err) {
            console.error('Failed to play recording', err);
        }
    };

    const handleMicPress = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handlePlayPress = () => {
        if (isPlaying) {
            sound.stopAsync();
            setIsPlaying(false);
        } else {
            playRecording();
        }
    };

    const isComplaintTypeSelected = complaintType !== '';
    const isComplaintDetails = complaintdetails !== '';
    const isRecording = recording !== null;
    const isImageuri = imageUri !== null;
    const handleImage = async () => {
        let imagePick = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        console.log(imagePick);
        if (!imagePick.canceled && Array.isArray(imagePick.assets) && imagePick.assets.length > 0) {
          const uri = imagePick.assets[0].uri;
          setImageUri(uri);
        //   setFormData(prevData => ({ ...prevData, imageUri: uri })); 
        } else {
          console.log('Image selection was canceled or no image assets found.');
        }
      };
    
      const handleCamera = async () => {
        const cam = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        console.log(cam);
        if (!cam.canceled && Array.isArray(cam.assets) && cam.assets.length > 0) {
          const uri = cam.assets[0].uri; // Define 'uri' here
            setImageUri(uri);
            // setFormData(prevData => ({ ...prevData, imageUri: uri }));
        } else {
          console.log('Image not uploaded');
        }
      };

      const handleNext = () => {
    modalizeRef.current?.open();
  };
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <AntDesign name='arrowleft' size={28} style={{ paddingVertical: width * 0.02 }} onPress={()=>navigation.navigate('home')} />
                {currentSlide === 0 && (
                    <View>
                        <View style={styles.view11}>
                            <View style={styles.paper}>
                                <PaperInput
                                    label="Shop Name"
                                    value={shopname}
                                    onChangeText={setShopname}
                                    mode="outlined"
                                    style={styles.input}
                                    activeOutlineColor="black"
                                />
                            </View>
                            <View style={styles.paper}>
                                <PaperInput
                                    label="Complaint Details"
                                    value={complaintdetails}
                                    onChangeText={setComplaintdetails}
                                    mode="outlined"
                                    activeOutlineColor="black"
                                    multiline={true}
                                    numberOfLines={3}
                                    style={styles.textarea}
                                    placeholder=""
                                    right={
                                        <PaperInput.Icon
                                            icon={() => <MaterialIcons name="keyboard-voice" size={24} color="black" />}
                                            onPress={handleMicPress}
                                        />
                                    }
                                />
                            </View>
                            <View style={{ paddingVertical: width * 0.03 }}>
                                {recordedURI && (
                                    <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                                        <Text style={styles.buttonText}>{isPlaying ? 'Stop Playing' : 'Play Recording'}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <Text style={styles.radioButtonTitle}>Select Complaint Type:</Text>
                                <RadioButton.Group onValueChange={value => setComplaintType(value)} value={complaintType}>
                                    <View style={styles.radioButtonRow}>
                                        <Text style={[styles.radioButtonText, complaintType === "A4Shop Violation" && styles.selectedText]}>
                                            A4Shop Violation
                                        </Text>
                                        <RadioButton value="A4Shop Violation" color="#E03546" />
                                    </View>
                                    <View style={styles.radioButtonRow}>
                                        <Text style={[styles.radioButtonText, complaintType === "Toddy Adulteration" && styles.selectedText]}>
                                            Toddy Adulteration
                                        </Text>
                                        <RadioButton value="Toddy Adulteration" color="#E03546" />
                                    </View>
                                    <View style={styles.radioButtonRow}>
                                        <Text style={[styles.radioButtonText, complaintType === "Defence Liquor" && styles.selectedText]}>
                                            Defence Liquor
                                        </Text>
                                        <RadioButton value="Defence Liquor" color="#E03546" />
                                    </View>
                                    <View style={styles.radioButtonRow}>
                                        <Text style={[styles.radioButtonText, complaintType === "Excise Personnel" && styles.selectedText]}>
                                            Excise Personnel
                                        </Text>
                                        <RadioButton value="Excise Personnel" color="#E03546" />
                                    </View>
                                </RadioButton.Group>
                            </View>
                        </View>

                        <View style={styles.buttonview}>
                            <TouchableOpacity onPress={() => {
                                if (isComplaintTypeSelected || isRecording) {
                                    goToNextSlide();
                                }
                            }} >
                                <Text style={[styles.buttontext, { color: isComplaintTypeSelected || isRecording ? 'white' : 'gray' , backgroundColor:isComplaintTypeSelected || isRecording ? '#E03546':'lightgray' }]}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {currentSlide === 1 && (
                    <View style={styles.mainaview}>
                    <View style={styles.aview}>
                    
                    <View style={styles.imagecont}>
                    {imageUri && (
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                      />
                    )}
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleImage}>
                            <Text style={styles.buttonupload} >UPLOAD</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleCamera}>
                            <Feather name='camera' style={styles.buttonicon} size={30} />
                        </TouchableOpacity>
                     </View>
                    </View>

                    <View style={styles.bview}>
                        <View>
                            <TouchableOpacity onPress={()=>{
                                goToPreviousSlide()
                            }}>
                                <Text style={styles.btext}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                        <TouchableOpacity onPress={()=>{
                            if (isImageuri) {
                                goToNextSlide();
                            }
                        }}>
                        <Text style={[styles.btext, { color: isImageuri ? 'white' : 'gray' , backgroundColor:isImageuri ? '#E03546':'lightgray' }]}>NEXT</Text>
                    </TouchableOpacity> 
                        </View>

                    </View>

                    </View>
                )}
                {currentSlide === 2 && (
                    <View style={styles.pview}>
                       <View style={styles.pview1}>
                        <View style={styles.paper}>
                        <PaperInput
                        label="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        mode="outlined"
                        style={styles.input} 
                        activeOutlineColor="black"
                        />
                        </View>
                        <View style={styles.paper}>
                        <PaperInput
                        label="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        mode="outlined"
                        style={styles.input}
                        activeOutlineColor="black"
                        />
                        </View>
                        <View style={styles.paper}>
                        <PaperInput
                        label="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        mode="outlined"
                        style={styles.input}
                        activeOutlineColor="black"
                        keyboardType="numeric"
                        />
                        </View>
                        <View style={styles.paper}>
                        <PaperInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={styles.input}
                        activeOutlineColor="black"
                        />
                        </View>
                        <View style={styles.paper}>
                        <PaperInput
                        label="Address"
                        value={address}
                        onChangeText={setAddress}
                        mode="outlined"
                        style={styles.input}
                        activeOutlineColor="black"
                        />
                        </View>
                        
                       </View>
                       <View style={styles.bview}>
                       <View>
                           <TouchableOpacity onPress={()=>{
                               goToPreviousSlide()
                           }}>
                               <Text style={styles.btext}>Back</Text>
                           </TouchableOpacity>
                       </View>
                       <View>
                       <TouchableOpacity onPress={handleNext}>
                       <Text style={styles.btext}>NEXT</Text>
                   </TouchableOpacity> 
                       </View>

                   </View>


                    </View>
                )}
            </View>

            <View style={styles.view2}>
                <View style={{flexDirection:'row',
                    paddingVertical:width*0.04
                }}>
                    <View>
                    <Entypo name='location-pin' size={30} style={styles.location} />
                    </View>
                    <View>
                    <Text style={styles.village}>{village}</Text>
                    </View>
                </View>
                <View>
                  <Text style={styles.mandal}>{` ${mandal}, ${district},${pincode}.`}</Text>
                </View>
            </View>
            <Modalize
        ref={modalizeRef}
        snapPoint={900}
        modalHeight={height * 0.9}
        handlePosition="inside"
        modalStyle={styles.modal}
       
      >
        
      </Modalize>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view1: {
        height: height * 0.78,
        backgroundColor: 'ghostwhite',
        paddingHorizontal: width * 0.03
    },
    view2: {
        height: height * 0.22,
        backgroundColor: '#E03546',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: width * 0.02,
        paddingVertical:width*0.05
    },
    view11: {
        paddingHorizontal: width * 0.02,
        height: height * 0.60,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 0
    },
    input: {
        borderWidth: 0,
        fontSize: width * 0.04,
        height: height * 0.05
    },
    playButton: {
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.03,
        borderRadius: 5,
        backgroundColor: '#E03546',
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.04,
        fontWeight: '400',
        textAlign: 'center'
    },
    radioButtonContainer: {
        paddingVertical: width * 0.05
    },
    radioButtonTitle: {
        fontSize: width * 0.04,
        // marginBottom: 10,
    },
    radioButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: height * 0.005,
    },
    paper: {
        paddingVertical: width * 0.02
    },
    buttontext: {
        fontSize: width * 0.04,
        fontWeight: '400',
        color: 'black',
        backgroundColor: 'whitesmoke',
        textAlign: 'center',
        paddingVertical: width * 0.02,
        borderRadius: 5,
        elevation: 0,
        
    },
    buttonview: {
        paddingVertical: width * 0.04,
        paddingHorizontal: width * 0.02,
        marginTop: width * 0.04,
        borderRadius: 10,
        backgroundColor:'white'
    },
    radioButtonText: {
        fontSize: width * 0.04,
        color: 'black',
    },
    selectedText: {
        fontWeight: 'bold',
    },
    location:{
        color:'ghostwhite'
    },
    village:{
        color:'white',
        fontSize:width*0.06,
        fontWeight:'700'
    },
    mandal:{
        color:'white',
        fontWeight:'600'
    },
    image:{
    width: width*0.55,
     height: width*0.55,  
      alignSelf: 'center' ,
      borderRadius:500,
      elevation:20, 
      position:'absolute' 
  },
  imagecont:{
    paddingVertical:width*0.27,
    marginHorizontal:width*0.20,
    backgroundColor:'lightgray',
    position:'relative',
    borderRadius:500,
    marginTop:width*0.05
  },
  buttonicon:{
    position:'absolute',
    backgroundColor:'lightgray',
    padding:width*0.03,
    borderRadius:100,
    borderColor:'white',
    borderWidth:2,
    bottom:width*0.25,
    left:width*0.62
  },
  buttonupload:{
    fontSize:width*0.03,
    fontWeight:'500',
    color:'white',
    backgroundColor:'#E03546',
    textAlign:'center',
    paddingVertical:width*0.02, 
    paddingHorizontal:width*0.10,
    borderRadius:5,
    marginHorizontal:width*0.30,
    marginVertical:width*0.08,
  },
  aview:{
    paddingHorizontal: width * 0.01,
    backgroundColor:'white',
    borderRadius:10,
    marginVertical:height*0.04,
    paddingVertical:height*0.02
  },
  bview:{
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:'space-between',
    paddingVertical:width*0.05,
    paddingHorizontal:width*0.02,
    marginTop:height*0.10
  },
  btext:{
    fontSize:width*0.045,
    fontWeight:'600',
    paddingHorizontal:width*0.1,
    paddingVertical:width*0.02,
    backgroundColor:'#E03546',
    borderRadius:5,
    color:'white'
  },
  pview1:{
    paddingHorizontal: width * 0.02,
    backgroundColor:'white',
    paddingVertical:width*0.10,
    borderRadius:10
  }
})
