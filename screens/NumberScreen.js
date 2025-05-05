import React, { useState } from "react";
import { Alert,View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NumberScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAllowed, setIsAllowed] = useState(true);

  const handlePress = () => {
    if (isAllowed) {
      navigation.navigate("SignIn");
    } else {
      Alert.alert("Thông báo", "Bạn không thể truy cập trang này!"); 
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handlePress}>
      <Image source={require("../assets/iconten (2).png")} style={styles.icon} />
      </TouchableOpacity>
      {/* Tiêu đề */}
      <Text style={styles.title}>Enter your mobile number</Text>

      {/* Nhập số điện thoại */}
      <View style={styles.inputContainer}>
        <Image source={require("../assets/flag.png")} style={styles.flag} />
        <Text style={styles.countryCode}>+84</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Nút tiếp tục */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VerificationScreen")}
        disabled={phoneNumber.length < 10} // Kiểm tra số điện thoại hợp lệ
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
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
    
    alignItems: "center",
    alignSelf: "flex-end",
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

export default NumberScreen;
