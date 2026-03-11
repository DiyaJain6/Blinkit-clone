import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Home.css';

const Home = () => {
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

    const getCategoryId = (name: string) => {
        return categories.find(c => c.name === name)?._id || '#';
    };

    return (
        <div className="container animate-fade-in home-container">
            {/* Hero Section */}
            <section className="hero-banner">
                <div className="hero-content">
                    <h1>Stock up on daily essentials</h1>
                    <p>Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more</p>
                    <Link to={`/category/${getCategoryId('Fruits & Vegetables')}`} className="btn-shop-now">Shop Now</Link>
                </div>
                <div className="hero-image-overlay">
                    <img src="https://png.pngtree.com/png-clipart/20250125/original/pngtree-a-bag-full-of-food-including-fruits-vegetables-and-packaged-items-png-image_20034753.png" alt="Essentials" />
                </div>
            </section>

            {/* Promo Grid */}
            <section className="promo-grid">
                <Link to={`/category/${getCategoryId('Pharma & Wellness')}`} className="promo-tile pharmacy">
                    <div className="promo-text">
                        <h2 className="promo-title">Pharmacy at your doorstep!</h2>
                        <p className="promo-desc">Cough syrups, pain relief sprays & more</p>
                        <button className="btn-order-now">Order Now</button>
                    </div>
                    <div className="promo-image-sidebar">
                        <img src="https://png.pngtree.com/png-clipart/20240619/original/pngtree-drug-capsule-pill-from-prescription-in-drugstore-pharmacy-for-treatment-health-png-image_15366552.png" alt="Pharmacy" />
                    </div>
                </Link>

                <Link to={`/category/${getCategoryId('Pet Care')}`} className="promo-tile pet-care">
                    <div className="promo-text">
                        <h2 className="promo-title">Pet care supplies at your door</h2>
                        <p className="promo-desc">Food, treats, toys & more</p>
                        <button className="btn-order-now">Order Now</button>
                    </div>
                    <div className="promo-image-sidebar">
                        <img src="https://png.pngtree.com/png-vector/20250729/ourmid/pngtree-cute-dog-surrounded-by-grooming-tools-and-pet-care-products-on-png-image_16912457.webp" alt="Pet care" />
                    </div>
                </Link>

                <Link to={`/category/${getCategoryId('Baby Care')}`} className="promo-tile baby-care">
                    <div className="promo-text">
                        <h2 className="promo-title">No time for a diaper run?</h2>
                        <p className="promo-desc">Get baby care essentials</p>
                        <button className="btn-order-now">Order Now</button>
                    </div>
                    <div className="promo-image-sidebar">
                        <img src="https://png.pngtree.com/png-clipart/20250507/original/pngtree-mom-holding-a-newborn-baby-in-soft-blanke-png-image_20941461.png" alt="Baby Care" />
                    </div>
                </Link>
            </section>

            <CategoryList />

            <section className="products-section" style={{ marginTop: '2rem' }}>
                <div className="category-header">
                    <h2 className="section-title">Dairy, Bread & Eggs</h2>
                    <Link to={`/category/${getCategoryId('Dairy, Bread & Eggs')}`} className="see-all-link">see all</Link>
                </div>

                {loading ? (
                    <div className="flex-center" style={{ padding: '3rem' }}>
                        <p>Loading your favorite products...</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {recentProducts.slice(0, 5).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
