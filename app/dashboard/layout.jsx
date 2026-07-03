import React from 'react'
import Sidebar from './_components/Sidebar'
import DashboardHeader from './_components/DashboardHeader'

const Dashboardlayout = ({children}) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/5'>
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className='md:w-64 hidden md:block fixed'> 
        <Sidebar/>
      </div>

      <div className='md:ml-64 relative z-10'>
        <DashboardHeader/>
        <div className='p-6'>{children}</div>
      </div>
    </div>
  )
}

export default Dashboardlayout
