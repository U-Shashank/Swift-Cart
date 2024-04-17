import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const form = useForm()
    const {register, handleSubmit, getValues, formState} = form
    const {errors} = formState

    const postUser = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/register`, data)
            console.log(response)
            toast.success('Registered successfully')
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    const onSubmit = data => {
        delete data.confirmPassword
        postUser(data)
    }

    return (
        <Layout>
            <div className='h-full w-full flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 p-8 rounded-md shadow-md max-w-[60vh]'>
                    <h1 className='text-center text-gray-800 font-playfair text-4xl mb-6'>Register</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        {... register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            }
                        })}
                        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                        />
                    <p className='text-red-400 mb-4'>{errors.name?.message}</p>

                    <input
                        type="email"
                        placeholder="Email"
                        {... register("email", {
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
                        {... register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            }
                        })}
                        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                        />
                    <p className='text-red-400 mb-4'>{errors.password?.message}</p>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {... register("confirmPassword", {
                            validate: value => value === getValues("password") || "confirm password and password do not match"
                        })}
                        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                        />
                    <p className='text-red-400 mb-4'>{errors.confirmPassword?.message}</p>
                    <input
                        type="text"
                        placeholder="Address"
                        {... register("address")}
                        className='w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500'
                        />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        {... register("phone")}
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
