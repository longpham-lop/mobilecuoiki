import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Hoặc dùng react-native-vector-icons nếu không dùng Expo

export default function LocationScreen({ navigation }) {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);

  const zones = ['Banasree', 'Gulshan', 'Dhanmondi'];
  const areas = ['Block A', 'Block B', 'Block C'];

  const renderOption = (item, onSelect) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.option}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/illustration.png')} style={styles.image} />
      <Text style={styles.header}>Select Your Location</Text>
      <Text style={styles.subText}>
        Switch on your location to stay in tune with what's happening in your area
      </Text>

      {/* Your Zone */}
      <Text style={styles.label}>Your Zone</Text>
      <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowZoneModal(true)}>
        <Text style={styles.inputText}>{zone || 'Select your zone'}</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#555" />
      </TouchableOpacity>

      {/* Modal for Zone */}
      <Modal visible={showZoneModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowZoneModal(false)}>
          <View style={styles.modalBox}>
            <FlatList
              data={zones}
              renderItem={({ item }) => renderOption(item, (val) => {
                setZone(val);
                setShowZoneModal(false);
              })}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Your Area */}
      <Text style={styles.label}>Your Area</Text>
      <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowAreaModal(true)}>
        <Text style={styles.inputText}>{area || 'Select your area'}</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#555" />
      </TouchableOpacity>

      {/* Modal for Area */}
      <Modal visible={showAreaModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowAreaModal(false)}>
          <View style={styles.modalBox}>
            <FlatList
              data={areas}
              renderItem={({ item }) => renderOption(item, (val) => {
                setArea(val);
                setShowAreaModal(false);
              })}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 10,
      textAlign: 'center',
    },
    subText: {
      color: '#777',
      marginBottom: 30,
      fontSize: 14,
      textAlign: 'center',
    },
    label: {
      marginBottom: 6,
      fontSize: 15,
      fontWeight: '500',
    },
    inputWithIcon: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 25,
      paddingVertical: 8,
      paddingHorizontal: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputText: {
      fontSize: 16,
      color: '#000',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalBox: {
      margin: 40,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      elevation: 5,
    },
    option: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    button: {
      backgroundColor: '#4CAF50',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    image: {
      justifyContent: 'center',
      left: '19%',
    },

  image: {
    justifyContent:'center',
    left: '19%',
  },
});
