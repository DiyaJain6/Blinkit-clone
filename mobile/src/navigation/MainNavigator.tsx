import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Grid, ShoppingCart, User } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'Categories') {
            return <Grid color={color} size={size} />;
          } else if (route.name === 'Cart') {
            return <ShoppingCart color={color} size={size} />;
          } else if (route.name === 'Profile') {
            return <User color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: '#0c831f', // Blinkit green
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
