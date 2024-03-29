import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../../context/auth'
import axios from 'axios'

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
        console.log(response)
        
    } catch (error) {
        console.log(error)
    }
}

const handleSubmit = e => {
    console.log(e)
    e.preventDefault()
    // if(data.password !== e.target[3]) alert("Password and Confirm Password did not match")
    updateUser(data)
}

  return (
    <Layout>
    <div className='flex h-full'>
      <UserMenu />
      <div className='h-full w-full flex ml-[20%]'>
            <form onSubmit={handleSubmit} className='register'>
                <input
                    type="text"
                    placeholder="Name"
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    />
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    disabled
                    />
                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    />
                <input
                    type="address"
                    placeholder="Address"
                    name='address'
                    value={data.address}
                    onChange={handleChange}
                    />
                <input
                    type="text"
                    placeholder="Phone Number"
                    name='phone'
                    value={data.phone}
                    onChange={handleChange}
                    />
                <button className='bg-gray-200 rounded-md py-2 hover:bg-gray-800 hover:text-gray-200 transition duration-200'>
                    Update
                </button>
            </form>
            </div>
    </div>
    </Layout>
  )
}

export default Profile