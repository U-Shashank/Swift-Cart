import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    })

    const handleChange = e => {
        setData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const postUser = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/register`, data)
            console.log(response)
            toast.success('Registered successfully')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(data.password !== e.target[3].value) {
            alert("Passwords do not match")
            return
        }
        postUser(data)
    }

    return (
        <Layout>
            <div className='h-full w-full flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='bg-gray-100 p-8 rounded-md shadow-md max-w-[60vh]'>
                    <h1 className='text-center text-gray-800 font-playfair text-4xl mb-6'>Register</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        className='w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        className='w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        className='w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        onChange={handleChange}
                        className='w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        name='address'
                        value={data.address}
                        onChange={handleChange}
                        className='w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        name='phone'
                        value={data.phone}
                        onChange={handleChange}
                        className='w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <button className='w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600 transition duration-200 focus:outline-none'>
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Register
