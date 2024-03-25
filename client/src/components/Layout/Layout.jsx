import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header />
      <main className='from-[#0F4C75] to-[#F6F5F5]  flex-grow mt-[8.5vh]'>
      {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout