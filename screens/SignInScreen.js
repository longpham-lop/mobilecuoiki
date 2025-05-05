import React from "react";
import { View, Text, TextInput,Alert, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SignInScreen = ({ navigation }) => {


  return (
    
    <View style={styles.container}>
      <View style={styles.immd}>
        <Image source={require("../assets/rau.png")} /> 
      </View>
      
      <Text style={styles.title}>Get your groceries</Text>
      <Text style={styles.title}>with nectar</Text>

      {/* <View style={styles.inputContainer}>
        <Image source={require("../assets/flag.png")} style={styles.flag} />
        <Text style={styles.countryCode}>+84</Text>
        <TextInput placeholder="Enter your number" style={styles.input} keyboardType="phone-pad" />
      </View> */}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NumberScreen")}>
        <Image source={require("../assets/input.png")} style={styles.input} /> 
      </TouchableOpacity>

      <Text style={styles.orText}>Or connect with social media</Text>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#1877F2" }]}>
        <FontAwesome name="google" size={20} color="#fff" />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="facebook" size={20} color="#fff" />
        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop:30,
    marginBottom: 20,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#888",
  },
  socialButton: {
    flexDirection: "row",
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingTop:20,
    paddingBottom:20,
    marginBottom: 18,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  immd: {
    marginTop:-150,
    marginBottom:50,
  },
  input:{
    height:70,
    width:400,

  },
});

export default SignInScreen;
