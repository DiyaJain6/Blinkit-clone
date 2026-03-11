import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Minus, ChevronLeft, Clock, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import api from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { items, addItem, updateQuantity } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="container flex-center" style={{ height: '60vh' }}>Loading product...</div>;
    if (!product) return <div className="container flex-center" style={{ height: '60vh' }}>Product not found</div>;

    const cartItem = items.find((item) => item.product === product._id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => {
        if (quantity === 0) {
            addItem({
                product: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: 1,
            });
        } else {
            updateQuantity(product._id, quantity + 1);
        }
    };

    const handleRemove = () => {
        if (quantity > 0) {
            updateQuantity(product._id, quantity - 1);
        }
    };

    return (
        <div className="container product-detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ChevronLeft size={20} /> Back
            </button>

            <div className="product-layout">
                <div className="product-image-section card">
                    <img src={product.image} alt={product.title} className="detail-image" />
                </div>

                <div className="product-info-section">
                    <h1 className="detail-title">{product.title}</h1>
                    <div className="detail-meta">
                        <span className="detail-weight">{product.quantityOption}</span>
                    </div>

                    <div className="detail-price-row">
                        <div className="detail-price">
                            <span className="currency">₹</span>{product.price}
                        </div>

                        <div className="detail-actions">
                            {quantity === 0 ? (
                                <button className="btn-primary" onClick={handleAdd}>ADD TO CART</button>
                            ) : (
                                <div className="quantity-controls detail-qty">
                                    <button className="qty-btn" onClick={handleRemove}><Minus size={18} /></button>
                                    <span className="qty-text">{quantity}</span>
                                    <button className="qty-btn" onClick={handleAdd}><Plus size={18} /></button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="delivery-info">
                        <div className="info-item">
                            <Clock size={16} />
                            <span>Delivery in 10-15 mins</span>
                        </div>
                        <div className="info-item">
                            <ShieldCheck size={16} />
                            <span>Authentic Products Only</span>
                        </div>
                    </div>

                    <div className="detail-description">
                        <h3>Product Details</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
