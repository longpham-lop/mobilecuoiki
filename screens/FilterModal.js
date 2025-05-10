import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';


const FilterModal = ({ visible, onClose }) => {
  const [price, setPrice] = useState(100); // <-- phải nằm trong component

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="chevron-back-outline" size={24} color="#E07415" />
          </TouchableOpacity>
          <Text style={styles.logo}>BEN</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Nội dung lọc */}
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Tiêu đề */}
          <Text style={styles.filterTitle}>Sort By</Text>

          {/* Price */}
                    <Text style={styles.filterLabel}>💰 Giá</Text>
                    <View style={styles.priceRange}>
            <Text style={styles.priceText}>0₫</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10000000}
                step={10000}
                minimumTrackTintColor="#E0813D"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#E0813D"
                value={price}
                onValueChange={setPrice}
            />
            <Text style={styles.priceText}>
                {price.toLocaleString('vi-VN')}₫
            </Text>
            </View>
  {/* Quantity */}
  <Text style={styles.filterLabel}>📦 Số lượng</Text>
  <View style={styles.optionRow}>
    {["10-50", "50-100", "100-200", "200+"].map((q, i) => (
      <TouchableOpacity key={i} style={styles.optionButton}>
        <Text>{q}</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Color */}
  <Text style={styles.filterLabel}>🎨 Màu sắc</Text>
  <View style={styles.colorRow}>
    {["#ff69b4", "#ff4500", "#ffa500", "#adff2f", "#000", "#00f", "#fff", "#f5deb3"].map((color, i) => (
      <TouchableOpacity key={i} style={[styles.colorDot, { backgroundColor: color }]} />
    ))}
  </View>

  {/* Type of Flower */}
  <Text style={styles.filterLabel}>Hãng giày</Text>
  <View style={styles.optionRow}>
    {["Adidas", "Nike", "Mizuno", "Biti's", "Asics", "khác"].map((t, i) => (
      <TouchableOpacity key={i} style={styles.typeButton}>
        <Text>{t}</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Category */}
  <Text style={styles.filterLabel}>📂 Phân Loại</Text>
  <View style={styles.optionRow}>
    {["Giày sân cỏ tự nhiên", "Giày sân cỏ nhân tạo", "Giày bata"].map((c, i) => (
      <TouchableOpacity key={i} style={styles.typeButton}>
        <Text>{c}</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Reset và Apply */}
  <View style={styles.buttonRow}>
    <TouchableOpacity style={styles.resetButton}>
      <Text style={styles.btnText}>Reset</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.applyButton}>
      <Text style={[styles.btnText, { color: '#fff' }]}>Apply</Text>
    </TouchableOpacity>
  </View>
</ScrollView>

      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
scroll: {
  padding: 16,
  backgroundColor: '#fff',
},
logo: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#E07415',
  left: 190,
},
closeText: {
    fontSize: 20,
    color: '#E07415',
    left: 400,
    bottom: 50,
},
filterTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#E07415',
  marginBottom: 10,
},

filterLabel: {
  fontSize: 16,
  fontWeight: '600',
  marginTop: 16,
  color: '#E07415',
},
priceText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
},
priceRange: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: 12,
  paddingHorizontal: 10,
},
slider: {
  flex: 1,
  marginHorizontal: 10,
},
barChart: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 60,
  flex: 1,
  marginHorizontal: 10,
},

bar: {
  width: 10,
  backgroundColor: '#E07415',
  marginHorizontal: 4,
  borderRadius: 4,
},

optionRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 8,
},

optionButton: {
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderWidth: 1,
  borderColor: '#E07415',
  borderRadius: 10,
  margin: 4,
},

colorRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginVertical: 8,
},

colorDot: {
  width: 30,
  height: 30,
  borderRadius: 15,
  margin: 4,
  borderWidth: 1,
  borderColor: '#ccc',
},

typeButton: {
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderWidth: 1,
  borderColor: '#E07415',
  borderRadius: 10,
  margin: 4,
},

buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 24,
  paddingBottom: 30,
  top:70,
},

resetButton: {
  flex: 1,
  marginRight: 8,
  padding: 12,
  borderRadius: 10,
  borderColor: '#E07415',
  borderWidth: 1,
  alignItems: 'center',
},

applyButton: {
  flex: 1,
  marginLeft: 8,
  padding: 12,
  borderRadius: 10,
  backgroundColor: '#E07415',
  alignItems: 'center',
},

btnText: {
  fontWeight: 'bold',
  
},
container: {
  flex: 1,
  backgroundColor: '#fff',
  top: 50,
},
})

export default FilterModal;
