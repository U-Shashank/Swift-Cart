import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import CategoryForm from '../../components/Forms/CategoryForm';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from '../../components/Modal';
import { Pencil, Trash2 } from 'lucide-react';

const CategoryTable = ({ categories, onEdit, onDelete }) => (
  <div className="mt-6 overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-left">Category</th>
          <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {categories.map((category) => (
          <motion.tr 
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hover:bg-gray-50 transition-colors"
          >
            <td className="py-3 px-4 text-gray-800">{category.name}</td>
            <td className="py-3 px-4 text-right">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(category)}
                className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mr-2 transition duration-200"
              >
                <Pencil size={16} className="mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(category._id)}
                className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                <Trash2 size={16} className="mr-1" />
                <span className="hidden sm:inline">Delete</span>
              </motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/category`);
      if (data.category) setCategories(data.category);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (name) => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_HOST_URL}/category`, { name });
      await fetchCategories();
      toast.success('Category created successfully');
    } catch (error) {
      toast.error('Failed to create category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (name) => {
    try {
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_HOST_URL}/category/${selectedCategory._id}`, { name });
      await fetchCategories();
      toast.success('Category updated successfully');
      setIsModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      toast.error('Failed to update category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_HOST_URL}/category/${id}`);
      await fetchCategories();
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50">
        <AdminMenu />
        <div className="flex-1 p-4 lg:p-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-2xl p-6 lg:p-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Category Management
              </h1>
              <div className="h-1 w-20 bg-blue-500"></div>
            </motion.div>
            
            <div className="max-w-md mb-8">
              <CategoryForm handleSubmit={handleAddCategory} buttonText="Add Category" />
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <CategoryTable
                categories={categories}
                onEdit={(category) => {
                  setSelectedCategory(category);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteCategory}
              />
            )}
          </motion.div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCategory(null);
            }}
            title="Update Category"
          >
            <CategoryForm
              handleSubmit={handleUpdateCategory}
              name={selectedCategory?.name}
              buttonText="Update"
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryManagement;