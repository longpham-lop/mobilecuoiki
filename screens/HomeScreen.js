import React, { useState } from 'react';  // Đảm bảo bạn import useState từ react
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');  // Khai báo state cho searchText
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>BEN</Text>
        <Ionicons name="notifications-outline" size={24} color="#E07415" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchText} // Liên kết giá trị của TextInput với state
            onChangeText={setSearchText} // Cập nhật state khi người dùng nhập liệu
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#E07415" />
        </TouchableOpacity>
      </View>

      {/* Special Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>
      <Image source={require('../assets/anhbong.png')} style={styles.banner} />

      {/* Categories */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Loại</Text>
  <Text style={styles.viewAll}>View all</Text>
</View>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
  <View style={styles.categoryItem}>
    <Image source={require('../assets/nike.png')} style={styles.categoryImage} />
    <Text style={styles.categoryLabel}>Giày Nike</Text>
  </View>
  <View style={styles.categoryItem}>
    <Image source={require('../assets/adidas.png')} style={styles.categoryImage} />
    <Text style={styles.categoryLabel}>Giày Adidas</Text>
  </View>
  <View style={styles.categoryItem}>
    <Image source={require('../assets/puma.png')} style={styles.categoryImage} />
    <Text style={styles.categoryLabel}>Giày Puma</Text>
  </View>
  <View style={styles.categoryItem}>
    <Image source={require('../assets/mizuno.png')} style={styles.categoryImage} />
    <Text style={styles.categoryLabel}>Giày Mizuno</Text>
  </View>
  <View style={styles.categoryItem}>
    <Image source={require('../assets/balo.png')} style={styles.categoryImage} />
    <Text style={styles.categoryLabel}>Balo,tất</Text>
  </View>
  <View style={styles.categoryItem}>
    <Image source={require('../assets/phukien.png')} style={styles.categoryImage} />
    <Text style={styles.categoryLabel}>Phụ kiện</Text>
  </View>
</ScrollView>

      {/* Trends */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Trends & Nổi bật</Text>
  <Text style={styles.viewAll}>View all</Text>
</View>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
  <View style={styles.card}>
    <Image source={require('../assets/image 11.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Nike Air Zoom Mecurial Superfly 9 Elite hồng</Text>
    <Text style={styles.cardPrice}>250.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 12.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Nike Air Elite cam</Text>
    <Text style={styles.cardPrice}>360.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 15.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Mizuno Alpha Pro 2</Text>
    <Text style={styles.cardPrice}>270.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 16.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Giày sân cỏ nhân tạo X19.3 Go</Text>
    <Text style={styles.cardPrice}>460.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 17.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Adidas X SpeedPortal.3 xanh</Text>
    <Text style={styles.cardPrice}>500.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 18.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Adidas X 19.1 TF EG7135 - Cloud White</Text>
    <Text style={styles.cardPrice}>230.000 VND</Text>
  </View>
</ScrollView>


      {/* Halloween Theme */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Đặc biệt</Text>
  <Text style={styles.viewAll}>View all</Text>
</View>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
  <View style={styles.card}>
    <Image source={require('../assets/image 1.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Adidas Nemeziz 19+ FG</Text>
    <Text style={styles.cardPrice}>1.050.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 2.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Nike Mercurial Vapor III</Text>
    <Text style={styles.cardPrice}>2.150.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 3.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Nike Hypervenom Phantom III Elite</Text>
    <Text style={styles.cardPrice}>4.560.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 4.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Giày Mizuno xanh rêu</Text>
    <Text style={styles.cardPrice}>2.580.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 5.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Giày đá bóng Veer tím đen</Text>
    <Text style={styles.cardPrice}>7.000.000 VND</Text>
  </View>
  <View style={styles.card}>
    <Image source={require('../assets/image 6.png')} style={styles.cardImage} />
    <Text style={styles.cardTitle}>Giày đá bóng MT 170434 nhân tạo</Text>
    <Text style={styles.cardPrice}>1.940.000 VND</Text>
  </View>
</ScrollView>


      {/* Upcoming Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sự kiện</Text>
      </View>
      <Image source={require('../assets/vietnam.png')} style={styles.banner} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    top: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E07415',
    left: 170,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#E07415',
  },
  viewAll: {
    color: '#999',
    fontSize: 12,
  },
  banner: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  categoryLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  cardScroll: {
    marginBottom: 10,
  },
  card: {
    width: 120,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  cardTitle: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 12,
    color: '#E07415',
  },
  searchRow: {
     flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 1,
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
    bottom:1,
  },
  
});
