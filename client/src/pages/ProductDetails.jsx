import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from '../../context/cart'

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
      <div className='bg-red-100 w-full h-full flex flex-col justify-between p-4'>
        <div className='flex justify-center'>
          <img src={`${import.meta.env.VITE_HOST_URL}/product/photo/${product._id}`} className='max-w-full max-h-64' />
        </div>
        <div className='text-center'>
          <h5 className='text-lg font-semibold'>{product.name}</h5>
          <p className='text-sm text-gray-700'>{product.description}</p>
          <p className='text-gray-900 font-bold'>Price: ${product.price}</p>
          <p className='text-gray-700'>Category: {product.category?.name}</p>
          <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={(e) => {
              e.preventDefault()
              setCart((prev) => ([
                ...prev,
                product
              ]))
              localStorage.setItem('cart', JSON.stringify([...cart, product]))
            }}>ADD TO CART</button>
        </div>
        <div className='mt-8'>
          <h2 className='text-lg font-semibold'>Similar Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {similarProducts.map((product) => (
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
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        </div>
      </div>
    </Layout>


  )
}

export default ProductDetails