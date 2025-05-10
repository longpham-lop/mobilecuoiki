import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.product.id] = 1;
      return acc;
    }, {})
  );

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const total = cartItems.reduce((sum, item) => {
    const qty = quantities[item.product.id] || 1;
    return sum + qty * item.product.price;
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#E07415" />
        </TouchableOpacity>
        <Text style={styles.logo}>BEN</Text>
        <Ionicons name="notifications-outline" size={24} color="#E07415" />
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={18} color="#E07415" />
            </TouchableOpacity>

            <Image source={item.product.image} style={styles.productImage} />

            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.status}>Available in stock</Text>

              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>Add to cart</Text>
                <Ionicons name="cart-outline" size={16} color="#fff" />
              </TouchableOpacity>

              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => updateQuantity(item.product.id, -1)}>
                  <Ionicons name="remove-circle-outline" size={22} color="#E07415" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantities[item.product.id]}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.product.id, 1)}>
                  <Ionicons name="add-circle-outline" size={22} color="#E07415" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
              <Ionicons name="trash-outline" size={22} color="#E07415" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Price Details */}
      <View style={styles.priceDetails}>
        <Text style={styles.sectionTitle}>Price details</Text>
        {cartItems.map(item => (
          <View key={item.product.id} style={styles.priceRow}>
            <Text>{item.product.name} × {quantities[item.product.id]}</Text>
            <Text>{item.product.price * quantities[item.product.id]} $</Text>
          </View>
        ))}
        <View style={styles.priceRow}>
          <Text style={{ fontWeight: 'bold' }}>Subtotal</Text>
          <Text>{total} $</Text>
        </View>
        <View style={styles.priceRow}>
          <Text>Delivery</Text>
          <Text style={{ color: 'green' }}>Free</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={{ fontWeight: 'bold' }}>Total</Text>
          <Text style={{ fontWeight: 'bold' }}>{total} $</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  logo: { fontSize: 22, fontWeight: 'bold', color: '#E07415' },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    elevation: 2,
    position: 'relative'
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  productImage: {
    width: 70,
    height: 70,
    marginRight: 12,
    borderRadius: 8,
  },
  productName: { fontSize: 16, fontWeight: 'bold' },
  status: { fontSize: 12, color: 'green', marginBottom: 6 },

  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E07415',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 5
  },
  cartButtonText: {
    color: 'white',
    marginRight: 5,
    fontSize: 12
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 10
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8
  },

  priceDetails: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E07415',
    marginBottom: 10
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  checkoutButton: {
    backgroundColor: '#E07415',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
