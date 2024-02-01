import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout>
    <div className='flex h-full'>
      <AdminMenu />
      <div className='bg-red-100 flex-grow text-center my-auto'>
        <h2 className='bg-white'>Users</h2>
      </div>
    </div>
    </Layout>
  )
}

export default Users