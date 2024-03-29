import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="bg-yellow-500 p-4 w-1/4 min-w-[200px] max-w-[400px] h-screen font-poppins">
      <NavLink
        to="/dashboard/user/profile"
        className="block mb-2 text-[#0F4C75] font-semibold hover:bg-[#3282B8] hover:text-white transition duration-200 px-4 py-2 rounded"
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/user/orders"
        className="block mb-2 text-[#0F4C75] font-semibold hover:bg-[#3282B8] hover:text-white transition duration-200 px-4 py-2 rounded"
      >
        Orders
      </NavLink>
    </div>
  );
};

export default UserMenu;
