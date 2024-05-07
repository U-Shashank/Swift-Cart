import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";
import { useAuth } from '../../../context/auth';
import { useSearch } from '../../../context/search';
import { useCart } from '../../../context/cart';
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useSearch();
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cart] = useCart();

  useEffect(() => {
    if (!showMenu) setDropdown(false);
  }, [showMenu]);

  useEffect(() => {
    window.addEventListener('resize', () => { if (window.innerWidth >= 640) setShowMenu(false); });

    return () => {
      window.removeEventListener('resize', () => { if (window.innerWidth >= 640) setShowMenu(false); });
    };
  }, []);

  const handleLogout = () => {
    setAuth(prevAuth => (
      {
        ...prevAuth,
        user: null,
        token: ""
      }
    ));
    localStorage.removeItem("auth");
  };

  const handleDropdown = () => {
    setDropdown(prev => !prev);
  };

  const handleSearch = (e) => {
    if (e.code === "Enter") setSearch(searchValue);
  };

  const handleMenu = () => setShowMenu(prev => !prev);

  return (
    <nav className="bg-[#F6F5F5] p-4 w-full flex justify-center font-poppins fixed z-10 shadow-sm text-[#1B262C]">
      <div className="w-full m-0 flex justify-between items-center relative">
        <Link to="/" className="flex gap-4 items-center text-2xl font-bold font-poppins">
          <BsCart4 />
          SwiftCart
        </Link>

        <FaBars
          onClick={handleMenu}
          className="text-2xl m-0 p-0 sm:hidden cursor-pointer" />

        <ul className={`${showMenu ? "absolute flex flex-col space-y-3 pb-3 top-[6.47vh] left-[-4vw] right-[-4vw] m-0 bg-[#e5e7ea] shadow-md" : "hidden"} text-center sm:bg-transparent sm:flex sm:space-x-4 sm:items-center sm:relative sm:top-0 sm:w-fit`}>
          <li>
            <input type="text" className="text-center sm:rounded-lg sm:block w-full border border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={handleSearch}
            />
          </li>
          <NavLink
            to="/"
            className="py-2 blockd transition duration-300 relative group"
          >
            <li>
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </li>
          </NavLink>

          {!auth.user ? (
            <>
              <NavLink
                to="/register"
                className="py-2 blockd transition duration-300 relative group"
              >
                <li>
                  Sign Up
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </li>
              </NavLink>
              <NavLink
                to="/login"
                className="py-2 blockd transition duration-300 relative group"
              >
                <li>
                  Login
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </li>
              </NavLink>

            </>
          ) : (
            <div className='flex items-center relative'>
              <button onClick={handleDropdown} className="w-full py-2d transition duration-300 group">
                {auth.user.name.charAt(0).toUpperCase() + auth.user.name.slice(1)}
                <span className="absolute bottom-[-0.9vh] left-0 w-full h-[2px] bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </button>
              <ul className={`${!dropdown ? "hidden" : "absolute bg-white rounded-md shadow-md mt-2 top-6 left-0 right-0 sm:right-auto"} transition duration-500 z-10`}>
                <li>
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="text-gray-800d py-2 px-4 block relative hover:bg-gray-100"
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent transition-all duration-300"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="text-gray-800d py-2 px-4 block relative hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent transition-all duration-300"></span>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <NavLink
            to="/cart"
            className="py-2 blockd transition duration-400 relative group"
          >
            <li>
              Cart({cart.length})
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </li>
          </NavLink>

        </ul>
      </div>
    </nav>
  );
};

export default Header;
