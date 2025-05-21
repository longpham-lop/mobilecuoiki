import React, { useState, useContext } from 'react'; // Đảm bảo bạn import useState từ react
import { View, Text, StyleSheet, TextInput, ScrollView,FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { ProductContext } from '../contexts/ProductContext';
import {API_URL} from "@env"
import { useNavigation } from '@react-navigation/native';
import FilterModal from './FilterModal';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');  // Khai báo state cho searchText
    const navigation = useNavigation();
    const { products, loading } = useContext(ProductContext);
    const [showFilter, setShowFilter] = useState(false);
  
    const getImageUrl = (filename) => {
      if (!filename) return null;
      if (filename.startsWith('http')) return filename;
  
      return `http://192.168.105.140:8080/shopbongda/api/upload/${filename}`;
    };
  
    const filteredProducts = products.filter(item =>
      item.tenSanPham?.toLowerCase().includes(searchText.toLowerCase())
    );

    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };

    const randomProducts = shuffleArray(filteredProducts).slice(0, 4);
    const halloweenProducts = shuffleArray(filteredProducts).slice(4, 8);


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
            value={searchText} 
            onChangeText={setSearchText} 
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
      <FilterModal visible={showFilter} onClose={() => setShowFilter(false)} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trends & Nổi bật</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>
      
      <FlatList
        data={randomProducts}
        horizontal={true}
        keyExtractor={(item) => item.maSanPham}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16 }}
        renderItem={({ item }) => (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: getImageUrl(item.hinhAnh) }} style={styles.cardImage} />
            <Text style={styles.rating}>
              <AntDesign name="star" size={12} color="#F1C40F" /> 4.89
            </Text>
            <Text style={styles.cardTitle}>{item.tenSanPham}</Text>
            {item.giamGia > 0 ? (
              <View>
                <Text style={{ textDecorationLine: 'line-through', color: 'gray' }}>
                  {item.gia.toLocaleString()}đ
                </Text>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  {(item.gia * (1 - item.giamGia / 100)).toLocaleString()}đ
                </Text>
              </View>
            ) : (
              <Text style={{ fontWeight: 'bold' }}>{item.gia.toLocaleString()}đ</Text>
            )}
          </TouchableOpacity></ScrollView>
        )}
      />

      


      {/* Halloween Theme */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đặc biệt</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <FlatList
        data={halloweenProducts}
        horizontal={true}
        keyExtractor={(item) => item.maSanPham}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: getImageUrl(item.hinhAnh) }} style={styles.cardImage} />
            <Text style={styles.rating}>
              <AntDesign name="star" size={12} color="#F1C40F" /> 4.89
            </Text>
            <Text style={styles.cardTitle}>{item.tenSanPham}</Text>
            {item.giamGia > 0 ? (
              <View>
                <Text style={{ textDecorationLine: 'line-through', color: 'gray' }}>
                  {item.gia.toLocaleString()}đ
                </Text>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  {(item.gia * (1 - item.giamGia / 100)).toLocaleString()}đ
                </Text>
              </View>
            ) : (
              <Text style={{ fontWeight: 'bold' }}>{item.gia.toLocaleString()}đ</Text>
            )}
          </TouchableOpacity>
        )}
      />



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
