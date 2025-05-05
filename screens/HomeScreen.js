import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = ProductCard.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header Location + Search */}
      <Image source={require('../assets/carrot.png')} style={styles.image3} />

      <View style={styles.header}>
        <Text style={styles.locationText}>
          <Ionicons name="location-sharp" size={20} color="#4CAF50" />
          Dhaka, Banassre
        </Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Feather name="search" size={20} color="gray" />
      </View>

      {/* Nếu có nhập searchQuery thì chỉ show kết quả tìm kiếm */}
      {searchQuery.length > 0 ? (
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
        /* Ngược lại (chưa nhập tìm kiếm), show toàn bộ nội dung mặc định */
        <ScrollView>
          <Image
            style={styles.banner}
            source={require('../assets/main/home/banner.png')}
          />

          {/* Exclusive Offer */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exclusive Offer</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          >
            {renderProduct(
              'Organic Bananas',
              '$4.99',
              require('../assets/main/home/tao.png')
            )}
            {renderProduct(
              'Red Apple',
              '$4.99',
              require('../assets/main/home/tao.png')
            )}
          </ScrollView>

          {/* Best Selling */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Selling</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          >
            {renderProduct(
              'Tomato',
              '$4.99',
              require('../assets/main/home/ot.png')
            )}
            {renderProduct(
              'Ginger',
              '$4.99',
              require('../assets/main/home/gung.png')
            )}
          </ScrollView>

          {/* Groceries */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Groceries</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryList}
          >
            {renderProduct1(
              'Dal Masoor',
              require('../assets/main/home/dal.png')
            )}
            {renderProduct1(
              'Rice Premium',
              require('../assets/main/home/rice.png')
            )}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          >
            {renderProduct(
              'Beef Bone',
              '$4.99',
              require('../assets/main/home/lon.png')
            )}
            {renderProduct(
              'Broiler Chicken',
              '$4.99',
              require('../assets/main/home/ga.png')
            )}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}

function renderProduct(name, price, imageSource) {
  return (
    <View style={styles.productCard}>
      <Image style={styles.productImage} source={imageSource} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <View style={styles.c}>
        <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

function renderProduct1(name,imageSource) {
  return (
    <View style={styles.productCard1}>
      <Image style={styles.productImage1} source={imageSource} />
      <Text style={styles.productName1}>{name}</Text>
    </View>
  );
}

function renderCategory(title) {
  return (
    <View style={styles.categoryCard}>
      <Text style={styles.categoryText}>{title}</Text>
    </View>
  );
}

function renderMenuIcon(iconName, label, active = false) {
  let iconComponent;

  switch (label) {
    case 'Shop':
      iconComponent = <Feather name="shopping-bag" size={20} color={active ? '#4CAF50' : 'gray'} />;
      break;
    case 'Explore':
      iconComponent = <Feather name="search" size={20} color={active ? '#4CAF50' : 'gray'} />;
      break;
    case 'Cart':
      iconComponent = <Feather name="shopping-cart" size={20} color={active ? '#4CAF50' : 'gray'} />;
      break;
    case 'Favourite':
      iconComponent = <AntDesign name="hearto" size={20} color={active ? '#4CAF50' : 'gray'} />;
      break;
    case 'Account':
      iconComponent = <Feather name="user" size={20} color={active ? '#4CAF50' : 'gray'} />;
      break;
    default:
      iconComponent = <Feather name="home" size={20} color={active ? '#4CAF50' : 'gray'} />;
  }

  return (
    <View style={styles.menuItem}>
      {iconComponent}
      <Text style={[styles.menuLabel, active && { color: '#4CAF50' }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  locationText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  banner: {
    width: '90%',
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  seeAll: {
    color: '#4CAF50',
  },
  horizontalList: {
    paddingLeft: 16,
    paddingVertical: 10,
  },
  productCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: '',
  },
  productCard1: {
    width: 180,
    backgroundColor: '#F8A44C',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    display:'flex',
    flexDirection: 'row',

  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    left:40
    
  },
  productName: {
    fontWeight: '500',
    textAlign: 'left',
    marginTop: 6,
    
  },
  productImage1: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  productName1: {
    fontWeight: '500',
    textAlign: 'left',
    marginTop: 6,
    
  },
  productPrice: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
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
  categoryList: {
    paddingLeft: 16,
    marginTop: 8,
  },
  categoryCard: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontWeight: '500',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  image3:{
    left: '45%',
    bottom: '0',
    height:40,
    resizeMode: "contain",
  },
  c:{
    top:-30,
    alignItems: 'flex-end',
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
});