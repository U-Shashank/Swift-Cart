import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllProducts()
  }, []);

  useEffect(() => {
    getAllProducts()
  }, [checked])

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/category`);
      console.log(res.data);
      if (res.data.category) setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const categoryQuery = checked.length ? `?category=${checked.join(',')}` : ''
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product${categoryQuery}`)
      setProducts(data.product)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const categoryId = e.target.value;

    if (checked.includes(categoryId)) {
      setChecked(checked.filter((id) => id !== categoryId));
    } else {
      setChecked([...checked, categoryId]);
    }
  };

  return (
    <Layout>
      <div className='flex justify-between p-8'>
        <div className='flex flex-col space-y-4'>
          {categories.map((category) => (
            <div key={category._id} className='flex items-center'>
              <input
                id={`category-${category._id}`}
                type='checkbox'
                value={category._id}
                checked={checked.includes(category._id)}
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor={`category-${category._id}`} className='text-gray-800'>
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 w-full justify-items-center'>
          {
            products.map((product) => (
              <Link to={`/dashboard/admin/product/${product.slug}`}>
              <div className="max-w-xs w-full rounded overflow-hidden shadow-lg bg-white my-2" key={product._id}>
                <img className="w-full h-48 object-cover" src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} alt="Product Image" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.name}</div>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <span className="text-gray-700">Price:</span>
                  <span className="font-bold text-xl flex items-center"><LiaRupeeSignSolid />{product.price}</span>
                </div>
              </div>
              </Link>
            ))
          }
        </div>
      </div>
    </Layout>
  );
};

export default Home;
