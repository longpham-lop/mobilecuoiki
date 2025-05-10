import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import data from '../data/categories.js';
import FilterModal from './FilterModal';

const ExploreScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [showFilter, setShowFilter] = useState(false);

  const filteredProducts = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.logo}>BEN</Text>
        <View style={styles.notificationWrapper}>
          <Ionicons name="notifications-outline" size={20} color="#E07415" />
        </View>
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
      {/* Product List */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.rating}>
              <AntDesign name="star" size={12} color="#F1C40F" /> 4.89
            </Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}> VND {item.price}</Text>
            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.cartText}>Add to cart</Text>
              <Feather name="shopping-cart" size={16} color="white" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationWrapper: {
    borderWidth: 1,
    borderColor: '#E07415',
    borderRadius: 20,
    padding: 6,
  },
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    margin: 8,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  rating: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D2691E',
    marginTop: 4,
  },
  cartButton: {
    flexDirection: 'row',
    backgroundColor: '#E0813D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  cartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ExploreScreen;
