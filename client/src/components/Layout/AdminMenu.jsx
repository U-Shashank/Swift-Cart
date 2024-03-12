import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="bg-gray-200 p-4 w-1/4">
      <NavLink
        to="/dashboard/admin/create-category"
        className="block mb-2 text-gray-700 hover:text-blue-500"
      >
        Create Category
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-product"
        className="block mb-2 text-gray-700 hover:text-blue-500"
      >
        Create Product
      </NavLink>
      <NavLink
        to="/dashboard/admin/products"
        className="block mb-2 text-gray-700 hover:text-blue-500"
      >
        Products
      </NavLink>
      <NavLink
        to="/dashboard/admin/orders"
        className="block text-gray-700 hover:text-blue-500"
      >
        Orders
      </NavLink>
    </div>
  );
};

export default AdminMenu;
