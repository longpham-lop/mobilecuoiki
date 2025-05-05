import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import categories from '../data/categories';
import { Feather } from '@expo/vector-icons';

export default function ExploreScreen({ route, navigation }) {
  const { category, items } = route.params; 
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    if (searchText === '') {
      setFiltered(items);
    } else {
      const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFiltered(filteredItems);
    }
  }, [searchText, items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Products</Text>

      {/* 🔍 Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Feather name="search" size={20} color="gray" />
      </View>

      {/* 📂 Category List */}
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Category', { category: item })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* 🛍 Product List (filtered by searchText) */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.addContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                <Text style={styles.addText}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1, marginTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  card: {
    backgroundColor: '#93B175B1',
    alignItems: 'center',
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    height: 200,
  },
  image: { width: 100, height: 60, margin: 28, resizeMode: 'contain' },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  addContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
