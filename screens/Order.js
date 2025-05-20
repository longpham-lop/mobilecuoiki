import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const TrackOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndOrders = async () => {
      try {
        const storedId = await AsyncStorage.getItem("userId");
        if (storedId) {
          setUserId(storedId);
          const res = await axios.get(
            `${API_URL}/shopbongda/api/hoadon/makh/5`
          );
          console.log(res.data);
          setOrders(res.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchUserIdAndOrders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.image || "https://via.placeholder.com/60",
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.tenSanPham || "101 red roses"}</Text>
        <Text style={styles.text}>Order Number: #{item.id}</Text>
        <Text style={styles.text}>
          {new Date(item.ngayMua).toLocaleDateString("en-GB")}
        </Text>
        <Text style={styles.text}>Total: {item.tongTien} $</Text>
      </View>
      <View style={styles.status}>
        <Text
          style={[
            styles.statusChip,
            item.trangThai === "Processing"
              ? styles.processing
              : styles.delivered,
          ]}
        >
          {item.trangThai}
        </Text>
        {item.trangThai === "Processing" && (
          <TouchableOpacity style={styles.trackBtn}>
            <Text style={styles.trackText}>Track Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧾 My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default TrackOrdersScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f57c00",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
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
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
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
    borderRadius: 8,
    marginTop: 4,
  },
  trackText: {
    color: "#fff",
    fontSize: 12,
  },
});
