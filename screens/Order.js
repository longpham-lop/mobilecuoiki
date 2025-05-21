import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { HoaDonContext } from "../contexts/HoaDonContext";
import { Ionicons } from '@expo/vector-icons';

const TrackOrdersScreen = ({ navigation }) => {
  const {
    hoaDonList,
    loading,
    fetchHoaDonsByMaKH,
    deleteHoaDon,
    updateTrangThai,
  } = useContext(HoaDonContext);

  useEffect(() => {
    const fetchUserIdAndOrders = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        fetchHoaDonsByMaKH(storedId);
      }
    };
    fetchUserIdAndOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f57c00" />
        <Text>Đang tải dữ liệu hóa đơn...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.title}>Tên Sản Phẩm: {item.tenHang}</Text>
        <Text style={styles.text}>Ngày mua: {item.ngayMua}</Text>
        <Text style={styles.text}>Hóa đơn #{item.id}</Text>
        <Text style={styles.text}>Giá: {item.gia}</Text>
        <View style={styles.buttonText}>
              {item.trangThai == 'Chờ xác nhận' ? (
              <View>
                <TouchableOpacity onPress={() =>navigation.navigate('Account', { screen: 'Ordert' })} style={styles.trackBtn1} >
                <Text style={styles.trackText1}>Track Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.trackBtn} >
                <Text style={styles.trackText}>Processing</Text>
                </TouchableOpacity>
              </View>
              ) : (
              <TouchableOpacity style={styles.trackBtn} >
              <Text style={styles.trackText}>Delivered</Text>
              </TouchableOpacity>
              )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#E07415" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>My Order</Text>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={ styles.headerTitle}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
      {hoaDonList.length === 0 ? (
        <Text>Không có hóa đơn</Text>
      ) : (
        <FlatList
          data={hoaDonList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default TrackOrdersScreen;



const styles = StyleSheet.create({

  header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 20,
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

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
    
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: -40,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  status: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statusChip: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  processing: {
    backgroundColor: "#f5a623",
  },
  delivered: {
    backgroundColor: "#4caf50",
  },
  trackBtn: {
    backgroundColor: "#f5a623",
    paddingVertical: 4,
    paddingHorizontal: 10, 
    borderRadius: 45,
    marginTop: 4,
    marginLeft: 270,
    height:40,
    top:-35,
    textAlign:"center",
  },
  trackBtn1: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f5a623",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 45,
    marginTop: 4,
    top:-35,
    marginLeft: 270,
    height:40,
    textAlign:"center",
  },
  trackText: {
    color: "#fff",
    textAlign:"center",
    marginTop:7,
    fontSize: 12,
  },
  trackText1: {
    color: "#f5a623",
    textAlign:"center",
    marginTop:7,
    fontSize: 12,
  },
});
