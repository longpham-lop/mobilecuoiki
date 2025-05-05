import React, { useState } from "react";
import { View, Text, TextInput,Alert,Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const VerificationScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");

  const [isAllowed, setIsAllowed] = useState(true);
  
    const handlePress = () => {
      if (isAllowed) {
        navigation.navigate("NumberScreen"); 
      } else {
        Alert.alert("Thông báo", "Bạn không thể truy cập trang này!"); 
      }
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
      <Image source={require("../assets/iconten (2).png")} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your 4-digit code</Text>
      <Text style={styles.minititle}>code</Text>

      <TextInput
        style={styles.input}
        placeholder="- - - -"
        keyboardType="number-pad"
        maxLength={4}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("Location")}
        disabled={otp.length !== 4} 
      >
        <Image source={require("../assets/nextgreen.png")} style={styles.icon1} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "top",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    borderBottomWidth: 2,
    width:400,
    borderBottomColor: "#ccc",
    alignSelf: "flex-start",
    padding: 10,
  },
  resendButton: {
    marginTop: 90,
    alignSelf: "bottom",
  },
  resendText: {
    color: "#53B175",
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 20,
  },
  activeButton: {
    backgroundColor: "#53B175",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  icon: {
    marginTop:30,
    marginBottom:30,

  },
  icon1: {
    height:50,
    width:50,
  }
});

export default VerificationScreen;
