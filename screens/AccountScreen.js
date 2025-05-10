import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

export default function AccountScreen() {
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
        <Text style={styles.usernameText}>Minh</Text>

        {/* Menu Options */}
        <View style={styles.menuBox}>
          <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>My orders</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Settings</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Sign out</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>About us</Text></TouchableOpacity>
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
    fontSize: 22,
    color: '#000',
    marginTop: 10,
  },
  usernameText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d86f45',
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
});
