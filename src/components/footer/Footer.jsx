import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="bg-gray-500 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* About Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Khaja Sansar</h2>
                        <p className="text-gray-300">
                            Your trusted meal subscription service in Kathmandu. Simplifying meals for office workers with pre-scheduled deliveries, diverse cuisines, and hassle-free transactions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-400 mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><a href="#subscriptions" className="hover:text-yellow-500">Subscriptions</a></li>
                            <li><a href="#features" className="hover:text-yellow-500">Features</a></li>
                            <li><a href="#restaurants" className="hover:text-yellow-500">Restaurants</a></li>
                            <li><a href="#contact" className="hover:text-yellow-500">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Subscription System */}
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-400 mb-4">Stay Updated</h3>
                        <p className="text-gray-300 mb-4">Join our community to receive updates on new features, offers, and meal plans.</p>
                        <form className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400 text-sm">© 2024 Khaja Sansar. Designed to make your meal planning effortless and delightful.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
