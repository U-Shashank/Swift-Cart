import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getAllProducts()
  }, [])
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product`)
      setProducts(data.product)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='flex h-full'>
        <AdminMenu />
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
  )
}

export default Products