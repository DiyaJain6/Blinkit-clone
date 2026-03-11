import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, Loader2, MapPin, CreditCard, Wallet, Smartphone, Banknote } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useLocationStore } from '../store/locationStore';
import LocationModal from '../components/LocationModal';
import api from '../services/api';
import './Cart.css';

const Cart = () => {
    const { items, updateQuantity, clearCart, getTotal } = useCartStore();
    const { isAuthenticated, openLoginModal } = useAuthStore();
    const { selectedLocation } = useLocationStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Wallet' | 'COD'>('COD');
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const total = getTotal();

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            openLoginModal();
            return;
        }

        try {
            setLoading(true);

            const addressId = selectedLocation?._id;

            if (!addressId) {
                alert('Please select a delivery address first!');
                setIsLocationModalOpen(true);
                return;
            }

            const orderData = {
                items: items.map(item => ({
                    product: item.product,
                    quantity: item.quantity,
                    priceAtPurchase: item.price,
                })),
                totalAmount: total + 17,
                deliveryAddress: addressId,
                paymentMethod: paymentMethod
            };

            const res = await api.post('/orders', orderData);
            clearCart();
            navigate(`/success/${res.data.order._id}`);
        } catch (err) {
            console.error('Checkout failed', err);
            alert('Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container cart-empty flex-center">
                <h2>Your cart is empty</h2>
                <button className="btn-primary" onClick={() => navigate('/')}>Start Shopping</button>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h1 className="section-title">Checkout</h1>
            <div className="cart-layout">
                <div className="cart-items card">
                    {items.map((item) => (
                        <div key={item.product} className="cart-item">
                            <img src={item.image} alt={item.title} className="item-img" />
                            <div className="item-details">
                                <h4>{item.title}</h4>
                                <div className="item-price">₹{item.price}</div>
                            </div>
                            <div className="item-controls">
                                <div className="quantity-controls">
                                    <button className="qty-btn" onClick={() => updateQuantity(item.product, item.quantity - 1)}>
                                        {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                    </button>
                                    <span className="qty-text">{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => updateQuantity(item.product, item.quantity + 1)}>
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div className="item-total">₹{item.price * item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary flex-col-gap">
                    <section className="summary-section card">
                        <div className="section-header flex-between">
                            <h3>Delivery Address</h3>
                            <button className="change-btn" onClick={() => setIsLocationModalOpen(true)}>Change</button>
                        </div>
                        {selectedLocation ? (
                            <div className="address-preview">
                                <div className="addr-tag">{selectedLocation.title}</div>
                                <p>{selectedLocation.addressLine}, {selectedLocation.city}</p>
                            </div>
                        ) : (
                            <div className="address-placeholder flex-center" onClick={() => setIsLocationModalOpen(true)}>
                                <MapPin size={20} />
                                <span>Select Delivery Address</span>
                            </div>
                        )}
                    </section>

                    <section className="summary-section card">
                        <h3>Payment Method</h3>
                        <div className="payment-options">
                            {[
                                { id: 'UPI', label: 'UPI', icon: <Smartphone size={18} /> },
                                { id: 'Card', label: 'Card', icon: <CreditCard size={18} /> },
                                { id: 'Wallet', label: 'Wallet', icon: <Wallet size={18} /> },
                                { id: 'COD', label: 'Cash on Delivery', icon: <Banknote size={18} /> },
                            ].map((opt) => (
                                <div
                                    key={opt.id}
                                    className={`payment-item ${paymentMethod === opt.id ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod(opt.id as any)}
                                >
                                    {opt.icon}
                                    <span>{opt.label}</span>
                                    <div className="radio-circle"></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bill-details card">
                        <h3>Bill Details</h3>
                        <div className="bill-row">
                            <span>Item Total</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="bill-row">
                            <span>Delivery Charge</span>
                            <span>₹15</span>
                        </div>
                        <div className="bill-row">
                            <span>Handling Charge</span>
                            <span>₹2</span>
                        </div>
                        <div className="bill-total">
                            <span>To Pay</span>
                            <span>₹{total + 17}</span>
                        </div>

                        <div className="checkout-action">
                            <button
                                className="btn-primary"
                                style={{ width: '100%', fontSize: '1.1rem' }}
                                onClick={handleCheckout}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="spinner" size={20} /> : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
            />
        </div>
    );
};

export default Cart;
