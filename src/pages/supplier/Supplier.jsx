
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../config/api'
import { useQuery } from '../../hook/useQuery'
import { useCollection } from '../../hook/useCollection'
import toast from 'react-hot-toast'
function Supplier() {

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [refetch, setRefetch] = useState(false)
    const { data: supplier, isLoading, totalPage } = useQuery("supplier", search, page, limit, refetch)
    const { remove, isLoading: isDeleting } = useCollection("supplier")

    const handleDelete = async (id) => {
        if (confirm("are you sure ? you want to delete ")) {
            const res = await remove(id)
            if (res && isDeleting == false) {
                setRefetch(!refetch)
                toast.success("delete successFully !")
            }
        }

    }

    console.log(supplier)
    return (
        <div>
            <div className='flex justify-between mb-4'>
                <h1 className=' font-bold text-2xl '>Supplier</h1>
                <div>

                    <Link to="/supplier/create" className='font-bold btn btn-neutral btn-outline'>
                        + New
                    </Link>

                </div>

            </div>

            <div className='border-3 p-4 rounded-md border-red-400'>
                <div className='space-x-2  flex justify-between items-center mb-4'>
                    <select onChange={(e) => setLimit(e.target.value)} value={limit} className='select select-sm w-fit outline-none select-bordered ' >
                        <option value="5">5 </option>
                        <option value="10">10 </option>
                        <option value="25"> 25</option>
                        <option value="50">50 </option>
                        <option value="100">100 </option>


                    </select>
                    <label className="input outline-none ">
                        <svg className="h-[1em] opacity-100  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                    </label>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead >
                            <tr >
                                <th className='font-bold'>Number</th>
                                <th className='font-bold '>businessName</th>
                                <th className='font-bold '>Name</th>
                                <th className='font-bold'>Phone</th>
                                <th className='font-bold'>Address</th>
                                <th className='font-bold'>Note</th>
                                <th className='font-bold'>Action</th>

                            </tr>
                        </thead>
                        {
                            supplier?.length == 0 && isLoading == false && (
                                <tbody>
                                    <tr>
                                        <td colSpan={7}>
                                            <div className=' flex justify-center items-center w-full'>
                                                <p>Note data</p>

                                            </div>

                                        </td>
                                    </tr>

                                </tbody>
                            )
                        }
                        {
                            isLoading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan={6}>
                                            <div className=' flex justify-center items-center w-full'>
                                                <span className="loading loading-spinner loading-xl"></span>

                                            </div>


                                        </td>
                                    </tr>

                                </tbody>
                            ) : (
                                <tbody>
                                    {
                                        supplier?.map((item, index) => (
                                            <tr key={index} className="hover:bg-base-300">

                                                <td>{index + 1}</td>
                                                <td>{item?.businessName}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.address}</td>
                                                <td>{item?.note}</td>
                                                <td className='space-x-2'>

                                                    <Link to={`/supplier/edit/${item._id}`} className=" bg-blue-700 text-white p-2 rounded font-bold cursor-pointer">Edit</Link>
                                                    <button onClick={() => handleDelete(item._id)} className=' bg-red-700 text-white p-2 rounded font-bold cursor-pointer'>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            )
                        }

                    </table>
                </div>

                <div className="join mt-4 justify-end flex">
                    <button className="join-item btn" onClick={(e) => setPage(page - 1)} disabled={page == 1} >«</button>
                    <button className="join-item btn">Page {page}</button>
                    <button className="join-item btn" onClick={(e) => setPage(page + 1)} disabled={page == totalPage}>»</button>
                </div>
            </div>
        </div>
    )
}

export default Supplier
