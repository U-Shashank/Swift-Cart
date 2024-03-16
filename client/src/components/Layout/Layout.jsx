import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header />
      <main className='bg-gradient-to-t from-[#d299c2] to-[#fef9d7] flex-grow'>
      {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout