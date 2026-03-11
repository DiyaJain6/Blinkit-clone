import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, LogOut, Plus, Home as HomeIcon, Briefcase } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import './Profile.css';

interface Address {
    _id: string;
    title: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
}

const Profile = () => {
    const { user, isAuthenticated, logout, openLoginModal, login } = useAuthStore();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [fetching, setFetching] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user]);
    const [newAddress, setNewAddress] = useState({
        title: 'Home',
        addressLine: '',
        city: '',
        state: '',
        pincode: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            openLoginModal();
        } else {
            fetchAddresses();
        }
    }, [isAuthenticated]);

    const fetchAddresses = async () => {
        try {
            setFetching(true);
            const res = await api.get('/users/addresses');
            setAddresses(res.data.addresses);
        } catch (err) {
            console.error('Failed to fetch addresses', err);
        } finally {
            setFetching(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setUpdatingProfile(true);
            const res = await api.put('/users/profile', profileData);
            if (res.data.success) {
                // Update the auth store with the new user data
                const token = localStorage.getItem('token');
                if (token) {
                    login(res.data.user, token);
                }
                alert('Profile updated successfully!');
            }
        } catch (err) {
            console.error('Failed to update profile', err);
            alert('Failed to update profile');
        } finally {
            setUpdatingProfile(false);
        }
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await api.post('/users/addresses', newAddress);
            setShowAddressForm(false);
            setNewAddress({ title: 'Home', addressLine: '', city: '', state: '', pincode: '' });
            fetchAddresses();
        } catch (err) {
            console.error('Failed to add address', err);
            alert('Failed to add address');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container profile-page flex-center">
                <div className="login-prompt card">
                    <User size={48} className="prompt-icon" />
                    <h2>Login to see your profile</h2>
                    <p>Manage your orders, addresses and profile details</p>
                    <button className="btn-primary" onClick={openLoginModal}>Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container profile-page">
            <div className="profile-layout">
                <aside className="profile-sidebar card">
                    <div className="user-info">
                        <div className="user-avatar">
                            <User size={32} />
                        </div>
                        <div className="user-details">
                            <h3>{user?.name || 'User'}</h3>
                            <p>{user?.phoneNumber}</p>
                        </div>
                    </div>

                    <nav className="profile-nav">
                        <button className="nav-item active">
                            <User size={18} /> Profile Info
                        </button>
                        <button className="nav-item">
                            <MapPin size={18} /> Saved Addresses
                        </button>
                        <button className="nav-item logout" onClick={handleLogout}>
                            <LogOut size={18} /> Logout
                        </button>
                    </nav>
                </aside>

                <main className="profile-main">
                    <section className="profile-section card">
                        <h2 className="section-title">Address Management</h2>

                        <div className="address-grid">
                            <div className="add-address-card flex-center" onClick={() => setShowAddressForm(true)}>
                                <Plus size={24} />
                                <span>Add New Address</span>
                            </div>

                            {fetching ? (
                                <div className="loading-placeholder">Loading addresses...</div>
                            ) : (
                                addresses.map((addr) => (
                                    <div key={addr._id} className="address-card animate-fade-in">
                                        <div className="address-header">
                                            {addr.title === 'Home' ? <HomeIcon size={16} /> : <Briefcase size={16} />}
                                            <span className="address-title">{addr.title}</span>
                                        </div>
                                        <p className="address-text">
                                            {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    <section className="profile-section card">
                        <h2 className="section-title">Account Settings</h2>
                        <form className="settings-grid" onSubmit={handleUpdateProfile}>
                            <div className="input-field">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                />
                            </div>
                            <div className="input-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={updatingProfile}>
                                {updatingProfile ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    </section>
                </main>
            </div>

            {showAddressForm && (
                <div className="address-form-overlay flex-center">
                    <form className="address-form card animate-slide-up" onSubmit={handleAddAddress}>
                        <div className="form-header flex-between">
                            <h3>Add New Address</h3>
                            <button type="button" className="close-btn" onClick={() => setShowAddressForm(false)}>×</button>
                        </div>
                        <div className="form-body">
                            <div className="form-group">
                                <label>Address Label</label>
                                <div className="title-options">
                                    {['Home', 'Work', 'Other'].map(title => (
                                        <button
                                            key={title}
                                            type="button"
                                            className={`title-btn ${newAddress.title === title ? 'active' : ''}`}
                                            onClick={() => setNewAddress({ ...newAddress, title })}
                                        >
                                            {title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address Line</label>
                                <input
                                    type="text" required
                                    placeholder="House no., Building, Area..."
                                    value={newAddress.addressLine}
                                    onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text" required
                                        placeholder="City"
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text" required
                                        placeholder="State"
                                        value={newAddress.state}
                                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    type="text" required
                                    placeholder="6-digit Pincode"
                                    value={newAddress.pincode}
                                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={() => setShowAddressForm(false)}>Cancel</button>
                            <button type="submit" className="btn-primary" disabled={submitting}>
                                {submitting ? 'Saving...' : 'Save Address'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;
