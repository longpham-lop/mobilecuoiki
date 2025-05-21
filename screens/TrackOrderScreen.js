import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrackOrderScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#E07415" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <TouchableOpacity>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin đơn hàng */}
      <View style={styles.details}>
        <Text style={styles.estimatedTime}>Estimated time: 18 Dec 15:00</Text>
        <Text style={styles.orderNumber}>Order number: #2482011</Text>
      </View>

      {/* Dòng thời gian */}
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/document.png' }}
                style={styles.icon}
              />
            </View>
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>Order is received</Text>
            <Text style={styles.time}>The shop is preparing your order.</Text>
            <Text style={styles.date}>10:00AM - July 05, 2023</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/processing.png' }}
                style={styles.icon}
              />
            </View>
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>Processing</Text>
            <Text style={styles.time}>The shop is processing your order.</Text>
            <Text style={styles.date}>10:00AM - July 05, 2023</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/shipping.png' }}
                style={styles.icon}
              />
            </View>
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>Shipped</Text>
            <Text style={styles.time}>The shop is preparing to ship your order.</Text>
            <Text style={styles.date}>10:00AM - July 05, 2023</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/delivery.png' }}
                style={styles.icon}
              />
            </View>
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>On the way</Text>
            <Text style={styles.time}>The shop is now delivering your order.</Text>
            <Text style={styles.date}>10:00AM - July 05, 2023</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/delivered.png' }}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>Order delivered</Text>
            <Text style={styles.time}>Your order has been delivered.</Text>
            <Text style={styles.date}>10:00AM - July 05, 2023</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4a261',
  },
  backButton: {
    fontSize: 50,
    color: '#f4a261',
  },
  closeButton: {
    fontSize: 50,
    color: '#f4a261',
  },
  details: {
    marginBottom: 30,
  },
  estimatedTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  orderNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  timeline: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 25,
    marginLeft: 40,
    marginRight: 40,
  },
  circleContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 95,
    backgroundColor: '#f4a261c8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:4,
    borderColor:'#f4a261f9' ,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  verticalLine: {
    width: 2,
    height: 70,
    backgroundColor: '#f4a261',
    position: 'absolute',
    top: 70,
  },
  statusContainer: {
    flex: 1,
    marginBottom: 60,
  },
  status: {
    fontWeight: 'bold',
    color: '#f4a261',
    fontSize: 18,
  },
  time: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  date: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
});

export default TrackOrderScreen;