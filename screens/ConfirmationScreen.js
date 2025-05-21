import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList ,  TextInput, Button, Alert } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { CartContext } from './CartContext';
import { ProductContext } from '../contexts/ProductContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env";


const ConfirmationScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const { products, loading } = useContext(ProductContext);

  const shippingAddress = {
    name: 'Sofia Mykhailova',
    address: '67 Colorado, USA',
    details: '6/90, Mary Antribe',
  };
  const paymentDetails = 'XXXX-XXXX-XXXX-XXXX';

  const initialQuantities = cartItems.reduce((acc, item) => {
    acc[item.product.id] = item.quantity || 1;
    return acc;
  }, {});
  const [quantities, setQuantities] = useState(initialQuantities);

  // Cập nhật số lượng
  const updateQuantity = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  // Tính tổng tiền
  const getDiscountedPrice = (product) => {
    return product?.giamGia > 0
      ? product.gia * (1 - product.giamGia / 100)
      : product?.gia || 0;
  };

  const total = cartItems.reduce((sum, item) => {
    const qty = quantities[item.product.id] || 1;
    const price = getDiscountedPrice(item.product);
    return sum + qty * price;
  }, 0);

  useEffect(() => {
    const newQuantities = cartItems.reduce((acc, item) => {
      acc[item.product.id] = item.quantity || 1;
      return acc;
    }, {});
    setQuantities(newQuantities);
  }, [cartItems]);

  // Đảm bảo render chỉ khi có dữ liệu
  if (loading || !cartItems) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }
  
  const [maKhachHang, setMaKhachHang] = useState('');
  const [tenHang, setTenHang] = useState('');
  const [gia, setGia] = useState('');
  const [soLuong, setSoLuong] = useState('');
  const [ngayMua, setNgayMua] = useState('');
  const [trangThai, setTrangThai] = useState('Chờ xác Nhận');

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const hoaDon = {
          maHoaDon: 'HD' + Date.now() + Math.floor(Math.random() * 1000), // mã ngẫu nhiên
          maKhachHang: await AsyncStorage.getItem('userId'), // tuỳ theo dữ liệu sản phẩm
          tenHang: item.product.tenSanPham,
          gia: item.product.gia,
          soLuong: item.quantity,
          ngayMua: new Date().toISOString().split('T')[0],
          trangThai: 'Chưa xử lý'
        };

        await axios.post(`http://192.168.105.140:8080/shopbongda/api/hoadon`, hoaDon);
      }

      Alert.alert('Thành công', 'Hóa đơn đã được tạo');
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể tạo hóa đơn');
    }
  };
  const handleConfirmOrder = async () => {
  await handleCheckout(); // Gửi dữ liệu tạo hóa đơn
  navigation.navigate('Cart', { screen: 'ConfirmationPage' }); // Điều hướng
};
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#f4a261" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <TouchableOpacity>
          <Feather name="x" size={24} color="#f4a261" />
        </TouchableOpacity>
      </View>

      {/* Thanh tiến trình */}
      <View style={styles.progressBar}>
        <View style={styles.progressItem}>
          <View style={[styles.progressCircle, styles.progressCircleFilled]} />
          <Text style={styles.progressText}>Chi tiết giao hàng</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={[styles.progressCircle, styles.progressCircleFilled]} />
          <Text style={styles.progressText}>Thanh toán</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={[styles.progressCircle, styles.progressCircleActive]} />
          <Text style={styles.progressText}>Xác nhận</Text>
        </View>
      </View>

      {/* Địa chỉ giao hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kiểm tra và xác nhận đơn hàng</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Địa chỉ giao hàng</Text>
          <Text>{shippingAddress.name}</Text>
          <Text>{shippingAddress.address}</Text>
          <Text>{shippingAddress.details}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chi tiết thanh toán */}
      <View style={styles.section}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Chi tiết thanh toán</Text>
          <Text>{paymentDetails}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tổng đơn hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tổng đơn hàng</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.product.maSanPham}
          renderItem={({ item }) => {
            const product = item.product;
            const quantity = quantities[product.id] || 1;
            const price = getDiscountedPrice(product);
            return (
              <View style={styles.orderItem}>
                <FontAwesome name="heart" size={20} color="#f4a261" />
                <Text style={styles.orderItemName}>{product.tenSanPham}</Text>
                <Text style={styles.orderItemPrice}>
                  {price.toLocaleString()} VND
                </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(product.id, -1)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(product.id, 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Feather name="edit" size={20} color="#f4a261" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={styles.summary}>
          <View style={styles.priceRow}>
            <Text style={{ fontWeight: 'bold' }}>Tạm tính:</Text>
            <Text>{total.toLocaleString()} VND</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Phí giao hàng:</Text>
            <Text style={{ color: 'green' }}>Miễn phí</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tổng cộng:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {total.toLocaleString()} VND
            </Text>
          </View>
        </View>
      </View>
      

      {/* Nút xác nhận */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder} >
        <Text style={styles.confirmText}>Xác nhận đơn hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4a261',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f9f9f9',
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
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4a261',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f4a261',
    borderRadius: 10,
    padding: 15,
    position: 'relative',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4a261',
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  editText: {
    color: '#f4a261',
    fontSize: 14,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
  },
  orderItemName: {
    flex: 1,
    marginLeft: 10,
  },
  orderItemPrice: {
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  summary: {
    marginTop: 20,
    paddingTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#f4a261',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 15,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;