import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, MapPin } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useLocationStore } from '../store/locationStore';
import LocationModal from './LocationModal';
import api from '../services/api';
import './Navbar.css';

const Navbar = () => {
    const { selectedLocation } = useLocationStore();
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { items } = useCartStore();
    const { isAuthenticated, openLoginModal } = useAuthStore();
    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const res = await api.get(`/products?search=${searchQuery}&limit=5`);
                setSuggestions(res.data.products);
            } catch (err) {
                console.error('Search failed', err);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <header className="navbar-wrapper glass-panel">
            <div className="container navbar">
                <div className="nav-left">
                    <Link to="/" className="logo">
                        <span>blink<span className="logo-highlight">it</span></span>
                    </Link>
                    <div className="location-picker" onClick={() => setIsLocationModalOpen(true)}>
                        <h3 className="delivery-title">Delivery in 10 minutes</h3>
                        <div className="location-select flex-center">
                            <span className="address-text">
                                {selectedLocation ? `${selectedLocation.title}: ${selectedLocation.addressLine}` : 'Select Location'}
                            </span>
                            <MapPin size={14} className="loc-icon" />
                        </div>
                    </div>
                </div>

                <div className="nav-center">
                    <div className="search-bar">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder='Search "milk"'
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                        />

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="search-suggestions glass-panel animate-fade-in">
                                {suggestions.map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/product/${item._id}`}
                                        className="suggestion-item"
                                        onClick={() => setShowSuggestions(false)}
                                    >
                                        <img src={item.image} alt="" />
                                        <div className="suggestion-info">
                                            <span className="suggestion-title">{item.title}</span>
                                            <span className="suggestion-price">₹{item.price}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="nav-right">
                    {isAuthenticated ? (
                        <Link to="/profile" className="nav-link">Account</Link>
                    ) : (
                        <button onClick={openLoginModal} className="nav-link">Login</button>
                    )}
                    <Link to="/cart" className="btn-cart">
                        <ShoppingCart size={20} className="shopping-cart-icon" />
                        {items.length > 0 ? (
                            <div className="cart-details">
                                <span className="cart-item-info">{cartItemCount} items</span>
                                <span className="cart-price-info">₹{useCartStore.getState().getTotal()}</span>
                            </div>
                        ) : (
                            <span className="cart-text-empty">My Cart</span>
                        )}
                    </Link>
                </div>
            </div>

            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
            />
        </header>
    );
};

export default Navbar;
