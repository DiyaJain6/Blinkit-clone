import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, User, MapPin, ChevronDown } from 'lucide-react-native';

const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.topSection}>
        <View style={styles.navLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>blink<Text style={styles.logoHighlight}>it</Text></Text>
          </View>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTime}>Delivery in 12 minutes</Text>
            <TouchableOpacity style={styles.addressWrapper}>
              <Text style={styles.address} numberOfLines={1}>Home - Your Current Address</Text>
              <ChevronDown color="#000" size={14} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <User color="#000" size={26} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.searchBar}>
        <Search color="#666" size={18} />
        <Text style={styles.searchText}>Search "chocolate"</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 48, 
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    marginRight: 12,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0C831F', // Blinkit Green
  },
  logoHighlight: {
    color: '#F7CB05', // Blinkit Yellow
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryTime: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1C1C1C',
    letterSpacing: -0.2,
  },
  addressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  address: {
    fontSize: 11,
    color: '#666',
    marginRight: 2,
    maxWidth: '80%',
  },
  profileBtn: {
    padding: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    fontWeight: '500',
  },
});

export default HomeHeader;
