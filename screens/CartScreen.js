import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput,FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from './CartContext';
import { ProductContext } from '../contexts/ProductContext';
import {API_URL} from "@env";
import FilterModal from './FilterModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CartScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  // const { product } = route.params;
  const { products, loading } = useContext(ProductContext);

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

  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.product.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const getImageUrl = (filename) => {
    if (!filename) return null;
    if (filename.startsWith('http')) return filename;
    return `${API_URL}/shopbongda/api/upload/${filename}`;
  };

  const getDiscountedPrice = (product) => {
    return product.giamGia > 0
      ? product.gia * (1 - product.giamGia / 100)
      : product.gia;
  };

  const total = cartItems.reduce((sum, item) => {
    const qty = quantities[item.product.id] || 1;
    const price = getDiscountedPrice(item.product);
    return sum + qty * price;
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
      {/* Search Row */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} style={styles.searchIcon} color="#B5B5B5" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilter(!showFilter)}
        >
          <Ionicons name="options-outline" size={20} color="#E07415" />
        </TouchableOpacity>

      </View>

      <FilterModal visible={showFilter} onClose={() => setShowFilter(false)} />

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.maSanPham}
        renderItem={({ item }) => {
          const product = item.product;
          const quantity = quantities[product.id];
          const price = getDiscountedPrice(product);

          return (
            <View style={styles.cartItem}>
              <Image source={{ uri: getImageUrl(product.hinhAnh) }} style={styles.productImage} />

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.productName}>{product.tenSanPham}</Text>
                <Text style={styles.status}>Tình trạng: Còn hàng</Text>

                {/* Price */}
                {product.giamGia > 0 ? (
                  <>
                    <Text style={{ textDecorationLine: 'line-through', color: 'gray' }}>
                      {product.gia.toLocaleString()} VND
                    </Text>
                    <Text style={styles.price}>{price.toLocaleString()} VND</Text>
                  </>
                ) : (
                  <Text style={styles.price}>{price.toLocaleString()} VND</Text>
                )}

                {/* Quantity controls */}
                <View style={styles.quantityControl}>
                  <TouchableOpacity onPress={() => updateQuantity(product.quantity, -1)}>
                    <Ionicons name="remove-circle-outline" size={22} color="#E07415" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(product.quantity, 1)}>
                    <Ionicons name="add-circle-outline" size={22} color="#E07415" />
                  </TouchableOpacity>
                </View>
              </View>
                  
              <TouchableOpacity onPress={() => removeFromCart(product.maSanPham)}>
                <Ionicons name="trash-outline" size={22} color="#E07415" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* Price Summary */}
      <View style={styles.priceDetails}>
        <Text style={styles.sectionTitle}>Tổng đơn hàng</Text>
        <FlatList
        data={cartItems}
        keyExtractor={item => item.product.maSanPham}
        renderItem={({ item }) => {
          const product = item.product;
          const quantity = quantities[product.id];
          const price = getDiscountedPrice(product);
          return (
            <View style={styles.cartItem11}>
              <View style={{ flex: 1, marginLeft: 0 }}>
                <Text style={styles.productName}>{product.tenSanPham}</Text>
              </View>
              <Text style={styles.price}>{price.toLocaleString()} VND</Text>
            </View>
          );
        }}
      />
      <Text >----------------------------------------------------------------------------------------------------------------------------</Text>
        <View style={styles.priceRow}>
          <Text style={{ fontWeight: 'bold' }}>Tạm tính</Text>
          <Text>{total.toLocaleString()} VND</Text>
        </View>
        <View style={styles.priceRow}>
          <Text>Phí giao hàng</Text>
          <Text style={{ color: 'green' }}>Miễn phí</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tổng cộng</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{total.toLocaleString()} VND</Text>
        </View>
        <TouchableOpacity onPress={() => {
                      if (!isLoggedIn) {
                        alert('Bạn cần đăng nhập để thanh toán!');
                        return;
                      }
                      navigation.navigate('Cart', { screen: 'Check' });
                    }}
                    style={[
                      styles.checkoutButton,
                      !isLoggedIn && { backgroundColor: '#ccc' }
                    ]}
                    disabled={!isLoggedIn}
                  >
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

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 19,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E07415',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

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
  cartItem11: {
    marginBottom:4,
    flexDirection: 'row',
    alignItems: 'center',
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
