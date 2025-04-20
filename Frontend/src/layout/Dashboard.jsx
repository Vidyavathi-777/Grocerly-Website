import React from 'react'
import UserMenu from '../component/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex"> {/* Changed section to div and added flex to the container */}
      <aside className="bg-white w-64 p-4 shadow-md hidden md:block">
        {/* Make the aside take up fixed width */}
        
        <UserMenu />
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {/* main takes remaining space and is scrollable */}
        
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
