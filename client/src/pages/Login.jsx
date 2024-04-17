import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form";

const Login = () => {
    const [auth, setAuth] = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const form = useForm()
    const {register, handleSubmit, formState} = form
    const {errors} = formState

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
            navigate(location.state || "/");
            toast.success('Successfully logged in')

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    const onSubmit = data => {
        loginUser(data)
    }

    return (
        <Layout>
            <div className='h-full w-full flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 p-8 rounded-md shadow-md'>
                    <h1 className='text-center text-gray-800 font-playfair text-4xl mb-6'>Welcome</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            }
                        })}
                        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <p className='text-red-400 mb-4'>{errors.email?.message}</p>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            }
                        })}
                        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                    />
                    <p className='text-red-400 mb-4'>{errors.password?.message}</p>
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
