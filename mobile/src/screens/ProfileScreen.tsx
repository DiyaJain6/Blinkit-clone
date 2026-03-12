import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ChevronRight, Settings, ShoppingBag, MapPin, Info, LogOut, Phone } from 'lucide-react-native';

const ProfileScreen = () => {
  const menuItems = [
    { icon: <ShoppingBag color="#333" size={20} />, title: 'Your Orders' },
    { icon: <MapPin color="#333" size={20} />, title: 'Address Book' },
    { icon: <Phone color="#333" size={20} />, title: 'Customer Support' },
    { icon: <Info color="#333" size={20} />, title: 'About Us' },
    { icon: <Settings color="#333" size={20} />, title: 'Settings' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Guest User</Text>
          <Text style={styles.userPhone}>Login to track orders</Text>
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <ChevronRight color="#999" size={20} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <LogOut color="#ff4d4d" size={20} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Blinkit Clone Native v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 44,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  loginBtn: {
    backgroundColor: '#0c831f',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginTop: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4d4d',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;
