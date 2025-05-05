
import React, { useState } from 'react';
import { View, Text,TextInput, StyleSheet,  Modal, FlatList, TouchableOpacity, Image, ScrollView,} from 'react-native';
import categories from '../data/categories';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

export default function ExploreScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const categoryNames = categories.map((c) => c.name);
  const brandNames = [
    'Individual Collection',
    'Cocola',
    'Ifad',
    'Kazi Farmas',
  ];

  const toggleItem = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = ProductCard.filter((prod) => {
    const matchSearch = prod.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(prod.category);
    const matchBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(prod.brand);
    return matchSearch && matchCategory && matchBrand;
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Products</Text>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="gray" /><TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
        <Feather
          name="filter"
          size={20}
          color={selectedCategories.length + selectedBrands.length > 0 ? '#4CAF50' : 'gray'}
        />
      </TouchableOpacity>
        
      </View>

      {searchQuery.length > 0 || selectedCategories.length + selectedBrands.length > 0 ? (
        filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card1}
                onPress={() =>
                  navigation.navigate('ProductDetail', { product: item })
                }
              >
                <Image source={item.image} style={styles.image1} />
                <View style={styles.a}>
                  <Text style={styles.name1}>{item.name}</Text>
                  <Text style={styles.price1}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.b1}>
                  <TouchableOpacity
                    style={styles.addButton1}
                    onPress={() =>
                      navigation.navigate('ProductDetail', { product: item })
                    }
                  >
                    <Text style={styles.addText1}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
            ) : (
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <Text>Không tìm thấy sản phẩm nào</Text>
                </View>
              )
            ) : (
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
            <Text style={styles.a}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    )}
    {/* ---- Filter Modal ---- */}
    <Modal
        visible={filterVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filters</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionLabel}>Categories</Text>
              {categoryNames.map((name) => (
                <TouchableOpacity
                  key={name}
                  style={styles.filterRow}
                  onPress={() =>
                    toggleItem(name, selectedCategories, setSelectedCategories)
                  }
                >
                  <Feather
                    name={
                      selectedCategories.includes(name)
                        ? 'check-square'
                        : 'square'
                    }
                    size={20}
                    color="#4CAF50"
                  />
                  <Text style={styles.filterText}>{name}</Text>
                </TouchableOpacity>
              ))}
              <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
                Brand
              </Text>
              {brandNames.map((name) => (
                <TouchableOpacity
                  key={name}
                  style={styles.filterRow}
                  onPress={() =>
                    toggleItem(name, selectedBrands, setSelectedBrands)
                  }
                >
                  <Feather
                    name={
                      selectedBrands.includes(name)
                        ? 'check-square'
                        : 'square'
                    }
                    size={20}
                    color="#4CAF50"
                  />
                  <Text style={styles.filterText}>{name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.applyText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1,marginTop:30, },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#93B175B1',
    alignItems: 'center',
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    height:200,
  },
  a:{
    fontSize:20,
    fontWeight:'bold',
  },
  image: { width: 100, height: 60, margin: 28,resizeMode: "contain", },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    margin: 16,
  },
  // -----------------------------
  container1: { padding: 16, backgroundColor: '#fff', flex: 1,marginTop:30, },
  title1: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  card1: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 10,
  },
  image1: { width: 150, height: 100, margin: 28,left:-18,resizeMode: "contain", },
  name1: { fontSize: 14 },
  price1: { color: 'green', marginTop: 4 },
  searchInput1: {
    flex: 1,
    height: 40,
  },
  a1:{
    alignItems: 'left',
    left:0,
    top:30
  },
  addButton1: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:30,
  },
  b1:{
    right:-130,
    
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 30, fontWeight: '600' },
  sectionLabel: { fontSize: 20, fontWeight: '500', marginVertical: 12 },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  filterText: { marginLeft: 12, fontSize: 16 },
  applyButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
