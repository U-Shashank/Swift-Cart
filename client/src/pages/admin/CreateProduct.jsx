import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import ProductForm from '../../components/Forms/ProductForm'
import axios from 'axios'

const CreateProduct = () => {
  const addProduct = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/product`,
        data, 
        {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        console.log(res);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Layout>
    <div className='flex h-full'>
      <AdminMenu />
      <ProductForm handleSubmit={addProduct} />
    </div>
    </Layout>
  )
}

export default CreateProduct