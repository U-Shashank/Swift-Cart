import React from 'react'
import { useAuth } from '../../../context/auth'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const AdminDashboard = () => {
  const [auth] = useAuth()
  const name = auth.user.name.toLocaleLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return (
    <Layout>
      <div className='flex h-full'>
        <AdminMenu />
        <div className='flex w-fit h-fit m-auto'>
          <div className='bg-white shadow-md p-6 rounded-lg'>
            <h2 className='text-4xl font-playfair font-semibold mb-4 text-center'>{name}</h2>
            <p className='text-gray-600 font-poppins pb-2 text-xl'>{auth.user.email}</p>
            <p className='text-gray-600 font-poppins pb-2 text-xl'>{auth.user.phone}</p>
            <p className='text-gray-600 font-poppins pb-2 text-xl'>{auth.user.address}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
