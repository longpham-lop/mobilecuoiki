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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTextContainer: {
    flexDirection: "row", 
    alignItems: "center", 
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  textContainer: {
    flexDirection: "column", 
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
    textTransform: "lowercase",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginTop: -5,
  },

});

