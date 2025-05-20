import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from './CartContext';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { API_URL } from '@env';

export default function FavoriteScreen({ navigation }) {
  const { favoriteItems, removeFromFavorite } = useContext(CartContext);

  const getImageUrl = (filename) => {
    if (!filename) return null;
    if (filename.startsWith('http')) return filename;
    return `${API_URL}/shopbongda/api/upload/${filename}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#E07415" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorite</Text>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Favorite List */}
      <FlatList
        data={favoriteItems}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
          >
            <Image
              source={{ uri: getImageUrl(item.hinhAnh) }}
              style={styles.productImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.tenSanPham}</Text>
              <Text style={styles.description}>
                {item.moTa || 'Updating...'}
              </Text>
              <View style={styles.priceRow}>
                {item.giamGia > 0 ? (
                  <>
                    <Text style={styles.oldPrice}>
                      {item.gia.toLocaleString()} VND
                    </Text>
                    <Text style={styles.newPrice}>
                      {(item.gia * (1 - item.giamGia / 100)).toLocaleString()} VND
                    </Text>
                  </>
                ) : (
                  <Text style={styles.newPrice}>
                    {item.gia.toLocaleString()} VND
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromFavorite(item.maSanPham)}>
              <Ionicons name="trash-outline" size={22} color="#E07415" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            No favorite items yet.
          </Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff', flex: 1,marginTop:30, },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 ,textAlign:'center',borderBottom: ' solid black'},
    cartItem: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 40,
      paddingBottom: 10,
      backgroundColor: '#fff',
      bottom: 20,
    },

    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#E07415',
    },

    closeText: {
      fontSize: 24,
      color: '#E07415',
    },

    productImage: {
      width: 70,
      height: 70,
      marginRight: 10,
      resizeMode: 'contain'
    },
    productName: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
    },
    productQuantity: {
      fontSize: 14,
      color: '#555',
    },
    button: {
      backgroundColor: '#E07415',
      padding: 14,
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 'auto',
    },
    buttonText: { color: '#fff', fontSize: 16 },
    counter: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 ,border: '2px solid black'},
    counterButton: { fontSize: 24, paddingHorizontal: 20 ,borderColor:'black',borderRadius:20,border: '2px solid black'},
    removeButton:{alignItems:'flex-end',textAlign:'left',fontSize:20,left:280,top:-50,marginBottom:-50},
    c:{alignItems:'flex-end',textAlign:'left',fontSize:20,left:240,top:-23,marginBottom:-50}
    
  });
  