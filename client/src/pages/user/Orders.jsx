import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout>
    <div className='flex h-full'>
      <UserMenu />
      <div className='bg-red-100 flex-grow text-center my-auto'>
        <h2 className='bg-white'>Orders</h2>
      </div>
    </div>
    </Layout>
  )
}

export default Orders