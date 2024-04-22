import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from '../../context/cart'
import { Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'

const ProductDetails = () => {

  const [product, setProduct] = useState({})
  const [similarProducts, setSimilarProducts] = useState([])
  const [cart, setCart] = useCart()
  const params = useParams()

  useEffect(() => {
    getProduct(params.slug)
    getSimilarProducts()
  }, [params.slug])

  const getProduct = async (slug) => {
    const { data } = await axios(`${import.meta.env.VITE_HOST_URL}/product/${slug}`)
    setProduct(data.product)
    getSimilarProducts(data.product._id, data.product.category._id)
    console.log(data.product);
  }

  const getSimilarProducts = async (pid, cid) => {
    const { data } = await axios(`${import.meta.env.VITE_HOST_URL}/product/${pid}/${cid}`)
    setSimilarProducts(data.product)
    console.log(data.product);
  }

  return (
    <Layout>
      <div className='w-full h-full flex flex-col justify-between p-4'>
        <div className='flex justify-center mb-8'>
          <img src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} className='max-w-full max-h-64 object-contain' />
        </div>
        <div className='text-center mx-8'>
          <h5 className='text-2xl text mb-2 font-playfair'>{product.name}</h5>
          <p className='text-gray-800 px-4'>{product.description}</p>
          <p className='text-gray-900 font-bold mt-4'>Price: ₹{product.price}</p>
          <p className='text-gray-800 mt-2'>Category: {product.category?.name}</p>
          <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={(e) => {
              e.preventDefault()
              setCart((prev) => ([
                ...prev,
                product
              ]))
              localStorage.setItem('cart', JSON.stringify([...cart, product]))
              toast.success("added to cart")
            }}>ADD TO CART</button>
        </div>
        <div className='mt-8'>
          <h2 className='text-xl font-medium mb-4'>Similar Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {similarProducts.map((product) => (
              <Link to={`/product/${product.slug}`} key={product._id}>
                <div className="max-w-[250px] rounded overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition duration-200">
                  <img className="w-full h-48 object-contain" src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} alt="Product Image" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <div className="flex items-center">
                      <span className="text-gray-800">Price:</span>
                      <span className="font-bold text-xl flex items-center ml-2">₹{product.price}</span>
                    </div>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                      onClick={(e) => {
                        e.preventDefault()
                        setCart((prev) => ([
                          ...prev,
                          product
                        ]))
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        toast.success("added to cart")
                      }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
