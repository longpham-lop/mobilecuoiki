import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { CartContext } from './CartContext';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToFavorite } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToFavorite = () => {
    addToFavorite(product);
  };
  

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <TouchableOpacity style={styles.tim} onPress={handleAddToFavorite}>
        <Text>❤️</Text>
      </TouchableOpacity>
      <View style={styles.counter}>
        <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))}>
          <Text style={styles.counterButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
          <Text style={styles.counterButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      
      <Text style={styles.detail}>Product Detail:</Text>
      <Text style={styles.detail1}>{product.description}</Text>
      <Text style={styles.detail}>Nutritons                                                              100g</Text>
      <Image source ={require('../assets/main/star.png')}  style={styles.image1} />
      <TouchableOpacity style={styles.button } onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add To Basket</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1,marginTop:30, },
  image: { width: '100%', height: 400, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 18, color: 'green',left:350,top:-30 },
  counter: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  counterButton: { fontSize: 24, paddingHorizontal: 20 },
  quantity: { fontSize: 18 },
  detail: { marginVertical: 0,fontSize:20,fontWeight:'bold' },
  detail1: { marginBottom:40 },
  button: {
    backgroundColor: 'green',
    padding: 14,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto',
  },
  buttonText: { color: '#fff', fontSize: 16 },
  image1:{
    marginTop:110,
    left:300
  },
  tim:{left:370,fontSize:80,height:40,top:-30,marginBottom:-30 }
});
