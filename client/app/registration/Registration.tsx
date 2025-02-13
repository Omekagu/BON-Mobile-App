import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import LabelInputComp from '@/component/LabelInputComp';
import TextGreen from '@/component/TextComp/TextGreen';
import CustomBotton from '@/component/CustomBotton';
import Toast from 'react-native-toast-message';

const Registration =()=>{
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [deviceType, setDeviceType] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [referral, setReferral] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const deviceName = Device.modelName;
      setDeviceType(deviceName || 'Unknown Device');

      const country = Localization.getCountry() || 'Unknown Country';
      setUserCountry(country);

      try {
        const response = await axios.get('https://ipapi.co/json/');
        setUserCountry(response.data.country_name || country);
      } catch (error) {
        console.log("Could not fetch country via IP, using device setting.");
      }
    };
    fetchDeviceInfo();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const validatePassword = (password) => {
    return /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{11}$/.test(phoneNumber);
  };

  const handleSubmit = async () => {
    if (!username || !email || !password || !phoneNumber) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'All fields are required' });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid email format' });
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Phone number must be exactly 11 digits' });
      return;
    }
    

    const userData = {
      username,
      email: email.toLowerCase(),
      password,
      phoneNumber,
      profileImage,
      deviceType,
      userCountry,
    };

    try {
      await axios.post('http://10.0.1.24:5001/register', userData);
      Toast.show({ type: 'success', text1: 'Success', text2: 'Registration complete' });
      setUsername('');
      setProfileImage(null);
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setReferral('');
      router.push('/registration/Login');
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Registration failed, try again.' });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* <SafeAreaView style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.back()} />
   
      </SafeAreaView> */}

      <Text style={styles.infoText}>Create your account</Text>

      <View style={styles.formContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.imageText}>Upload Profile Photo</Text>
          )}
        </TouchableOpacity>

        <LabelInputComp label="Username" placeholder="Enter username" value={username} onChangeText={setUsername} />
        <LabelInputComp label="Email" placeholder="Email" value={email} onChangeText={setEmail} />
        <LabelInputComp label="Phone Number" placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        <LabelInputComp label="Password" placeholder="Password" value={password} onChangeText={setPassword} />
        <LabelInputComp label="referral code" placeholder="referral" value={referral} onChangeText={setReferral} />

        <Text style={styles.deviceInfo}>
          📍 Location: {userCountry || 'Detecting...'} {"\n"}
          📱 Device: {deviceType || 'Detecting...'}
        </Text>

        <Text style={styles.termsText}>
          By signing up, you agree to BON'S <TextGreen text="Terms of Use" /> and <TextGreen text="Privacy Policy" />.
        </Text>
<Text> Already have an account?      <Button color={'#000'} title="Login instead ?" onPress={() => router.push('/registration/Login')} /></Text>
        <CustomBotton onPress={handleSubmit} button="Sign Up" />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a63932',
    paddingHorizontal: 10,
    // paddingBottom: 30,
    justifyContent: 'center',
    paddingTop:30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  imagePicker: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    color: '#666',
  },
  deviceInfo: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
});

export default Registration;







