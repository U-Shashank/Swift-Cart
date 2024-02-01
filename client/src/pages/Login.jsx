import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Login = () => {

    const [auth, setAuth] = useAuth()

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

    const loginUser = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/login`, data)
            setAuth(prevAuth => ({
                ... prevAuth,
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
            <div className='h-full w-full flex'>
            <form onSubmit={handleSubmit} className='register'>
                <h1 className='text-center text-gray-100 font-playfair text-5xl'>Welcome</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    />
                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                />
                <button className='bg-gray-200 rounded-md py-2 hover:bg-gray-800 hover:text-gray-200 transition duration-200'>
                    Login
                </button>
            </form>
            </div>
        </Layout>
    )
}

export default Login