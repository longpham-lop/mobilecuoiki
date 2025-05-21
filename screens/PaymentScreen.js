import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

const PaymentScreen = ({ navigation }) => {
  // State variables to manage user input and selections
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  return (
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
        <View style={styles.progressItem}>
          <View style={[styles.progressCircle, styles.progressCircleFilled]} />
          <Text style={styles.progressText}>Delivery details</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={[styles.progressCircle, styles.progressCircleActive]} />
          <Text style={styles.progressText}>Payment</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={styles.progressCircle} />
          <Text style={styles.progressText}>Confirmation</Text>
        </View>
      </View>

      {/* Payment Method Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Select payment method</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedPaymentMethod('credit_card')}
        >
          <View style={styles.radioCircle}>
            {selectedPaymentMethod === 'credit_card' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.radioText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedPaymentMethod('paypal')}
        >
          <View style={styles.radioCircle}>
            {selectedPaymentMethod === 'paypal' && <View style={styles.radioSelected} />}
          </View>
          {/* Replace with PayPal logo image if available */}
          <Text style={styles.radioText}>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedPaymentMethod('apple_pay')}
        >
          <View style={styles.radioCircle}>
            {selectedPaymentMethod === 'apple_pay' && <View style={styles.radioSelected} />}
          </View>
          {/* Replace with Apple Pay logo image if available */}
          <Text style={styles.radioText}>Apple Pay</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedPaymentMethod('cash')}
        >
          <View style={styles.radioCircle}>
            {selectedPaymentMethod === 'cash' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.radioText}>Cash at the delivery</Text>
        </TouchableOpacity>
      </View>

      {/* Credit Card Details Section - Shown only if Credit Card is selected */}
      {selectedPaymentMethod === 'credit_card' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fill the information below</Text>
          <Text style={styles.subTitle}>*Credit card details</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Card Holder's name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
          <View style={styles.expiryContainer}>
            <TextInput
              style={[styles.input, styles.expiryInput]}
              placeholder="MM"
              value={expiryMonth}
              onChangeText={setExpiryMonth}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.input, styles.expiryInput]}
              placeholder="YY"
              value={expiryYear}
              onChangeText={setExpiryYear}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            secureTextEntry
            maxLength={3}
          />
          <View style={styles.toggleContainer}>
            <Switch
              value={saveCardDetails}
              onValueChange={setSaveCardDetails}
              trackColor={{ false: "#767577", true: "#f4a261" }}
              thumbColor={saveCardDetails ? "#fff" : "#f4f3f4"}
            />
            <Text style={styles.toggleText}>Save my card details</Text>
          </View>
        </View>
      )}

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payButton} onPress={() =>navigation.navigate('Cart', { screen: 'ConfirmationScreen' })}>
        <Text style={styles.payText}>Pay now</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 25,
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
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f4a261',
  },
  progressCircleFilled: {
    backgroundColor: '#f4a261',
  },
  progressCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f4a261',
  },
  progressText: {
    marginTop: 5,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4a261',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f4a261',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f4a261',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#000',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#f4a261',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    width: '48%',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  toggleText: {
    marginLeft: 10,
    color: '#f4a261',
  },
  payButton: {
    backgroundColor: '#f4a261',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#333',
  },
  cartIconContainer: {
    backgroundColor: '#f4a261',
    borderRadius: 20,
    padding: 5,
  },
});

export default PaymentScreen;