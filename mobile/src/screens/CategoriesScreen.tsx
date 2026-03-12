import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import api from '../api/client';
import ProductCard from '../components/ProductCard';

const { height } = Dimensions.get('window');

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/products/categories');
        setCategories(res.data.categories);
        if (res.data.categories.length > 0) {
          setSelectedCategory(res.data.categories[0]);
        }
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoadingCats(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          setLoadingProducts(true);
          const res = await api.get(`/products?category=${selectedCategory._id}`);
          setProducts(res.data.products);
        } catch (err) {
          console.error('Failed to fetch products', err);
        } finally {
          setLoadingProducts(false);
        }
      };

      fetchProducts();
    }
  }, [selectedCategory]);

  if (loadingCats) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color="#0C831F" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>
      
      <View style={styles.content}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.sidebarItem,
                  selectedCategory?._id === item._id && styles.sidebarItemActive
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <View style={[
                  styles.sidebarImgWrapper,
                  selectedCategory?._id === item._id && styles.sidebarImgWrapperActive
                ]}>
                  <Image source={{ uri: item.image }} style={styles.sidebarImg} />
                </View>
                <Text style={[
                  styles.sidebarText,
                  selectedCategory?._id === item._id && styles.sidebarTextActive
                ]} numberOfLines={2}>{item.name}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Product Grid */}
        <View style={styles.productArea}>
          <Text style={styles.categoryTitle}>{selectedCategory?.name}</Text>
          {loadingProducts ? (
            <ActivityIndicator color="#0C831F" style={{ marginTop: 40 }} />
          ) : products.length > 0 ? (
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              numColumns={2}
              renderItem={({ item }) => (
                <View style={styles.productWrapper}>
                   <ProductCard product={item} />
                </View>
              )}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noProducts}>
              <Text style={styles.noProductsText}>No products found in this category.</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1C1C1C',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 90,
    backgroundColor: '#F8F8F8',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  sidebarItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  sidebarItemActive: {
    backgroundColor: '#EAF5EF',
    borderLeftColor: '#0C831F',
  },
  sidebarImgWrapper: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  sidebarImgWrapperActive: {
    borderColor: '#0C831F',
  },
  sidebarImg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  sidebarText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666666',
    fontWeight: '600',
    lineHeight: 12,
  },
  sidebarTextActive: {
    color: '#0C831F',
    fontWeight: '800',
  },
  productArea: {
    flex: 1,
    paddingHorizontal: 4,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1C1C',
    marginVertical: 14,
    marginLeft: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productWrapper: {
    width: '48%',
    marginBottom: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noProductsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CategoriesScreen;
