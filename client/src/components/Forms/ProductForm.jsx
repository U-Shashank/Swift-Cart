import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    <div className='max-w-md mx-auto p-4 bg-white rounded-md shadow-md'>
      <div className='mb-4'>
        <select
          className='w-full p-2 border rounded-md'
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
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='photo'>
          Upload Photo
        </label>
        <input
          className='w-full p-2 border rounded-md'
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
          className='w-full p-2 border rounded-md'
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
        />
      </div>
      <div className='mb-4'>
        <input
          className='w-full p-2 border rounded-md'
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          placeholder='Price'
        />
      </div>
      <div className='mb-4'>
        <textarea
          className='w-full p-2 border rounded-md'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
        ></textarea>
      </div>
      <div className='mb-4'>
        <input
          className='w-full p-2 border rounded-md'
          type='number'
          name='quantity'
          value={formData.quantity}
          onChange={handleChange}
          placeholder='Quantity'
        />
      </div>
      <div className='mb-4'>
        <select
          className='w-full p-2 border rounded-md'
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
        className='bg-blue-500 w-full text-lg py-1 rounded-lg hover:bg-blue-400'>
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
        className='bg-red-500 w-full text-lg py-1 rounded-lg hover:bg-red-400 mt-1'>
        DELETE
      </button>
      :
      null
      }
    </div>
  );
};

export default ProductForm;
