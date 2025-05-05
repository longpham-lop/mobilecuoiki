import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Image source ={require('../assets/carrot.png')} style = {styles.image}/>
      <Text style={styles.header}>Loging</Text>
      <Text style={styles.subText}>Enter your emails and password</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        
        <TextInput
          style={styles.input}
          placeholder="Password"
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


      <Text style={styles.forgot}>Forgot Password?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.signup}>
        Don’t have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
          Singup
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: -3,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  subText: {
    color: '#888',
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 25,
    fontSize: 16,
    paddingVertical: 8,
    width: 360,
  },
  forgot: {
    textAlign: 'right',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    
  },
  signup: {
    textAlign: 'center',
    color: '#555',
    fontWeight:'bold',
  },
  signupLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  image: {
    left: '45%',
    bottom: '10%',
  },
  passwordContainer: {
    flexDirection: 'row',
    
  },
  eyeIcon: {
    padding: 5,
    right: 30,
  },
});
