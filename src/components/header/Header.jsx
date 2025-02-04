import React, { useState } from 'react';
import "./header.css";
import { Link } from 'react-router';
import { VscAccount } from 'react-icons/vsc';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "#menu" },
    { name: "Subscription", href: "/subscription" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search submit logic, such as redirecting to a search results page
    console.log("Searching for:", searchQuery);
  };

  return (
    <header>
      <nav className="bg-gray-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">

          <div className="flex items-center text-1xl sm:text-3xl font-extrabold leading-tight mb-4 text-yellow-500">
        
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

            {/* Search Bar for Desktop */}
            <form onSubmit={handleSearchSubmit} className="flex items-center ml-8">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="non-veg..."
                className="px-3 py-2 rounded-lg bg-gray-100 text-white"
              />
              <button type="submit" className="ml-2 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-4.35-4.35M19 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>

          {/* Account Icon */}
          <div className="flex items-center">
            <Link to="/register" className="hover:text-yellow-400 transition-all px-3 py-2 rounded-lg">
              <VscAccount className="text-2xl" />
            </Link>
            {/* Sign In Button */}
            <Link to="/login" className="text-white hover:text-yellow-400 transition-all px-4 py-2 rounded-lg border border-yellow-500">
              Sign In
            </Link>
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
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex items-center mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="px-3 py-2 rounded-lg bg-gray-900 text-black"
              />
              <button type="submit" className="ml-2 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-4.35-4.35M19 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </form>

            {/* Mobile Sign In Button */}
            <Link to="/login" className="text-white hover:text-yellow-400 transition-all px-4 py-2 rounded-lg border border-yellow-500 mt-4">
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
