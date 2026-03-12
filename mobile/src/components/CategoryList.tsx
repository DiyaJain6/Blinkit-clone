import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../api/client';

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/products/categories');
        setCategories(res.data.categories);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#0C831F" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryItem} activeOpacity={0.7}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageWrapper: {
    width: 75,
    height: 75,
    backgroundColor: '#f1f7f1', // matching web's .category-img-wrapper background
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  image: {
    width: '110%', // matching transform: scale(1.1)
    height: '110%',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 11,
    textAlign: 'center',
    color: '#1C1C1C',
    fontWeight: '500',
    lineHeight: 14,
  },
});

export default CategoryList;
