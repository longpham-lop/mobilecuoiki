import React from 'react';
import { View, Text,TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';


export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const filtered = ProductCard.filter(p => p.category === category.name);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.image} />
              <View style={styles.a}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.b}>
                  <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                  <Text style={styles.addText}>+</Text>
                  </TouchableOpacity >
                  </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1,marginTop:30, },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  card: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 10,
  },
  image: { width: 150, height: 100, margin: 28,left:-18,resizeMode: "contain", },
  name: { fontSize: 14 },
  price: { color: 'green', marginTop: 4 },
  searchInput: {
    flex: 1,
    height: 40,
  },
  a:{
    alignItems: 'left',
    left:0,
    top:30
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:30,
  },
  b:{
    right:-130,
    
  },
});
