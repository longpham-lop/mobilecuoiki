import { useContext } from 'react';
import { CartContext } from './CartContext';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CartScreen() {
  const { cartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const {  removeFromCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
    <FlatList
      data={cartItems}
      renderItem={({ item }) => (
        <View style={styles.cartItem}>
          <Image 
            source={item.product.image} 
            style={styles.productImage} 
          />
          <View >
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productQuantity}>Description: {item.product.description}</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity></View>
          <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
            <Text style={styles.removeButton}>X </Text>
            <Text style={styles.c}> {item.product.price}</Text><Text>$</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={item => item.product.id.toString()}
    >
    </FlatList>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Go to checkout</Text>
    </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1,marginTop:30, },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 ,textAlign:'center',borderBottom: ' solid black'},
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    resizeMode: 'contain'
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: 'green',
    padding: 14,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto',
  },
  buttonText: { color: '#fff', fontSize: 16 },
  counter: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 ,border: '2px solid black'},
  counterButton: { fontSize: 24, paddingHorizontal: 20 ,borderColor:'black',borderRadius:20,border: '2px solid black'},
  removeButton:{alignItems:'flex-end',textAlign:'left',fontSize:20,left:280,top:-90,color:'grey',marginBottom:-50},
  c:{alignItems:'flex-end',textAlign:'left',fontSize:20,left:260,top:0,marginBottom:-50}
});
