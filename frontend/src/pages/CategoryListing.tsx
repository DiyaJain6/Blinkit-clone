import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const CategoryListing = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/products?category=${categoryId}`);
                setProducts(res.data.products);

                // Fetch all categories to find the name of current one
                const catsRes = await api.get('/products/categories');
                const currentCat = catsRes.data.categories.find((c: any) => c._id === categoryId);
                if (currentCat) setCategoryName(currentCat.name);

            } catch (err) {
                console.error('Failed to fetch category products', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [categoryId]);

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
            <h1 className="section-title">{categoryName || 'Products'}</h1>
            {loading ? (
                <p>Loading products...</p>
            ) : products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p>No products found in this category.</p>
            )}
        </div>
    );
};

export default CategoryListing;
