import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-top">
                    {/* Useful Links Section */}
                    <div className="footer-links-group">
                        <h4 className="footer-title">Useful Links</h4>
                        <div className="footer-columns-3">
                            <ul className="footer-list">
                                <li><Link to="#">Blog</Link></li>
                                <li><Link to="#">Privacy</Link></li>
                                <li><Link to="#">Terms</Link></li>
                                <li><Link to="#">FAQs</Link></li>
                                <li><Link to="#">Security</Link></li>
                                <li><Link to="#">Contact</Link></li>
                            </ul>
                            <ul className="footer-list">
                                <li><Link to="#">Partner</Link></li>
                                <li><Link to="#">Franchise</Link></li>
                                <li><Link to="#">Seller</Link></li>
                                <li><Link to="#">Warehouse</Link></li>
                                <li><Link to="#">Deliver</Link></li>
                                <li><Link to="#">Resources</Link></li>
                            </ul>
                            <ul className="footer-list">
                                <li><Link to="#">Recipes</Link></li>
                                <li><Link to="#">Bistro</Link></li>
                                <li><Link to="#">District</Link></li>
                                <li><Link to="#">Blinkit Ambulance</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className="footer-links-group">
                        <h4 className="footer-title">Categories <Link to="/categories" className="see-all">see all</Link></h4>
                        <div className="footer-columns-3">
                            <ul className="footer-list">
                                <li><Link to="/category/3">Vegetables & Fruits</Link></li>
                                <li><Link to="/category/4">Cold Drinks & Juices</Link></li>
                                <li><Link to="/category/8">Bakery & Biscuits</Link></li>
                                <li><Link to="/category/11">Dry Fruits, Masala & Oil</Link></li>
                                <li><Link to="/category/1">Paan Corner</Link></li>
                                <li><Link to="/category/16">Pharma & Wellness</Link></li>
                                <li><Link to="/category/19">Personal Care</Link></li>
                                <li><Link to="#">Magazines</Link></li>
                                <li><Link to="/category/23">Electronics & Electricals</Link></li>
                                <li><Link to="/category/25">Toys & Games</Link></li>
                                <li><Link to="#">Rakhi Gifts</Link></li>
                            </ul>
                            <ul className="footer-list">
                                <li><Link to="/category/2">Dairy & Breakfast</Link></li>
                                <li><Link to="/category/6">Instant & Frozen Food</Link></li>
                                <li><Link to="/category/7">Sweet Tooth</Link></li>
                                <li><Link to="/category/12">Sauces & Spreads</Link></li>
                                <li><Link to="/category/14">Organic & Premium</Link></li>
                                <li><Link to="/category/17">Cleaning Essentials</Link></li>
                                <li><Link to="/category/20">Pet Care</Link></li>
                                <li><Link to="/category/24">Kitchen & Dining</Link></li>
                                <li><Link to="/category/18">Stationery Needs</Link></li>
                                <li><Link to="#">Print Store</Link></li>
                            </ul>
                            <ul className="footer-list">
                                <li><Link to="/category/5">Munchies</Link></li>
                                <li><Link to="/category/9">Tea, Coffee & Milk Drinks</Link></li>
                                <li><Link to="/category/10">Atta, Rice & Dal</Link></li>
                                <li><Link to="/category/13">Chicken, Meat & Fish</Link></li>
                                <li><Link to="/category/15">Baby Care</Link></li>
                                <li><Link to="#">Home Furnishing & Decor</Link></li>
                                <li><Link to="/category/22">Beauty & Cosmetics</Link></li>
                                <li><Link to="#">Fashion & Accessories</Link></li>
                                <li><Link to="#">Books</Link></li>
                                <li><Link to="#">E-Gift Cards</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        © Blink Commerce Private Limited, 2016-2024
                    </div>

                    <div className="app-download-section">
                        <span className="download-label">Download App</span>
                        <div className="app-badges">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSv479P9YVGLOLcKO-lyUEOUTzgY44actorw&s" alt="Google Play" className="app-badge" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="app-badge" />
                        </div>
                    </div>

                    <div className="social-links">
                        <Link to="#" className="social-icon"><Facebook size={20} fill="currentColor" /></Link>
                        <Link to="#" className="social-icon"><Twitter size={20} fill="currentColor" /></Link>
                        <Link to="#" className="social-icon"><Instagram size={20} /></Link>
                        <Link to="#" className="social-icon"><Linkedin size={20} fill="currentColor" /></Link>
                        <Link to="#" className="social-icon"><Globe size={20} /></Link>
                    </div>
                </div>

                <div className="footer-disclaimer">
                    “Blinkit” is owned & managed by “Blink Commerce Private Limited” and is not related, linked or interconnected in whatsoever manner or nature, to “GROFFR.COM” which is a real estate services business operated by “Redstone Consultancy Services Private Limited”.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
