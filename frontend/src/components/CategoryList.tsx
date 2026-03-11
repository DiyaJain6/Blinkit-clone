import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './CategoryList.css';

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

    if (loading) return <div className="category-section"><p>Loading categories...</p></div>;

    return (
        <div className="category-section">
            <div className="category-grid">
                {categories.map((cat) => (
                    <Link key={cat._id} to={`/category/${cat._id}`} className="category-item">
                        <div className="category-img-wrapper">
                            <img src={cat.image} alt={cat.name} />
                        </div>
                        <span className="category-name">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
