import React, { useState } from 'react'
import { AiFillHome, AiFillProduct } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { FaHandshake, FaShoppingBag, FaUser, FaUserFriends } from 'react-icons/fa'
import { MdCategory } from 'react-icons/md'
import { TbActivityHeartbeat } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

function Sidebar(props) {
    const { isShowSideba } = props
    const [isToggleSale, setIsToggleSale] = useState(false)
    const [isToggleReport,setIsToggleReport]=useState(false)

    return (

        <div className={`${isShowSideba ? ' w-75' : 'w-0'} min-h-screen border-gray-300    border-2 overflow-hidden fixed transition-all duration-300`}>

            <h1 className='text-nowrap font-bold justify-center flex mt-7 text-2xl'>Master POS</h1>
            <ul>
                <li className='mt-2 p-1 text-1xl'>
                    <NavLink to="/" className='flex space-x-2 items-center hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                        <span>
                            <AiFillHome />

                        </span>
                        <span>
                            Home
                        </span>
                    </NavLink>
                </li>
                <li className='mt-2 p-1 text-1xl'>
                    <NavLink to="/customer" className='flex space-x-2 items-center hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                        <span>
                            <FaUserFriends />

                        </span>
                        <span>
                            Customer
                        </span>
                    </NavLink>
                </li>

                <li className='mt-2 p-1 text-1xl'>
                    <NavLink to="/supplier" className='flex space-x-2 items-center hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                        <span>
                            <FaHandshake />

                        </span>
                        <span>
                            Supplier
                        </span>
                    </NavLink>
                </li>
                <li className='mt-2 p-1 text-1xl'>
                    <NavLink to="/category" className='flex space-x-2 items-center hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                        <span>
                            <MdCategory />
                        </span>
                        <span>
                            Category
                        </span>
                    </NavLink>
                </li>
                <li className='mt-2 p-1 text-1xl'>
                    <NavLink to="/product" className='flex space-x-2 items-center hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                        <span>
                            <AiFillProduct />
                        </span>
                        <span>
                            Product
                        </span>
                    </NavLink>
                </li>
                <li className='mt-2 p-1 text-1xl'>
                    <NavLink to="/purchase" className='flex space-x-2 items-center hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                        <span>
                            <FaShoppingBag />
                        </span>
                        <span>
                            Purchase
                        </span>
                    </NavLink>
                </li>

                <li>
                    <div className="">
                        <button
                            onClick={() => setIsToggleSale(!isToggleSale)}
                            className='flex space-x-2 items-center justify-between hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'
                        >
                            <div className='flex items-center gap-2 ml-1'>
                                <FaUserFriends />
                                <span>sale</span>
                            </div>

                            <span className={`transition-all duration-300 ${isToggleSale ? "rotate-180" : ""}`}>
                                <BiChevronDown />
                            </span>
                        </button>
                    </div>

                    <ul className={`bg-base-300 ${isToggleSale ? "block" : "hidden"}`}>
                        <li>
                            <NavLink
                                to="/sale/list"
                                className="flex space-x-2 items-center justify-between hover:bg-base-200 duration-300 p-2 w-full aria-[current=page]:font-semibold"
                            >
                                <div className='flex items-center gap-1 ml-2'>
                                    <TbActivityHeartbeat />
                                    <span>List Sale</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sale/pos"
                                className="flex space-x-2 items-center justify-between hover:bg-base-200 duration-300 p-2 w-full aria-[current=page]:font-semibold"
                            >
                                <div className='flex items-center gap-1 ml-2'>
                                    <TbActivityHeartbeat />
                                    <span>POS</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className='mt-2 p-1 text-1xl'>
                    <NavLink to="/user" className='flex space-x-2 items-center hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                        <span>
                            <FaUser />
                        </span>
                        <span>
                           User
                        </span>
                    </NavLink>
                </li>


                    <li>
                    <div className="">
                        <button
                            onClick={() => setIsToggleReport(!isToggleReport)}
                            className='flex space-x-2 items-center justify-between hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'
                        >
                            <div className='flex items-center gap-2 ml-1'>
                                <FaUserFriends />
                                <span>Report</span>
                            </div>

                            <span className={`transition-all duration-300 ${isToggleReport ? "rotate-180" : ""}`}>
                                <BiChevronDown />
                            </span>
                        </button>
                    </div>

                    <ul className={`bg-base-300 ${isToggleReport ? "block" : "hidden"}`}>
                        <li>
                            <NavLink
                                to="/sale/report"
                                className="flex space-x-2 items-center justify-between hover:bg-base-200 duration-300 p-2 w-full aria-[current=page]:font-semibold"
                            >
                                <div className='flex items-center gap-1 ml-2'>
                                    <TbActivityHeartbeat />
                                    <span>Sale Report</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sale/stock"
                                className="flex space-x-2 items-center justify-between hover:bg-base-200 duration-300 p-2 w-full aria-[current=page]:font-semibold"
                            >
                                <div className='flex items-center gap-1 ml-2'>
                                    <TbActivityHeartbeat />
                                    <span>Stock Report</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
    )
}
export default Sidebar