import React from 'react'
import UserMenu from '../component/UserMenu'
import { Outlet } from 'react-router-dom'


const Dashboard = () => {
  
  return (
    <section className='bg-gray-100 '>
      <div className='bg-gray-100 min-h-screen flex'>
        <div className=' bg-white w-64 p-4 sticky top-24 overflow-y-auto hidden lg:block border-r'>
          <UserMenu />
        </div>
        <div className=' flex-1 p-6 overflow-y-auto'>
          <Outlet />

        </div>

      </div>
    </section>
  )

  
}

export default Dashboard
