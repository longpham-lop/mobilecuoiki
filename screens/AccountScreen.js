import React, { useState,useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchUserIdAndOrders = async () => {
  try {
    const storedId = await AsyncStorage.getItem("userId");
    const username = await AsyncStorage.getItem("username");
    return { userId: storedId, username };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { userId: null, username: null };
  }
};

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        // isLoggedIn lưu kiểu string, ví dụ 'true' hoặc 'false'
        if (value === 'true') {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error('Failed to fetch login status', e);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const { username } = await fetchUserIdAndOrders();
      setUsername(username || 'User'); // Fallback to 'User' if username is null
    };
    loadUserData();
  }, []);
  const handleLogout = async () => {
  await AsyncStorage.removeItem("username");
  await AsyncStorage.removeItem("userId");
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("info");
  await AsyncStorage.setItem("isLoggedIn", "false");

  navigation.replace('Login'); // Quay lại màn hình đăng nhập
};

  return (
    <ImageBackground
      source={require("../assets/splash-icon.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>BEN</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <FontAwesome name="user" size={60} color="#000" />
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit" size={14} color="#7b4c2f" />
              <Text style={styles.editText}>edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hello Text */}
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.usernameText}>{username}</Text>

        {/* Menu Options */}
        <View style={styles.menuBox}>
          <TouchableOpacity
            onPress={() => {
                      if (!isLoggedIn) {
                        alert('Bạn cần đăng nhập để thanh toán!');
                        return;
                      }
                      navigation.navigate('Account', { screen: 'Order' })
                        }}
                        style={[
                          styles.menuButton,
                          !isLoggedIn && { backgroundColor: '#ccc' }
                        ]}
                        disabled={!isLoggedIn} >
            <Text style={styles.menuText}>My orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleLogout}
          >
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleLogout}
          >
            <Text style={styles.menuText}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleLogout}
          >
            <Text style={styles.menuText}>About us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'serif',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 4,
  },
  editIcon: {
    position: 'absolute',
    bottom: -18,
    alignItems: 'center',
  },
  editText: {
    fontSize: 12,
    color: '#7b4c2f',
  },
  helloText: {
    fontSize: 40,
    color: 'white',
    marginTop: 10,
  },
  usernameText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  menuBox: {
    marginTop: 20,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 4,
  },
  menuButton: {
    width: '85%',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#ffe6d5',
    borderRadius: 12,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7b4c2f',
  },
});