import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";
import { useAuth } from '../../../context/auth';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [dropdown, setDropdown] = useState(false);

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

  return (
    <nav className="bg-gradient-to-r from-red-400 to-yellow-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex gap-4 items-center text-2xl font-bold text-white">
          <BsCart4 />
          SwiftCart
        </Link>

        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className="text-white hover:text-yellow-300 transition duration-300"

            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Category
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <div className='flex items-center relative'>
              <button onClick={handleDropdown} className="text-white hover:text-yellow-300 transition duration-300">
                {auth.user.name}
              </button>
              <ul className={`${!dropdown ? "hidden" : "absolute bg-white rounded-md shadow-md mt-2 top-10 left-0"}`}>
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
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Cart(0)
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
