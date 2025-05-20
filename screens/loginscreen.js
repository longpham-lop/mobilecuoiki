import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env"


export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/shopbongda/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('JWT Token:', data.jwt);
        console.log('User Info:', data.user);

        // Lưu token nếu cần:
        await AsyncStorage.setItem('info', JSON.stringify(data.user));
        await AsyncStorage.setItem('token', data.jwt);

        navigation.navigate('MainTabs', { user: data.user });
      } else {
        const error = await response.text();
        Alert.alert('Login Failed', error);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground source={require("../assets/splash-icon.png")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="   Email"
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

        <Text style={styles.forgot}>Forgot your Password? Click here</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          -----------------   Continue with   ------------------
        </Text>

        <Image source={require('../assets/googleapplefacebuttons.png')} style={styles.image} />

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.signup}>
          ------------------     OR     ------------------
        </Text>

        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.buttonText1}>Continue as a guest</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          Don’t have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
            Signup
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    maxHeight:657,
    flex: 2,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: -3,
    margin:13,
    marginBottom:-5,
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
  },
  header: {
    color: '#E07415' ,
    top:-30,
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
  },
  subText: {
    top:-30,
    color: '#888',
    marginBottom: 30,
  },
  input: {
    top:-30,
    borderWidth: 2 ,
    borderColor: '#E0741538',
    marginBottom: 25,
    fontSize: 16,
    paddingVertical: 8,
    width: 360,
    height:48,
    borderRadius: 10,
    borderStyle: 'solid', 
    right: 10,
  },
  forgot: {
    top:-30,
    textAlign: 'right',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    top:-30,
    backgroundColor: '#E07415BF' ,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 45,
    width :360,
    height :48,
    right: 7,
  },
  button1: {
    borderWidth: 2 ,
    color:'#E07415BF' ,
    top: -20,
    borderColor: '#E07415BF' ,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 45,
    width :360,
    height :48,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    right: 5,
    
  },
  buttonText1: {
    color: '#E07415' ,
    fontSize: 16,
    
  },
  signup: {
    top:-30,
    textAlign: 'center',
    color: '#E07415' ,

  },
  signupLink: {
    top:-30,
    color: '#E07415' ,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    
  },
  eyeIcon: {
    top:-25,
    padding: 5,
    right: 50,
  },
});
