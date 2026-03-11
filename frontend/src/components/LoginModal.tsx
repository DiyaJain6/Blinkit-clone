import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import './LoginModal.css';

const LoginModal = () => {
    const { isLoginModalOpen, closeLoginModal, login } = useAuthStore();

    const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(0);
    const [devOtp, setDevOtp] = useState('');

    React.useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    if (!isLoginModalOpen) return null;

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.length < 10) {
            setError('Please enter a valid 10-digit number');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/send-otp', { phoneNumber });
            setStep('OTP');
            setTimer(30);
            if (res.data.mockOtp) setDevOtp(res.data.mockOtp);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) return;

        setError('');
        setLoading(true);
        try {
            const res = await api.post('/auth/send-otp', { phoneNumber });
            setTimer(30);
            if (res.data.mockOtp) setDevOtp(res.data.mockOtp);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length < 4) {
            setError('Please enter a valid OTP');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/verify-otp', { phoneNumber, otp });
            const { user, token } = response.data;
            login(user, token);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-fade-in">
                <button className="close-btn" onClick={closeLoginModal}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <h2 className="modal-title">
                        {step === 'PHONE' ? 'Phone Number Verification' : 'Enter OTP'}
                    </h2>
                    <p className="modal-subtitle">
                        {step === 'PHONE'
                            ? 'Enter your phone number to login or signup'
                            : `We've sent an OTP to ${phoneNumber}`}
                    </p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {step === 'PHONE' ? (
                    <form onSubmit={handleSendOtp} className="login-form">
                        <div className="input-group">
                            <span className="country-code">+91</span>
                            <input
                                type="tel"
                                className="phone-input"
                                placeholder="Enter mobile number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="btn-primary full-width" disabled={loading || phoneNumber.length < 10}>
                            {loading ? <Loader2 className="spinner" size={20} /> : 'Continue'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="login-form">
                        <div className="input-group">
                            <input
                                type="text"
                                className="phone-input otp-input"
                                placeholder="Enter 4-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="btn-primary full-width" disabled={loading || otp.length < 4}>
                            {loading ? <Loader2 className="spinner" size={20} /> : 'Verify & Login'}
                        </button>
                        <div className="otp-footer">
                            {timer > 0 ? (
                                <p className="resend-text">Resend OTP in <span>{timer}s</span></p>
                            ) : (
                                <button
                                    type="button"
                                    className="btn-text resend-btn"
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                >
                                    Resend OTP
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn-text"
                                onClick={() => { setStep('PHONE'); setOtp(''); setError(''); setTimer(0); setDevOtp(''); }}
                            >
                                Change Number
                            </button>
                        </div>

                        {devOtp && (
                            <div className="dev-hint animate-fade-in">
                                <p><strong>Dev Mode:</strong> Your OTP is <strong>{devOtp}</strong></p>
                            </div>
                        )}
                    </form>
                )}

                {step === 'PHONE' && (
                    <p className="terms-text">
                        By continuing, you agree to our Terms of Service & Privacy Policy
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
