import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductForm = ({ handleSubmit, productData, deleteProduct }) => {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState(productData?._id
    ?
    {
      category: productData?.category._id,
      photo: null,
      price: productData?.price,
      name: productData?.name,
      description: productData?.description,
      quantity: productData?.quantity,
      shipping: productData?.shipping,
    }
    :
    {
      category: '',
      photo: null,
      price: '',
      name: '',
      description: '',
      quantity: '',
      shipping: '',
    })

  useEffect(() => {
    getAllCategory()
  }, [])

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/category`);
      if (res.data.category) setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }))
  }

  return (
    <div className='max-w-[300px] h-fit mx-auto p-6 text-black bg-white rounded-lg shadow-2xl self-center'>
      <div className='mb-4 text-black'>
        <select
          className='w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          name='category'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='' disabled>
            Select Category
          </option>
          {categories.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700' htmlFor='photo'>
          Upload Photo
        </label>
        <input
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          type='file'
          name='photo'
          accept='image/*'
          onChange={handleChange}
        />
      </div>
      {formData.photo
        ?
        <div className='mb-4'>
          <img
            className='w-[140px] aspect-square border rounded-md'
            src={URL.createObjectURL(formData.photo)}
            alt='Selected'
          />
        </div>
        :
        productData?.photo
        ?
        <div className='mb-4'>
          <img
            className='w-[140px] aspect-square border rounded-md'
            src={`${import.meta.env.VITE_HOST_URL}/product/photo/${productData?._id}`}
            alt='Selected'
          />
        </div>
        :
        null
      }
      <div className='mb-4'>
        <input
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
        />
      </div>
      <div className='mb-4'>
        <input
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          placeholder='Price'
        />
      </div>
      <div className='mb-4'>
        <textarea
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
        ></textarea>
      </div>
      <div className='mb-4'>
        <input
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          type='number'
          name='quantity'
          value={formData.quantity}
          onChange={handleChange}
          placeholder='Quantity'
        />
      </div>
      <div className='mb-4'>
        <select
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          name='shipping'
          value={formData.shipping}
          onChange={handleChange}
        >
          <option value='' disabled>
            Shipping Option
          </option>
          <option value='1'>YES</option>
          <option value='0'>NO</option>
        </select>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault()
          const formDataObject = new FormData();

          Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) {
              formDataObject.append(key, formData[key]);
            }
          });

          handleSubmit(formDataObject)
          setFormData({
            category: '',
            photo: null,
            price: '',
            name: '',
            description: '',
            quantity: '',
            shipping: '',
          })
        }}
        type='submit'
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        {productData?._id ? "UPDATE" : "CREATE"}
      </button>
      {
        deleteProduct
        ?
        <button
        onClick={(e) => {
          e.preventDefault()
          deleteProduct()
        }}
        type='submit'
        className='mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
        DELETE
      </button>
      :
      null
      }
    </div>
  );
};

export default ProductForm;
