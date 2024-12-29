import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* About Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Khaja Sansar</h2>
                        <p className="text-gray-300">
                            Experience the finest dining with the best flavors from around the world.
                            Where every meal is a memory.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#menu" className="hover:text-yellow-500">Menu</a></li>
                            <li><a href="#about" className="hover:text-yellow-500">About Us</a></li>
                            <li><a href="#reservations" className="hover:text-yellow-500">Reservations</a></li>
                            <li><a href="#contact" className="hover:text-yellow-500">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Subscription System */}
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-400 mb-4">Subscribe to Updates</h3>
                        <p className="text-gray-300 mb-4">Get the latest updates, offers, and news delivered right to your inbox.</p>
                        <form className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400 text-sm">© 2024 Khaja Sansar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
