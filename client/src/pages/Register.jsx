import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'

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
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = e => {
        console.log(e)
        e.preventDefault()
        if(data.password !== e.target[3]) alert("fghj")
        postUser(data)
    }

    return (
        <Layout>
            <div className='h-full w-full flex'>
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
                    Submit
                </button>
            </form>
            </div>
        </Layout>
    )
}

export default Register