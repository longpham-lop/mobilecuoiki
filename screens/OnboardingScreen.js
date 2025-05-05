import React from "react";
import { View,Image, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require("../assets/onboarding.png")} style={styles.background}>
      <View style={styles.overlay}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>to our store</Text>
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.buttonText}>Get Started</Text>
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
    fontWeight: "bold" ,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#53B175",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    paddingLeft:150,
    paddingRight:150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 20,
    marginBottom:70,
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
});

export default OnboardingScreen;
