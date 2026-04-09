import React from 'react'
import { FaListUl, FaUserCheck, FaUserCog } from 'react-icons/fa'
import { GiTwoCoins } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'
import { TbLogout2 } from 'react-icons/tb'
import useSignout from '../auth/useSignout'
import { useNavigate } from 'react-router-dom'
import useCurrent from '../auth/useCurrent'


function Topmenu(props) {

    const { onShowSidebar } = props
    const { isLoading, signout } = useSignout()
    const { data: user, isLoading: isCurrentLoading } = useCurrent()
    const navigate = useNavigate()
    const handleSignout = async () => {
        const res = await signout()

        if (res?.success) {
            navigate("/signin")
        }
    }



    return (
        <div>
            <div className='border-b-2 flex p-4 w-full justify-between items-center'>


                {
                    user?.role === "cashier" && (
                         <h1 className='font-bold ml-4'>Master Post</h1> 
                    )

                }
                {
                    user?.role === "admin" || user?.role === "super" && (
                        <button onClick={onShowSidebar} className=' p-2 hover:bg-gray-100 rounded-lg'>
                            <FaListUl size={20} />
                        </button>
                    )
                }


                <div className='flex items-center gap-2'>

                    <button className='btn btn-neutral btn-sm btn-outline flex items-center gap-2 px-4'>
                        <span className="flex items-center justify-center">
                            <GiTwoCoins size={18} />
                        </span>
                        <span className="font-bold tracking-wide">POS</span>
                    </button>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">
                            <FaUserCog />
                            <span className=' capitalize'>{user?.username}</span>
                        </div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li className='border-b border-gray-200'>
                                <a href="#" className='flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors'>
                                    <span className="text-blue-500 bg-blue-50 p-2 rounded-full">
                                        <MdEmail size={20} />
                                    </span>
                                    <span className="text-gray-700 font-medium">{user?.email}</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" className='flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors'>
                                    <span className="text-green-500 bg-green-50 p-2 rounded-full">
                                        <FaUserCheck size={20} />
                                    </span>
                                    <span className="text-gray-700 font-medium text-lg">{user?.role}</span>
                                </a>
                            </li>
                            <li className="list-none">
                                <button
                                    onClick={handleSignout}
                                    type="button"
                                    disabled={isLoading}
                                    className="group flex items-center gap-3 w-full p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                                >

                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <span className="flex items-center justify-center p-2 rounded-md bg-gray-100 group-hover:bg-red-100 transition-colors">
                                            <TbLogout2 size={22} className="group-hover:text-red-600" />
                                        </span>
                                    )}

                                    <div>
                                        <span className="font-medium text-base">Sign out</span>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Topmenu
