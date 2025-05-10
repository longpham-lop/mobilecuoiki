import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/splash-icon.png')} // Thay đường dẫn nếu khác
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.logo}>BEN{'\n'}SPORT</Text>
        <Text style={styles.join}>Join us</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5,
  },
  logo: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    lineHeight: 40,
  },
  join: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E07415',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

