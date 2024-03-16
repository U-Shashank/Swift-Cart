import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";
import { useAuth } from '../../../context/auth';
import { useSearch } from '../../../context/search';
import { useCart } from '../../../context/cart';
import { FaBars } from "react-icons/fa";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [setSearch] = useSearch();
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cart] = useCart()


  useEffect(() => {
    if (!showMenu) setDropdown(false)
  }, [showMenu])

  useEffect(() => {
    window.addEventListener('resize', () => { if (window.innerWidth >= 640) setShowMenu(false) });

    return () => {
      window.removeEventListener('resize', () => { if (window.innerWidth >= 640) setShowMenu(false) });
    };
  }, [])

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
    if (e.code === "Enter") setSearch(searchValue)
  }

  const handleMenu = () => setShowMenu(prev => !prev)

  return (
    <nav className="bg-gradient-to-r from-red-400 to-yellow-500 p-4 w-full flex justify-center font-poppins">
      <div className="w-full m-0 flex justify-between items-center relative">
        <Link to="/" className="flex gap-4 items-center text-2xl font-bold text-white font-poppins">
          <BsCart4 />
          SwiftCart
        </Link>

        <FaBars
          onClick={handleMenu}
          className="text-2xl m-0 p-0 text-white sm:hidden cursor-pointer" />

        <ul className={`${showMenu ? "absolute flex flex-col top-[6.47vh] m-0 w-full bg-gradient-to-r from-red-400 to-yellow-500" : "hidden"} text-center sm:bg-transparent sm:flex sm:space-x-4 sm:items-center sm:relative sm:top-0 sm:w-fit`}>
          <li>
            <input type="text" className="text-center sm:rounded-lg sm:block w-full border border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              onKeyDown={handleSearch}
            />
          </li>
          <li>
            <NavLink
              to="/"
              className="text-white py-2 block hover:text-yellow-300 transition duration-300"
            >
              Home
            </NavLink>
          </li>

          {!auth.user ? (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="text-white py-2 block hover:text-yellow-300 transition duration-300"
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="text-white py-2 block hover:text-yellow-300 transition duration-300"
                >
                  Login
                </NavLink>
              </li>

            </>
          ) : (
            <div className='flex items-center relative'>
              <button onClick={handleDropdown} className="text-white w-full py-2 hover:text-yellow-300 transition duration-300">
                {auth.user.name}
              </button>
              <ul className={`${!dropdown ? "hidden" : "absolute bg-white rounded-md shadow-md mt-2 top-8 left-0 right-0 sm:right-auto"} transition duration-500`}>
                <li>
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="text-gray-800 hover:text-yellow-300 py-2 px-4 block"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="text-gray-800 hover:text-yellow-300 py-2 px-4 block"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <li>
            <NavLink
              to="/cart"
              className="text-white py-2 block hover:text-yellow-300 transition duration-400"            >
              Cart({cart.length})
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
