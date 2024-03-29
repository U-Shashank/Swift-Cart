import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="bg-yellow-500 font-poppins p-4 min-w-[100px] h-full text-sm sm:text-lg">
      <NavLink
        to="/dashboard/admin/create-category"
        className="block mb-2 text-[#0F4C75] font-semibold hover:bg-[#3282B8] hover:text-white transition duration-200 px-4 py-2 rounded"
      >
        Create Category
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-product"
        className="block mb-2 text-[#0F4C75] font-semibold hover:bg-[#3282B8] hover:text-white transition duration-200 px-4 py-2 rounded"
      >
        Create Product
      </NavLink>
      <NavLink
        to="/dashboard/admin/products"
        className="block mb-2 text-[#0F4C75] font-semibold hover:bg-[#3282B8] hover:text-white transition duration-200 px-4 py-2 rounded"
      >
        Products
      </NavLink>
      <NavLink
        to="/dashboard/admin/orders"
        className="block text-[#0F4C75] font-semibold hover:bg-[#3282B8] hover:text-white transition duration-200 px-4 py-2 rounded"
      >
        Orders
      </NavLink>
    </div>
  );
};

export default AdminMenu;
