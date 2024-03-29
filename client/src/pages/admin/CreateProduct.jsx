import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import ProductForm from '../../components/Forms/ProductForm'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const CreateProduct = () => {
  const addProduct = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/product`, data, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });
      toast.success("product created")
    } catch (error) {
      toast.error(error.request.statusText)
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex h-full">
        <AdminMenu />
        <div className="min-w-2xl sm:w-full self-center mx-auto p-5 text-white">
          <ProductForm handleSubmit={addProduct} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
