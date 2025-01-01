import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BsCart4 } from "react-icons/bs";
import { FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt, FaHome, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useAuth } from '../../../context/auth';
import { useSearch } from '../../../context/search';
import { useCart } from '../../../context/cart';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useSearch();
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cart] = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleScroll = () => {
      if (!showMenu) { // Only update scroll state if menu is closed
        setIsScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showMenu]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleLogout = () => {
    setAuth(prevAuth => ({
      ...prevAuth,
      user: null,
      token: ""
    }));
    localStorage.removeItem("auth");
    setDropdown(false);
    setShowMenu(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(searchValue);
      setShowMenu(false);
    }
  };

  const menuVariants = {
    hidden: { 
      x: '100%',
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const NavItem = ({ to, icon: Icon, children, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
        ${isActive ? 'text-blue-600 bg-blue-50' : 'hover:text-blue-600 hover:bg-blue-50'}`
      }
    >
      <Icon className="text-lg" />
      <span>{children}</span>
    </NavLink>
  );

  return (
    <nav 
    className={`fixed w-full z-50 transition-all duration-300 ${
      showMenu 
        ? 'bg-white shadow-lg' // Always solid white with shadow when menu is open
        : isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm'
    }`}
  >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <BsCart4 className="text-3xl" />
            <span>SwiftCart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar with Keyboard Shortcut Hint */}
            <div className="relative">
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search products (Ctrl + K)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <NavItem to="/" icon={FaHome}>Home</NavItem>

            {!auth.user ? (
              <>
                <NavItem to="/register" icon={FaUserPlus}>Sign Up</NavItem>
                <NavItem to="/login" icon={FaSignInAlt}>Login</NavItem>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{auth.user.name}</span>
                </button>

                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdown(false)}
                      >
                        <FaUser className="mr-2 text-blue-600" />
                        Dashboard
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 hover:bg-red-50 text-left transition-colors text-red-600"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <Link 
              to="/cart" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
            >
              <div className="relative">
                <BsCart4 className="text-xl" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {showMenu ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-white z-40 md:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-4 pb-6 space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex flex-col space-y-2">
                <NavItem to="/" icon={FaHome} onClick={() => setShowMenu(false)}>Home</NavItem>
                
                {!auth.user ? (
                  <>
                    <NavItem to="/register" icon={FaUserPlus} onClick={() => setShowMenu(false)}>Sign Up</NavItem>
                    <NavItem to="/login" icon={FaSignInAlt} onClick={() => setShowMenu(false)}>Login</NavItem>
                  </>
                ) : (
                  <>
                    <NavItem 
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                      icon={FaUser}
                      onClick={() => setShowMenu(false)}
                    >
                      Dashboard
                    </NavItem>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                )}

                <Link 
                  to="/cart" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
                  onClick={() => setShowMenu(false)}
                >
                  <div className="relative">
                    <BsCart4 className="text-xl" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;