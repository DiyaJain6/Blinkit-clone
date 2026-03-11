import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import './ProductCard.css';

interface ProductProps {
    product: {
        _id: string;
        title: string;
        image: string;
        price: number;
        quantityOption: string;
    };
}

const ProductCard = ({ product }: ProductProps) => {
    const { items, addItem, updateQuantity } = useCartStore();
    const [imgSrc, setImgSrc] = useState(product.image);

    const cartItem = items.find((item) => item.product === product._id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleImageError = () => {
        setImgSrc('https://cdn.grofers.com/app/images/products/sliding_image/Default_Image.jpg'); // Generic Blinkit style fallback
    };

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
        <div className="product-card card">
            <Link to={`/product/${product._id}`} className="product-link">
                <div className="product-image-wrapper">
                    <img
                        src={imgSrc}
                        alt={product.title}
                        className="product-image"
                        onError={handleImageError}
                    />
                    <div className="delivery-badge">
                        <span className="timer-icon">⏱</span> 12 MINS
                    </div>
                </div>
                <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-weight">{product.quantityOption}</p>
                </div>
            </Link>

            <div className="product-footer">
                <div className="flex-between">
                    <div className="product-price">
                        <span className="price-symbol">₹</span>{product.price}
                    </div>

                    {quantity === 0 ? (
                        <button className="add-btn" onClick={handleAdd}>
                            ADD
                        </button>
                    ) : (
                        <div className="quantity-controls">
                            <button className="qty-btn" onClick={handleRemove}>
                                <Minus size={14} />
                            </button>
                            <span className="qty-text">{quantity}</span>
                            <button className="qty-btn" onClick={handleAdd}>
                                <Plus size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
