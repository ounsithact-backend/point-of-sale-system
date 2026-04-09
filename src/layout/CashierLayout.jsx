import React from 'react'
import Topmenu from '../components/Topmenu'
import { Outlet } from 'react-router-dom'
function CashierLayout() {
  return (
    <div>

    <Topmenu onShowSidebar={false}/>
    <div className='bg-gray-100 h-full min-h-screen p-4'>
         <Outlet/>
    </div>
       
    </div>
  )
}

export default CashierLayout
