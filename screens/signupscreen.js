// signupscreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);


  const handleSignup = () => {
    // Xử lý đăng ký
    console.log('Signed up');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image source ={require('../assets/carrot.png')} style = {styles.image}/>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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

      <Text style={styles.terms}>
        By continuing you agree to our <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Sing Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.link}>Singup</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    bottom: -3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 40,
    fontSize: 16,
    paddingVertical: 8,
    width: 390,

  },
  terms: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 15,
  },
  link: {
    color: '#00b300',
    textDecorationLine: 'underline',
  },
  signupBtn: {
    backgroundColor: '#00b300',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    fontSize: 13,
    alignSelf: 'center',
    fontWeight:'bold', 
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
