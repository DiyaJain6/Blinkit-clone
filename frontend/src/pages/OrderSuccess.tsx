import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Truck, Package, ArrowRight } from 'lucide-react';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const { orderId } = useParams();

    return (
        <div className="container order-success-page flex-center animate-fade-in">
            <div className="success-card card flex-center">
                <div className="success-icon-wrapper">
                    <CheckCircle size={64} className="success-icon" />
                </div>
                <h1>Order Placed Successfully!</h1>
                <p className="order-id-label">Order ID: #{orderId?.slice(-8).toUpperCase()}</p>

                <div className="delivery-milestones">
                    <div className="milestone active">
                        <Package size={20} />
                        <span>Order Received</span>
                    </div>
                    <div className="milestone-line"></div>
                    <div className="milestone">
                        <Truck size={20} />
                        <span>Arriving in 12 mins</span>
                    </div>
                </div>

                <div className="success-actions">
                    <Link to="/" className="btn-secondary">Back to Shopping</Link>
                    <Link to={`/track/${orderId}`} className="btn-primary">
                        Track Order <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
