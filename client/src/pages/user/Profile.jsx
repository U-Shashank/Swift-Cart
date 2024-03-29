import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../../context/auth'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Profile = () => {

  const [auth] = useAuth()
  const {user, token} = auth
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    address: user.address,
    phone: user.phone
})

const handleChange = e => {
    setData(prevData => {
        return {
            ...prevData,
            [e.target.name]: e.target.value
        }
    })
}

const updateUser = async (data) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_HOST_URL}/auth/update-user`, data)
        toast.success("updated successfully")        
    } catch (error) {
        toast.error(error.request.statusText)        
        console.log(error)
    }
}

const handleSubmit = e => {
    e.preventDefault()
    // if(data.password !== e.target[3]) alert("Password and Confirm Password did not match")
    updateUser(data)
}

  return (
    <Layout>
    <div className='flex h-full'>
      <UserMenu />
      <div className='container m-auto p-5 text-[#3282B8] overflow-auto'>
        <h1 className="text-center text-xl font-bold mb-4 text-[#0F4C75]">Profile</h1>
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit m-auto min-w-[340px]'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              name='name'
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name='email'
              value={data.email}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              name='password'
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="address"
              placeholder="Address"
              name='address'
              value={data.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Phone Number"
              name='phone'
              value={data.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#3282B8] hover:bg-[#4a90e2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  )
}

export default Profile
