import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import ProductForm from '../../components/Forms/ProductForm'
import axios from 'axios'
import { useNavigate ,useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [productData, setProductData] = useState({})

    useEffect(() => {
        getProduct()
    }, [])

    const updateProduct = async (data, id) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_HOST_URL}/product/${id}`,
                data,
                {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_HOST_URL}/product/${id}`)
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error);
        }
    }

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/product/${params.slug}`)
            console.log(data.product)
            setProductData(data.product)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        loading
        ?
        <p>Loading...</p>
        :
        <Layout>
            <div className='flex h-full'>
                <AdminMenu />
                <ProductForm
                    handleSubmit={(data) => updateProduct(data, productData._id)}
                    productData={productData}
                    deleteProduct={() => deleteProduct(productData._id)}
                />
            </div>
        </Layout>
    )
}

export default UpdateProduct