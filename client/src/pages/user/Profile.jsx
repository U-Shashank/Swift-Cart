import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Profile = () => {
  return (
    <Layout>
    <div className='flex h-full'>
      <UserMenu />
      <div className='bg-red-100 flex-grow text-center my-auto'>
        <h2 className='bg-white'>Profile</h2>
      </div>
    </div>
    </Layout>
  )
}

export default Profile