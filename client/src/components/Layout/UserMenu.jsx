import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="bg-gray-200 p-4 w-1/4">
      <NavLink
        to="/dashboard/user/profile"
        className="block mb-2 text-gray-700 hover:text-blue-500"
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/user/orders"
        className="block mb-2 text-gray-700 hover:text-blue-500"
      >
        Orders
      </NavLink>
    </div>
  );
};

export default UserMenu;
