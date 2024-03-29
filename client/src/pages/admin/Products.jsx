import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product`);
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex h-full">
        <AdminMenu />
        <div className="min-w-2xl sm:w-full p-5 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link to={`/dashboard/admin/product/${product.slug}`} key={product._id}>
                <div className="max-w-[300px] h-[300px] w-full rounded overflow-y-auto overflow-x-hidden shadow-lg bg-white my-2 flex flex-col justify-between">
                  <img className="w-full h-48 object-cover" src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} alt="Product Image" />
                  <div className="px-6 pt-2">
                    <div className="font-bold text-xl mb-2 text-[#0F4C75]">{product.name}</div>
                  </div>
                  <div className='flex justify-between'>
                  <div className="px-6 flex items-center">
                    <span className="text-gray-700">Price:</span>
                    <span className="font-bold text-xl flex items-center text-[#3282B8]"><LiaRupeeSignSolid />{product.price}</span>
                  </div>
                  <div className="px-6 pb-2">
                    <span className="inline-block bg-[#3282B8] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.category.name}
                    </span>
                  </div>
                  </div>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
