import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-center h-screen'>
      <div className='w-100 text-center bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg'>
        <h1 className='text-4xl text-red-600'>404</h1>
        <h2 className='text-3xl text-gray-600'>Page not found ☠️ </h2>
        <div className="text-center py-4">
            <span>Lost 😯 don't worry <Link className='text-red-500' to="/">click me 😊</Link></span>
          </div>
      </div>
      </div>
    </div>
  )
}

export default PageNotFound