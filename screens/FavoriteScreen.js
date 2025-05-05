import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from './CartContext';
import { View, Text,TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function FavoriteScreen() {
  const { favoriteItems, removeFromFavorite } = useContext(CartContext);

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Favorite</Text>
    <FlatList
      data={favoriteItems}
      renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image 
                  source={item.image} 
                  style={styles.productImage} 
                />
                <View >
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productQuantity}>Description: {item.description}</Text>
                <TouchableOpacity onPress={() => removeFromFavorite(item.product.id)}>
                  <Text style={styles.removeButton} > <Ionicons name="chevron-forward-outline"></Ionicons> </Text>
                  <Text style={styles.c}> {item.price}</Text><Text>$</Text>
                </TouchableOpacity>
                </View>
              </View>
            )}
      keyExtractor={item => item.id.toString()}
    />
    <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
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
      backgroundColor: 'green',
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
  