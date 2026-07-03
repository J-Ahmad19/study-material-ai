import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

export const dynamic = 'force-dynamic';

const CourseViewLayout = ({children}) => {
  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader/>
      <div className="relative z-10 mx-6 md:mx-12 lg:mx-20 py-8">
        {children}
      </div>
    </div>
  )
}

export default CourseViewLayout
