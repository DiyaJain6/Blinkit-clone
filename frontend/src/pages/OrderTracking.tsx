import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Truck, MapPin, Phone, Package } from 'lucide-react';
import api from '../services/api';
import './OrderTracking.css';

const OrderTracking = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${orderId}`);
                setOrder(res.data);
            } catch (err) {
                console.error('Failed to fetch order', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        // Pollard for status updates (Dummy for now)
        const interval = setInterval(fetchOrder, 10000);
        return () => clearInterval(interval);
    }, [orderId]);

    if (loading) return <div className="container flex-center" style={{ height: '60vh' }}>Loading tracking details...</div>;
    if (!order) return <div className="container flex-center" style={{ height: '60vh' }}>Order not found</div>;

    return (
        <div className="container tracking-page animate-fade-in">
            <h1 className="section-title">Track Order</h1>

            <div className="tracking-layout">
                <div className="tracking-status-section card">
                    <div className="status-header">
                        <div className="status-info">
                            <h3>Arriving in 12 mins</h3>
                            <p>Order #{orderId?.slice(-8).toUpperCase()}</p>
                        </div>
                        <div className="status-badge">
                            {order.status.toUpperCase()}
                        </div>
                    </div>

                    <div className="tracking-steps">
                        <div className="step visited">
                            <div className="step-icon"><Package size={16} /></div>
                            <div className="step-text">
                                <strong>Order Placed</strong>
                                <span>We have received your order</span>
                            </div>
                        </div>
                        <div className="step visited">
                            <div className="step-icon"><Package size={16} /></div>
                            <div className="step-text">
                                <strong>Order Packed</strong>
                                <span>Seller has packed your items</span>
                            </div>
                        </div>
                        <div className="step active">
                            <div className="step-icon"><Truck size={16} /></div>
                            <div className="step-text">
                                <strong>Out for Delivery</strong>
                                <span>Delivery partner is on the way</span>
                            </div>
                        </div>
                    </div>

                    <div className="delivery-partner card">
                        <div className="partner-info">
                            <div className="partner-avatar flex-center">R</div>
                            <div>
                                <p className="label">Delivery Partner</p>
                                <h4>Rahul Kumar</h4>
                            </div>
                        </div>
                        <button className="call-btn flex-center">
                            <Phone size={18} />
                        </button>
                    </div>
                </div>

                <div className="order-summary-section">
                    <div className="delivery-address card">
                        <div className="card-header">
                            <MapPin size={18} />
                            <h4>Delivery Address</h4>
                        </div>
                        <p>{order.deliveryAddress.addressLine}</p>
                        <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                    </div>

                    <div className="order-items card">
                        <h4>Order Summary</h4>
                        <div className="items-list">
                            {order.items.map((item: any) => (
                                <div key={item.product} className="summary-item">
                                    <span>{item.quantity} x {item.title}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-total">
                            <span>Total Paid</span>
                            <span>₹{order.totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
