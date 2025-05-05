import React, { useEffect } from "react";
import { View, Image, StyleSheet,Text } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2000); // Chuyển màn hình sau 2 giây
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoTextContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>nectar</Text>
          <Text style={styles.subtitle}>online groceries</Text>
        </View>
      </View>
    </View>
  );
};

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

export default SplashScreen;
