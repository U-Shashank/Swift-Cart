import React from 'react'
import { useAuth } from '../../../context/auth'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
    <div className='flex h-full'>
      <UserMenu />
      <div className='bg-red-100 flex-grow text-center my-auto'>
        <h2 className='bg-white'>{auth.user.name}</h2>
      </div>
    </div>
    </Layout>
  )
}

export default Dashboard