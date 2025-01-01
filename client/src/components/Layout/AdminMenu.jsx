// AdminMenu.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  FolderPlus,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const AdminMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      to: "/dashboard/admin/create-category",
      icon: <FolderPlus size={20} />,
      label: "Create Category"
    },
    {
      to: "/dashboard/admin/create-product",
      icon: <Package size={20} />,
      label: "Create Product"
    },
    {
      to: "/dashboard/admin/products",
      icon: <LayoutGrid size={20} />,
      label: "Products"
    },
    {
      to: "/dashboard/admin/orders",
      icon: <ShoppingCart size={20} />,
      label: "Orders"
    }
  ];

  return (
    <div className="relative lg:min-h-screen">
      {/* Secondary Header for Admin Section */}
      <div className="lg:hidden sticky bg-white shadow-md z-30 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Admin Dashboard
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
          aria-label="Toggle admin menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        bg-gradient-to-b from-blue-50 to-blue-100
        lg:sticky
        fixed 
        left-0
        top-0
        bottom-0
        shadow-lg 
        transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-72
        z-20
        overflow-y-auto
        flex flex-col justify-center
      `}>
        <div className="hidden lg:block p-6">
          <h2 className="text-xl font-bold text-gray-800">
            Admin Dashboard
          </h2>
        </div>
        <nav className="space-y-2 p-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center justify-between
                px-4 py-3 rounded-lg
                transition-all duration-200
                ${isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-blue-100'
                }
              `}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </span>
              <ChevronRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminMenu;