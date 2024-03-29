import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import CategoryForm from '../../components/Forms/CategoryForm'
import Modal from 'react-modal'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    Modal.setAppElement('#root');
    getAllCategory();
  }, []);

  const addCategory = async (name) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/category`, {
        name
      });
      getAllCategory();
      toast.success("category created")
    } catch (error) {
      toast.error("error")
      console.log(error);
    }
  };

  const updateCategory = async (id, name) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_HOST_URL}/category/${id}`, {
        name
      });
      console.log(res);
      getAllCategory();
      toast.success("category updated")
    } catch (error) {
      toast.error("error")
      console.log(error);
    }
  };
  
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_HOST_URL}/category/${id}`);
      console.log(res.data);
      getAllCategory();
      toast.success("category deleted")
    } catch (error) {
      toast.error("error")
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/category`);
      console.log(res.data);
      if (res.data.category) setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (category) => {
    console.log(category);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory({});
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex h-full">
        <AdminMenu />
        <div className="min-w-2xl sm:w-full mx-auto p-5 text-white">
          <CategoryForm handleSubmit={addCategory} />
          <table className="min-w-full divide-y divide-[#3282B8] mt-10">
            <thead className="bg-[#0F4C75]">
              <tr>
                <th className="py-2 px-4 font-semibold text-center">Category</th>
                <th className="py-2 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B262C] max-h-[300px] overflow-scroll">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="py-2 px-4 text-center">{category.name}</td>
                  <td className="py-2 px-4 text-center">
                    <button onClick={() => openModal(category)} className="bg-[#3282B8] hover:bg-[#0F4C75] text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                    <button onClick={() => deleteCategory(category._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Update Category"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1B262C] p-6 border border-[#3282B8] rounded-md shadow-md sm:w-1/2 flex flex-col space-y-4 items-center text-white"
            overlayClassName="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80"
          >
            <h2 className="text-2xl font-bold mb-4">Update Category</h2>
            <CategoryForm handleSubmit={(name) => updateCategory(selectedCategory._id, name)} name={selectedCategory.name} />
            <button className="bg-red-500 hover:bg-red-700 w-[150px] text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
              Cancel
            </button>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
