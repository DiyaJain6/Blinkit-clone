import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../api/client';
import HomeHeader from '../components/HomeHeader';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, catsRes] = await Promise.all([
          api.get('/products'),
          api.get('/products/categories')
        ]);
        setRecentProducts(productsRes.data.products);
        setCategories(catsRes.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Banner with Gradient */}
        <LinearGradient
          colors={['#218319', '#87bc41']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Stock up on daily essentials</Text>
            <Text style={styles.heroSubtitle}>Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more</Text>
            <TouchableOpacity style={styles.shopNowBtn}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroImageWrapper}>
            <Image 
              source={{ uri: 'https://png.pngtree.com/png-clipart/20250125/original/pngtree-a-bag-full-of-food-including-fruits-vegetables-and-packaged-items-png-image_20034753.png' }} 
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        {/* Promo Grid matching Web */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promoGrid}>
          <TouchableOpacity style={[styles.promoTile, styles.pharmacy]}>
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>Pharmacy at your doorstep!</Text>
              <Text style={styles.promoDesc} numberOfLines={2}>Cough syrups, pain relief sprays & more</Text>
              <View style={styles.promoBtnSmall}>
                <Text style={styles.promoBtnText}>Order Now</Text>
              </View>
            </View>
            <View style={styles.promoImageSidebar}>
              <Image 
                source={{ uri: 'https://png.pngtree.com/png-clipart/20240619/original/pngtree-drug-capsule-pill-from-prescription-in-drugstore-pharmacy-for-treatment-health-png-image_15366552.png' }} 
                style={styles.promoImage} 
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.promoTile, styles.petCare]}>
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>Pet care supplies at your door</Text>
              <Text style={styles.promoDesc} numberOfLines={2}>Food, treats, toys & more</Text>
              <View style={styles.promoBtnSmall}>
                <Text style={styles.promoBtnText}>Order Now</Text>
              </View>
            </View>
            <View style={styles.promoImageSidebar}>
              <Image source={{ uri: 'https://png.pngtree.com/png-vector/20250729/ourmid/pngtree-cute-dog-surrounded-by-grooming-tools-and-pet-care-products-on-png-image_16912457.webp' }} style={styles.promoImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.promoTile, styles.babyCare]}>
            <View style={styles.promoText}>
              <Text style={[styles.promoTitle, { color: '#1a1a1a' }]}>No time for a diaper run?</Text>
              <Text style={[styles.promoDesc, { color: '#1a1a1a' }]} numberOfLines={2}>Get baby care essentials</Text>
              <View style={[styles.promoBtnSmall, { backgroundColor: '#222' }]}>
                <Text style={[styles.promoBtnText, { color: '#fff' }]}>Order Now</Text>
              </View>
            </View>
            <View style={styles.promoImageSidebar}>
               <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20250507/original/pngtree-mom-holding-a-newborn-baby-in-soft-blanke-png-image_20941461.png' }} style={styles.promoImage} />
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.categorySection}>
          <CategoryList />
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dairy, Bread & Eggs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>see all</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator color="#0C831F" style={{ marginVertical: 30 }} />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
              {recentProducts.slice(0, 6).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ScrollView>
          )}
        </View>
        
        {/* Bottom Spacing */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroBanner: {
    padding: 24,
    margin: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 180,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1.2,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 28,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    fontWeight: '600',
    lineHeight: 16,
  },
  shopNowBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 99,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
  },
  heroImageWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '40%',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  heroImage: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  promoGrid: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  promoTile: {
    width: 280,
    borderRadius: 20,
    padding: 20,
    minHeight: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  pharmacy: {
    backgroundColor: '#00b5b7',
  },
  petCare: {
    backgroundColor: '#ffc233',
  },
  babyCare: {
    backgroundColor: '#e6f3ff',
  },
  promoText: {
    flex: 1,
    zIndex: 2,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 22,
    marginBottom: 6,
    color: 'white',
  },
  promoDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    maxWidth: '80%',
  },
  promoBtnSmall: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  promoBtnText: {
    color: '#1a1a1a',
    fontSize: 13,
    fontWeight: '700',
  },
  promoImageSidebar: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 120,
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  promoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  categorySection: {
    marginTop: 0,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1C1C1C',
    letterSpacing: -0.5,
  },
  seeAll: {
    color: '#0C831F',
    fontSize: 15,
    fontWeight: '700',
  },
  productList: {
    paddingBottom: 10,
    paddingLeft: 0,
  },
});

export default HomeScreen;
