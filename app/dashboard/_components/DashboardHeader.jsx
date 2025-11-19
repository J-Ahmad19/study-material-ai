import React from 'react'
import { UserButton } from '@clerk/nextjs'

// _components/DashboardHeader.jsx
const DashboardHeader = () => {
  return (
    <div className="flex p-5 shadow-md justify-end">
      <UserButton />
    </div>
  )
}

export default DashboardHeader
   