import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from './CartContext';
import { View, Text,TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function FavoriteScreen({navigation}) {
  const { favoriteItems, removeFromFavorite } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="chevron-back" size={24} color="#E07415" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Favorite</Text>
  <TouchableOpacity onPress={() => navigation.popToTop()}>
    <Text style={styles.closeText}>✕</Text>
  </TouchableOpacity>
</View>
          
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
  