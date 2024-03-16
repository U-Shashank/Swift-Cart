import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Login = () => {
    const [auth, setAuth] = useAuth()

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleChange = e => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const loginUser = async (userData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/login`, userData)
            setAuth(prevAuth => ({
                ...prevAuth,
                user: response.data.user,
                token: response.data.token
            }))
            localStorage.setItem("auth", JSON.stringify({
                user: response.data.user,
                token: response.data.token
            }))
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        loginUser(data)
    }

    return (
        <Layout>
            <div className='h-full w-full flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='bg-gray-100 p-8 rounded-md shadow-md'>
                    <h1 className='text-center text-gray-800 font-playfair text-4xl mb-6'>Welcome</h1>
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
                    <button
                        type="submit"
                        className='w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600 transition duration-200 focus:outline-none'
                    >
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
