import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { useSearch } from '../../context/search';
import { useCart } from '../../context/cart';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [search] = useSearch()

  const [cart, setCart] = useCart()

  useEffect(() => {
    getAllCategory();
    getAllProducts()
  }, []);

  useEffect(() => {
    getAllProducts()
  }, [checked, minPrice, maxPrice])

  useEffect(() => {
    getAllProducts()
  }, [page, search])

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
      const categoryQuery = checked.length ? `category=${checked.join(',')}` : ''
      const minPriceQuery = minPrice ? `price>=${minPrice},` : ''
      const maxPriceQuery = maxPrice ? `price<=${maxPrice},` : ''
      const searchQuery = search ? `name=${search}` : ''
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product?${categoryQuery}&${(minPrice || maxPrice) ? "numericFilters=" : ""}${minPrice ? minPriceQuery : ""}${maxPrice ? maxPriceQuery : ""}&page=${page}&${search ? searchQuery : ""}`)
      setProducts(data.product)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {

      const categoryId = e.target.value;

      if (checked.includes(categoryId)) {
        setChecked(checked.filter((id) => id !== categoryId));
      } else {
        setChecked([...checked, categoryId]);
      }
    }
    else {
      if (e.target.name === 'min') setMinPrice(e.target.value)
      else setMaxPrice(e.target.value)
    }
  }

  const handlePage = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <Layout>
      <div className='flex w-full h-full justify-between p-8 gap-4 bg-gradient-to-t'>
        <div className='flex flex-col space-y-4'>
          {categories.map((category) => (
            <div key={category._id} className='flex items-center mb-2'>
              <input
                id={`category-${category._id}`}
                type='checkbox'
                value={category._id}
                checked={checked.includes(category._id)}
                onChange={handleChange}
                className='form-checkbox h-5 w-5 text-indigo-600 mr-2'
              />
              <label
                htmlFor={`category-${category._id}`}
                className='text-gray-800 capitalize bg-gray-200 px-3 py-1 rounded-md border border-gray-300'
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </label>
            </div>
          ))}


          <div className='bg-gray-400/40 rounded-md p-4 flex flex-col gap-5'>
            <label htmlFor="min" className="text-gray-800 font-semibold">Min</label>
            <input
              className='rounded-md border-gray-300 border px-3 py-2'
              id='min'
              name='min'
              type="number"
              min={1}
              max={10000}
              value={minPrice}
              onChange={handleChange}
            />
            <label htmlFor="max" className="text-gray-800 font-semibold">Max</label>
            <input
              className='rounded-md border-gray-300 border px-3 py-2'
              id='max'
              name='max'
              type="number"
              min={1}
              max={10000}
              value={maxPrice}
              onChange={handleChange}
            />
          </div>

        </div>
        <div className='w-full flex flex-col items-center relative'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-items-center gap-5'>
            {
              products.map((product) => (
                <Link to={`/product/${product.slug}`} key={product._id}>
                  <div className="max-w-[250px] rounded overflow-hidden shadow-lg bg-white">
                    <img className="w-full h-48 object-cover" src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} alt="Product Image" />
                    <div className="px-6">
                      <div className="font-bold text-xl mb-2">{product.name}</div>
                    </div>
                    <div className="flex items-center px-6">
                      <span className="text-gray-700">Price:</span>
                      <span className="font-bold text-xl flex items-center"><LiaRupeeSignSolid />{product.price}</span>
                    </div>
                    <div className="px-6 py-4">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => {
                          e.preventDefault()
                          setCart((prev) => ([
                            ...prev,
                            product
                          ]))
                          localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))

            }
          </div>
          <button
            className='bg-yellow-300 hover:bg-yellow-400 text-indigo-400 font-bold rounded-lg text-xl px-4 py-2 mt-4 w-[150px] focus:outline-blue-800 focus:ring-2'
            onClick={handlePage}
          >
            Load More
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
