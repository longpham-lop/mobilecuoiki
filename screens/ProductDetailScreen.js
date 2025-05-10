import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from './CartContext';

export default function ProductDetailScreen({ route, navigation }) {
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#E07415" />
        </TouchableOpacity>
        <Text style={styles.logo}>BEN</Text>
        <Ionicons name="notifications-outline" size={24} color="#E07415" />
      </View>

      {/* Product image */}
      <Image source={product.image} style={styles.image} />

      {/* Favorite Icon */}
      <TouchableOpacity style={styles.favoriteIcon} onPress={handleAddToFavorite}>
        <Text style={styles.heart}>♡</Text>
      </TouchableOpacity>

      {/* Product info section */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>

        {/* Rating */}
        <Text style={styles.rating}>⭐ 4.89 (41 reviews)</Text>

        {/* Composition */}
        <Text style={styles.compositionLabel}>Composition:</Text>
        <Text style={styles.composition}>5 white , 1 blue</Text>

        {/* Quantity selector */}
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Price */}
        <Text style={styles.price}>{product.price} VND</Text>

        {/* Add to cart button */}
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Add to cart</Text>
        </TouchableOpacity>

        {/* You Might Also Like */}
        <Text style={styles.suggestTitle}>You Might Also Like:</Text>
        <View style={styles.suggestRow}>
          <Image source={require('../assets/image 20.png')} style={styles.suggestImage} />
          <Image source={require('../assets/image 25.png')} style={styles.suggestImage} />
          <Image source={require('../assets/image 17.png')} style={styles.suggestImage} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E07415',
    fontFamily: 'serif'
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginTop: 20
  },
  favoriteIcon: {
    position: 'absolute',
    right: 20,
    top: 270
  },
  heart: {
    fontSize: 24,
    color: '#E07415'
  },
  infoContainer: {
    backgroundColor: '#f7f9f8',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E07415'
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E07415',
    marginBottom: 5
  },
  rating: {
    color: '#777',
    marginBottom: 10
  },
  compositionLabel: {
    fontWeight: 'bold',
    fontSize: 16
  },
  composition: {
    marginBottom: 20,
    color: '#444'
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10
  },
  quantityButton: {
    fontSize: 22,
    paddingHorizontal: 10
  },
  quantityText: {
    fontSize: 18
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E07415',
    marginBottom: 20
  },
  cartButton: {
    backgroundColor: '#E07415',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16
  },
  suggestTitle: {
    fontSize: 16,
    marginBottom: 10
  },
  suggestRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  suggestImage: {
    width: 60,
    height: 60,
    borderRadius: 10
  }
});
