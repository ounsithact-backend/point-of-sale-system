import React, { useState } from 'react'
import Topmenu from '../components/Topmenu'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Adminlayout() {
    const [isShowSideba,setIsShowSidebar]=useState(true)
  return (
    <div className=''>
        <div className='flex items-start'>
            <Sidebar isShowSideba={isShowSideba}/>
            <div className={`${isShowSideba ?'ml-75' :'ml-0'} grow transition-all duration-300`}>
                <Topmenu onShowSidebar={()=>setIsShowSidebar(!isShowSideba)}/>

                <div className='p-5 '>
                     <Outlet/>
                </div>
               
            </div>
        </div>
      
      
    </div>
  )
}

export default Adminlayout
