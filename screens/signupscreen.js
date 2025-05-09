import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/shopbongda/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('info', JSON.stringify(data.user));
        await AsyncStorage.setItem('token', data.jwt);
        navigation.navigate('MainTabs');
      } else {
        const error = await response.text();
        Alert.alert('Signup Failed', error);
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground source={require("../assets/splash-icon.png")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="   First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="   Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="   Email address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="   Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <Ionicons
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="   Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Ionicons
            name={confirmPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          -----------------   Continue with   ------------------
        </Text>

        <Image source={require('../assets/googleapplefacebuttons.png')} style={styles.image} />

        <Text style={styles.or}>

          ------------------     OR     ------------------
        </Text>

        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.buttonText1}>Continue as a guest</Text>
        </TouchableOpacity>

        <Text style={styles.account}>
          Already have account ?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    backgroundColor: '#fff', // màu trắng phía sau
    bottom: 10,
  },
  container: {
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:1,
    shadowRadius: 10,
    margin:10,
    marginBottom:-5,
    
  },
  header: {
    color: '#E07415',
    top: -25,
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    top: -30,
    borderWidth: 2,
    borderColor: '#E0741538',
    marginBottom: 25,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 360,
    height: 48,
    borderRadius: 10,
    borderStyle: 'solid',
    right: 10,
  },
  button: {
    top: -30,
    backgroundColor: '#E07415BF',
    paddingVertical: 14,
    borderRadius: 45,
    alignItems: 'center',
    marginBottom: 30,
    width: 360,
    height: 48,
    right: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  signup: {
    top: -30,
    textAlign: 'center',
    color: '#E07415',
  },
  signupLink: {
    color: '#E07415',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  eyeIcon: {
    top: -25,
    padding: 5,
    right: 50,
  },
  image: {
    width: 240,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: -20,
  },
  button1: {
    borderWidth: 2,
    borderColor: '#E07415BF',
    paddingVertical: 14,
    borderRadius: 45,
    alignItems: 'center',
    marginBottom: 30,
    width: 360,
    height: 48,
    alignSelf: 'center',
  },
  buttonText1: {
    color: '#E07415',
    fontSize: 16,
  },
  or: {
    top: -15,
    textAlign: 'center',
    color: '#E07415',
  },
  account: {
    top: -20,
    textAlign: 'center',
    color: '#E07415',
  },
});
