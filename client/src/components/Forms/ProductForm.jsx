import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InputField = ({ type, name, value, onChange, placeholder, className = '' }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
  />
);

const SelectField = ({ name, value, onChange, options, placeholder, className = '' }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const ProductForm = ({ handleSubmit, productData, deleteProduct }) => {
  const initialFormData = {
    category: productData?.category._id || '',
    photo: null,
    price: productData?.price || '',
    name: productData?.name || '',
    description: productData?.description || '',
    quantity: productData?.quantity || '',
    shipping: productData?.shipping || '',
  };

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(
    productData?.photo ? `${import.meta.env.VITE_HOST_URL}/product/photo/${productData?._id}` : null
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/category`);
      if (data.category) setCategories(data.category);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataObject = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataObject.append(key, value);
      }
    });

    handleSubmit(formDataObject);
    setFormData(initialFormData);
    setPreviewImage(null);
  };

  const shippingOptions = [
    { value: '1', label: 'YES' },
    { value: '0', label: 'NO' }
  ];

  return (
    <form onSubmit={handleFormSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Category Selection */}
        <div>
          <SelectField
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
            placeholder="Select Category"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Photo
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={previewImage}
              alt="Product preview"
              className="w-full h-full object-cover rounded-md border border-gray-300"
            />
          </div>
        )}

        {/* Product Details */}
        <InputField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <InputField
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm min-h-[100px]"
        />

        <InputField
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />

        <SelectField
          name="shipping"
          value={formData.shipping}
          onChange={handleChange}
          options={shippingOptions}
          placeholder="Shipping Option"
        />

        {/* Buttons */}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {productData?._id ? "Update Product" : "Create Product"}
        </button>

        {deleteProduct && (
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteProduct();
            }}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;