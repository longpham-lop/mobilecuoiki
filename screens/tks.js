import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

const ConfirmationPage = ({ navigation }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrderDetails({
        items: [
          { name: '101 red roses', price: 105, quantity: 1 },
          { name: '101 red roses', price: 105, quantity: 1 },
        ],
        shippingAddress: '6/90, Mary Antribe, Colorado, USA',
        total: 210,
      });
      setLoading(false);
    }, 1000);
  }, []);


  if (loading || !orderDetails) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }


  const handleTrackOrder = () => {
    navigation.navigate('TrackOrder'); 
  };


  const handleShopMore = () => {
    navigation.navigate('Home'); 
  };


  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#f4a261" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <TouchableOpacity>
          <Feather name="x" size={24} color="#f4a261" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>                Thank you!</Text>
      <Text style={styles.subtitle}>                    Your order is received</Text>

      <TouchableOpacity style={styles.payButton1} onPress={() => navigation.navigate('Account', { screen: 'Order' })}>
              <Text style={styles.payText1}>Track my order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.payButton} onPress={() =>navigation.navigate('Shop')}>
              <Text style={styles.payText}>Shop More</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom:300,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4a261',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
  },
  orderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
  payButton: {
    backgroundColor: '#f4a261',
    padding: 15,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButton1: {
    borderWidth:3,
    borderColor:'#f4a261',
    padding: 15,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 20,
    width:300,
    left:48,
  },
  payText1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmationPage;