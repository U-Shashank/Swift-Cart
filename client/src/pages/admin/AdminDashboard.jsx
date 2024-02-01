import React from 'react'
import { useAuth } from '../../../context/auth'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
    <div className='flex h-full'>
      <AdminMenu />
      <div className='bg-red-100 flex-grow text-center my-auto'>
        <h2 className='bg-white'>{auth.user.name}</h2>
      </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard