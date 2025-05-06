import React from "react";
import { useFonts, RubikGlitch_400Regular } from '@expo-google-fonts/rubik-glitch';
import { MiltonianTattoo_400Regular } from '@expo-google-fonts/miltonian-tattoo';

import { View,Image, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

const OnboardingScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
      RubikGlitch_400Regular,MiltonianTattoo_400Regular,
    });
  
    if (!fontsLoaded) {
      return null;
    }
    
  return (
    <ImageBackground source={require("../assets/splash-icon.png")} style={styles.background}>
      <View style={styles.overlay}>
      <Text style={styles.subtitle}>Welcome to</Text>
        <Text style={styles.title}>BEN </Text>
        <Text style={styles.title}>SPORT</Text>
        <Text style={styles.subtitle1}>Join us</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    color: "#fff",
    textAlign: "center",
    fontFamily:'MiltonianTattoo_400Regular',
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
    fontFamily:'MiltonianTattoo_400Regular',
  },
  subtitle1: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
    fontFamily:'MiltonianTattoo_400Regular',
  },
  button: {
    backgroundColor: "#E07415",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems:"center",
    marginTop: 20,
    marginBottom:70,
    height:48,
    width:360,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  overlay:{
    alignItems:"center",
    top:-300,
  }
});

export default OnboardingScreen;
