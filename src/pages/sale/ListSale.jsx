
import { Link } from 'react-router-dom'
import { useQuery } from '../../hook/useQuery'
import { FaCreditCard } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import { formatDate } from '../../utils/formatDate'
import { useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import SalePaymentModal from './SalePaymentModal'
function ListSale() {

    const [search, setSearch] = useState("") 
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [refetch, setRefetch] = useState(false)
    const [editId, setEditId] = useState("")
    const [isOpen,setIsOpen]=useState(false)

    const { data: sale, isLoading, totalPage } = useQuery("sale", search, page, limit, refetch)
    return (

        <div>

            <SalePaymentModal
            open={isOpen}
            editId={editId}
            onClose={()=>{
                setIsOpen(false)
                setEditId("")
                setRefetch(!refetch)
            }}
            >

            </SalePaymentModal>

            <div className='flex justify-between mb-4'>
                <h1 className=' font-bold text-2xl '>List Sale</h1>
                <div>

                    <Link to="/purchase/create" className='font-bold btn btn-neutral btn-outline'>
                        + New Purchase
                    </Link>

                </div>

            </div>

            <div className='border-3 p-4 rounded-md border-red-400 '>
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
                                <th className='font-bold'>N o</th>
                                <th className='font-bold '>Invoice</th>
                                <th className='font-bold'>Sale By</th>
                                <th className='font-bold'>Customer</th>
                                <th className='font-bold'>Total Cost</th>
                                <th className='font-bold '>Due Amount</th>
                                <th className='font-bold '>Paid Amount</th>
                                <th className='font-bold'>Change Amount</th>
                                <th className='font-bold'>Payment Status</th>
                                <th className='font-bold'>CreatedAt</th>
                                <th className='font-bold'>Actions</th>

                            </tr>
                        </thead>
                        {
                            sale?.length == 0 && isLoading == false && (
                                <tbody>
                                    <tr>
                                        <td colSpan={11}>
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
                                        sale?.map((item, index) => (
                                            <tr key={index} className="hover:bg-base-300">

                                                <td>{index + 1}</td>
                                                <td>{item.invoiceNumber}</td>
                                                <td>{item.user.username}</td>
                                                <td>{item.customer.name}</td>
                                                <td className='text-red-500 font-semibold'>{item.totalCost.toFixed(2)}រៀល</td>
                                                <td className='text-red-500 font-semibold'>{item.dueAmount.toFixed(2)}រៀល</td>
                                                <td className='text-red-500 font-semibold'>{item.paidAmount.toFixed(2)}រៀល</td>
                                                <td className='text-red-500 font-semibold'>{item.changeAmount.toFixed(2)}រៀល</td>

                                                <td>
                                                    <span className={`font-medium rounded p-2 me-2 text-whit
                                                          ${item.paymentStatus === "paid" && "bg-green-500"}
                                                           ${item.paymentStatus === "due" && "bg-red-500"}
                                                           ${item.paymentStatus === "partial" && "bg-yellow-500"}
                                                          `


                                                    }>

                                                        {item.paymentStatus}
                                                    </span>
                                                </td>

                                                <td>{formatDate(item.createdAt)}</td>
                                                <td className='space-x-2'>

                                                    <button

                                                        onClick={()=>{
                                                            setIsOpen(true)
                                                            setEditId(item._id)
                                                        }}
                                                        disabled={item.paymentStatus === "paid"}

                                                        className={`${item.paymentStatus === "paid" ? "text-gray-500 cursor-not-allowed" : "text-green-500"}`}>

                                                        <FaCreditCard />

                                                    </button>

                                                    <Link to={`/sale/invoice/${item._id}`}
                                                        target='blank'
                                                        className={`text-gray-500 cursor-pointer`}>

                                                        <FaEye/>

                                                    </Link>
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

export default ListSale
