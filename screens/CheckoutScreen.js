import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const CheckoutScreen = ({ navigation }) => {
  const [shippingMethod, setShippingMethod] = useState('home');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [addressDetails, setAddressDetails] = useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#f4a261" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity>
            <Feather name="x" size={24} color="#f4a261" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <Text style={styles.progressText}>Delivery details</Text>
          <Text style={styles.progressText}>Payment</Text>
          <Text style={styles.progressText}>Confirmation</Text>
        </View>

        {/* Shipping Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select shipping method</Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setShippingMethod('home')}
          >
            <View style={styles.radioCircle}>
              {shippingMethod === 'home' && <View style={styles.radioSelected} />}
            </View>
            <Text>Home delivery</Text>
            <Text style={styles.subText}>(1-3 business days)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setShippingMethod('pickup')}
          >
            <View style={styles.radioCircle}>
              {shippingMethod === 'pickup' && <View style={styles.radioSelected} />}
            </View>
            <Text>Pickup point</Text>
            <Text style={styles.subText}>(2-5 business days)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setShippingMethod('store')}
          >
            <View style={styles.radioCircle}>
              {shippingMethod === 'store' && <View style={styles.radioSelected} />}
            </View>
            <Text>Pickup in store</Text>
            <Text style={styles.subText}>(2-5 business days)</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fill information below</Text>
          <Text style={styles.subTitle}>*Contact details</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>*Delivery information</Text>
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal code"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={street}
            onChangeText={setStreet}
          />
          <TextInput
            style={styles.input}
            placeholder="Address details (optional)"
            value={addressDetails}
            onChangeText={setAddressDetails}
          />
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText} onPress={() =>navigation.navigate('Cart', { screen: 'PaymentScreen' })} >Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 15,
    marginTop:30,
    backgroundColor: 'rgb(255, 255, 255)', // Để background mờ nếu cần
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4a261',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressText: {
    color: '#f4a261',
    fontSize: 14,
  },
  section: {
    backgroundColor: 'rgb(251, 247, 237)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4a261',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#f4a261',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f4a261',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#f4a261',
  },
  subText: {
    color: '#666',
    marginLeft: 10,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  checkoutButton: {
    backgroundColor: '#f4a261',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;