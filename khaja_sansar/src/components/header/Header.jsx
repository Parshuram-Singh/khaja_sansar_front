import React from 'react';
import "./header.css";
import { Link } from 'react-router';

const Header = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "#menu" },
    { name: "Subscription", href: "/subscription" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header>
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">

          <div className="flex items-center">
            <h2 className="text-1xl sm:text-3xl font-extrabold leading-tight mb-4 text-yellow-500">
              Khaja Sansar
            </h2>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg font-medium main-menu">
            {navLinks.map((link, index) => (
              <Link
                key={index} 
                to={link.href} 
                className="hover:text-yellow-400 transition-all px-3 py-2 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none" id="mobileMenuButton">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden hidden" id="mobileMenu">
          <div className="flex flex-col items-center py-4 space-y-4 bg-yellow-600 text-white">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="hover:text-yellow-400 transition-all px-3 py-2 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
