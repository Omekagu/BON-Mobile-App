import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';


const index = () => {
const [firstName, setFirstName]= useState("")
const [lastName, setLastName]= useState("")
const [email, setEmail]= useState("")
const [password, setPassword]= useState("")
const [phoneNumber, setPhoneNumber]= useState("")

// Function to validate password
const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letter
  const hasDigit = /\d/.test(password); // Check for a digit
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for special character

  // Return true if all conditions are met
  return hasUpperCase && hasDigit && hasSpecialChar;
};


//  Validate phone number
const validatePhoneNumber = (phoneNumber) => {
  // Check if phone number is exactly 11 digits and contains only numbers
  const phoneRegex = /^\d{11}$/;
  return phoneRegex.test(phoneNumber); 
};


// Validate Email
const validateEmail = (email) => {
  // Regular expression for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email); // Returns true if email matches the pattern
};


const handleSubmit =()=>{
  const clearInputs = () => {
    setEmail(''); // Clear email input
    setPassword(''); // Clear password input
    setFirstName(''); // Clear first name input
    setLastName(''); // Clear last name input
    setPhoneNumber(''); // Clear phone number input
  };
  const userData = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
    phoneNumber: phoneNumber.trim(),
  }
  // if( firstName && lastName && email && password && phoneNumber  )
  console.log(firstName,lastName,email,password,phoneNumber);
  // Check if any input is empty
  if (email.trim() === '' || password.trim() === '' || firstName.trim() === '' || lastName.trim() === '' || phoneNumber.trim() === '') {
    alert('Please fill in missing fields'); // Alert for empty fields
  } else if (!validateEmail(email)) {
    // Check if email is valid
    alert('Please enter a valid email address');
  } else if (!validatePassword(password)) {
    // Check if password meets the criteria
    alert('Password must contain at least one uppercase letter, one digit, and one special character');
  } else if (!validatePhoneNumber(phoneNumber)) {
    // Check if phone number is exactly 11 digits
    alert('Phone number must be exactly 11 digits');
  } else {
    // Send registration data if all inputs are valid
    axios
      .post('http://10.0.1.35:5001/register', userData)
      .then((res) => {
        console.log(res.data); // Log the response data
        alert('Successful'); // Set success message
        clearInputs(); // Clear form after successful registration
        router.push('/registration/Login')
      })
      .catch((e) => {
        console.log(e); // Log error
        alert('Registration Failed! Please try again.');
        clearInputs(); // Clear form after failed registration attempt
      });
  }
}
  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <LinearGradient
        colors={['hsla(14, 65%, 58%, 1)', '#b8b2a2']}
        style={{
          paddingHorizontal: 20,
          height: '100%',
        }}
      >
        <View style={{ marginTop: 150 }}>
          <Button
            title="Login"
            onPress={() => router.push('/registration/Login')}
          />
          <LabelInputComp label={'First Name'} placeholder={'first name'} Value={firstName}
        onchangeText={setFirstName} />
          <LabelInputComp label={'Last Name'} placeholder={'surname'} Value={lastName}
        onchangeText={setLastName}/>
          <LabelInputComp label={'Email'} placeholder={'Email'} Value={email}
        onchangeText={setEmail} />
          <LabelInputComp label={'Phone Number'} placeholder={'Phone Number'} Value={phoneNumber}
        onchangeText={setPhoneNumber} />
          <LabelInputComp label={'password'} placeholder={'password'} Value={password}
        onchangeText={setPassword} />
          {/* <LabelInputComp
            label={'confirm password'}
            placeholder={'confirm password'} value={text}
            onChangeText={setText}
          /> */}
          <CustomBotton
            onPress={handleSubmit}
            button={'sign up'}
          />
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default index;
