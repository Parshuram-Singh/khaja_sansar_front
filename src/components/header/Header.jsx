import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import { VscAccount } from 'react-icons/vsc';
import { RiArrowDropDownLine } from "react-icons/ri";
import logoImage from '/logo.jpg';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state
  const navigate = useNavigate(); // Hook for navigation

  // Check token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token from localStorage
    setIsLoggedIn(false); // Update state
    setIsProfileDropdownOpen(false); // Close dropdown
    navigate('/login'); // Redirect to login page
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Menu", 
      href: "/menus",
      dropdownItems: [
        { name: "Browse All Meals", href: "/menus" },
        { name: "Vegetarian", href: "/menu/vegetarian" },
        { name: "Non-Vegetarian", href: "/menu/non-vegetarian" },
        { name: "High-Protein", href: "/menu/high-protein" },
        { name: "Vegan", href: "/menu/vegan" },
        { name: "Today's Special", href: "/menu/special" }
      ]
    },
    {
      name: "Subscriptions",
      href: "/subscriptions",
      dropdownItems: [
        { name: "Custom Plan", href: "/subscriptions" },
        { name: "Weekly Plan", href: "/subscriptions/weekly" },
        { name: "Monthly Plan", href: "/subscriptions/monthly" },
        { name: "Corporate Plans", href: "/subscriptions/corporate" },
        { name: "Student Discounts", href: "/subscriptions/student" },
      ]
    },
    {
      name: "Business",
      href: "/business",
      dropdownItems: [
        { name: "Corporate Plans", href: "/business/corporate" },
        { name: "Bulk Orders", href: "/business/bulk" },
        { name: "Event Catering", href: "/business/catering" },
        { name: "Partner With Us", href: "/business/partner" }
      ]
    },
    {
      name: "Join Us",
      href: "/join",
      dropdownItems: [
        { name: "Become a Restaurant Partner", href: "/join/restaurant-partner" },
        { name: "Delivery Partner Program", href: "/join/delivery-partner" },
        { 
          name: "Careers", 
          href: "/join/careers",
          subItems: [
            { name: "Technology Team", href: "/join/careers/tech" },
            { name: "Operations Team", href: "/join/careers/operations" },
            { name: "Marketing & Growth", href: "/join/careers/marketing" }
          ]
        },
        { name: "Partner Benefits", href: "/join/benefits" },
        { name: "Apply Now", href: "/join/apply" }
      ]
    },
    {
      name: "About Us",
      href: "/about",
      dropdownItems: [
        { name: "About Us", href: "/about" },
        { name: "Our Mission", href: "/about/mission" },
        { name: "Leadership Team", href: "/about/team" },
        { name: "Customer Reviews", href: "/about/testimonials" },
        { name: "Blog & News", href: "/about/blog" },
        { name: "Contact Us", href: "/contact" }
      ]
    }
  ];

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo-container">
            <Link to="/" className="logo">
            <img 
                src={logoImage} 
                alt="Khaja Sansar Logo" 
                className="w-35 h-20 object-contain bg-transparent filter brightness-110 contrast-125 saturate-200 pt-2" 
              />
              {/* Khaja Sansar */}
            </Link>
          </div>

          <div className="desktop-nav">
            <div className="nav-links">
              {navLinks.map((link, index) => (
                <div key={index} className="nav-item">
                  <Link to={link.href} className="nav-link">
                    {link.name}
                    {link.dropdownItems && (
                      <RiArrowDropDownLine className="dropdown-icon" />
                    )}
                  </Link>
                  
                  {link.dropdownItems && (
                    <div className="dropdown-menu">
                      <div className="dropdown-content">
                        {link.dropdownItems.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.href}
                            className="dropdown-link"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="auth-buttons">
              <Link to="/cart" className="cart-link">
                <svg className="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="cart-badge">0</span>
              </Link>

              <div className="profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="profile-button"
                >
                  <VscAccount className="profile-icon" />
                  <span>{isLoggedIn ? 'My Account' : 'Account'}</span>
                  <RiArrowDropDownLine />
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="profile-menu">
                    {isLoggedIn ? (
                      <>
                        <Link to="/dashboard" className="profile-link">
                          Dashboard
                        </Link>
                        <Link to="/orders" className="profile-link">
                          My Orders
                        </Link>
                        <Link to="/profile" className="profile-link">
                          Profile Settings
                        </Link>
                        <div className="divider" />
                        <button 
                          onClick={handleLogout}
                          className="profile-link logout-button" // Added class for styling
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="profile-link">
                          Sign In
                        </Link>
                        <Link to="/register" className="profile-link">
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mobile-menu-button">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-toggle"
            >
              <svg className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          {navLinks.map((link, index) => (
            <div key={index}>
              <Link
                to={link.href}
                className="mobile-nav-link"
              >
                {link.name}
              </Link>
              {link.dropdownItems && (
                <div className="mobile-dropdown-content">
                  {link.dropdownItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.href}
                      className="mobile-dropdown-link"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mobile-auth-content">
          <div className="mobile-auth-links">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="mobile-auth-link">
                  Dashboard
                </Link>
                <Link to="/orders" className="mobile-auth-link">
                  My Orders
                </Link>
                <Link to="/profile" className="mobile-auth-link">
                  Profile Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="mobile-auth-link logout-button"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-auth-link">
                  Sign In
                </Link>
                <Link to="/register" className="mobile-auth-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;