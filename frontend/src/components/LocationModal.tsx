import { useEffect, useState } from 'react';
import { MapPin, X, Home, Briefcase, Navigation } from 'lucide-react';
import { useLocationStore } from '../store/locationStore';
import api from '../services/api';
import './LocationModal.css';

interface Address {
    _id: string;
    title: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
}

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LocationModal = ({ isOpen, onClose }: LocationModalProps) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);
    const { setSelectedLocation, selectedLocation } = useLocationStore();

    useEffect(() => {
        if (isOpen) {
            fetchAddresses();
        }
    }, [isOpen]);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users/addresses');
            setAddresses(res.data.addresses);
        } catch (err) {
            console.error('Failed to fetch addresses', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (addr: Address) => {
        setSelectedLocation(addr);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="location-modal-overlay flex-center" onClick={onClose}>
            <div className="location-modal card animate-slide-up" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header flex-between">
                    <h2>Select Location</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <button className="current-loc-btn flex-center">
                        <Navigation size={18} />
                        <span>Detect current location</span>
                    </button>

                    <div className="saved-addresses-section">
                        <h3>Saved Addresses</h3>
                        {loading ? (
                            <div className="loading-spinner">Loading...</div>
                        ) : addresses.length === 0 ? (
                            <p className="no-address">No saved addresses found. Please add one in your profile.</p>
                        ) : (
                            <div className="address-list">
                                {addresses.map((addr) => (
                                    <div
                                        key={addr._id}
                                        className={`address-item ${selectedLocation?._id === addr._id ? 'selected' : ''}`}
                                        onClick={() => handleSelect(addr)}
                                    >
                                        <div className="addr-icon">
                                            {addr.title === 'Home' ? <Home size={18} /> : addr.title === 'Work' ? <Briefcase size={18} /> : <MapPin size={18} />}
                                        </div>
                                        <div className="addr-info">
                                            <span className="addr-title">{addr.title}</span>
                                            <span className="addr-text">{addr.addressLine}, {addr.city}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <p>Wanna add a new address? <a href="/profile">Go to Profile</a></p>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
