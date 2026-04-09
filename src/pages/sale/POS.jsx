import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "../../hook/useQuery";
import { api } from "../../config/api";
import { useCheckStock } from "../../hook/useChechStock";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import { useCollection } from "../../hook/useCollection";
function POS() {

    const [search, setSearch] = useState("")
    const { checkStock, isLoading } = useCheckStock()

    const [categories, setCategories] = useState("")
    const { data: category } = useQuery("category", "", 1, 100)
    const [condition, setCondition] = useState("");
    const { data: product, isLoading: isProductLoading } = useQuery("product", search, 1, 8, false, condition)
    const [carts, setCarts] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [isOpenModal, setIsOpenModl] = useState(false)
    const { data: customer } = useQuery("customer", "", 1, 100)
    const [paidAmount, setPaidAmount] = useState(1)
    const [customers, setCustomers] = useState("")
    const { create, isLoading: saleIsLoading } = useCollection("sale")

    useEffect(() => {
        if (categories) {
            setCondition(`category=${categories}`)
        } else {
            setCondition("")
        }
    }, [categories])

    const handleAddToCarts = async (item) => {
        const exist = carts.find(el => el.product === item._id)
        if (exist) {
            handleIncrement(item._id)
            return
        }
        try {
            const data = {
                product: item._id,
                name: item.name,
                quantity: 1,
                unitPrice: item.salePrice,
                totalPrice: 1 * item.salePrice

            }
            const res = await checkStock(data.product, data.quantity)
            console.log(res)
            if (res.success) {
                setCarts([...carts, data])
            }


        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return { success: false };
        }
    }


    const handleIncrement = (id) => {
        const updatedCart = carts.map((el) => {
            if (el.product === id) {
                el.quantity += 1
                el.totalPrice = el.quantity * el.unitPrice * 1
            }
            return el
        })
        setCarts(updatedCart)
    }

    const handleDecrement = (id) => {
        const updatedCart = carts.map((el) => {
            if (el.product === id) {
                el.quantity -= 1
                el.totalPrice = el.quantity * el.unitPrice * 1
            }
            return el
        })
        setCarts(updatedCart)
    }

    const handleRemoveItem = (id) => {
        const updatedCart = carts.filter(el => el.product !== id)
        setCarts(updatedCart)
    }

    const handleClearCart = () => {
        if (confirm("Are you sure?")) {
            setCarts([])
        }
    }
    useEffect(() => {
        const total = carts.reduce((sum, item) => sum += item.totalPrice, 0)
        setTotalCost(total)
    }, [carts, totalCost])


    const handleAddPayNow = async (e) => {
        e.preventDefault()
        if (carts.length <= 0) {
            toast.error("please add product to the carts")
            return;
        }
        const data = {
            customer: customers,
            totalCost,
            paidAmount,
            items: carts

        }
        const res = await create(data)
        console.log(res)
        if (res) {
            clearForm()
            toast.success("sale created successfully")
            window.open(`/sale/invoice/${res.result?._id}`)
        }
    }
    function clearForm() {
        setPaidAmount(0)
        setCustomers("")
        setIsOpenModl(false) 
        setCarts([])
    }

    return (
        <>
            <Modal open={isOpenModal} title="add payment" onClose={clearForm}>
                <div className="">
                    <form onSubmit={handleAddPayNow} action="">
                        <div className="mb-2">
                            <label htmlFor="">Customer</label>
                            <select onChange={(e) => setCustomers(e.target.value)} value={customers} className="select" required>
                                <option value="">---Select Customer---</option>
                                {
                                    customer?.map(el => (
                                        <option key={el._id} value={el._id}>{el.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Paid Amount</label>
                            <input type="number" onChange={(el) => setPaidAmount(Number(el.target.value * 1))} value={paidAmount} placeholder="Paid Amount " className="w-full p-2 border-2 border-gray-400 rounded validator " required min={0} />
                        </div>
                        <div className=" gap-2 mb-2">


                            <button type="button" onClick={() => setPaidAmount(totalCost)} className="btn btn-sm bg-gray-400">{totalCost}រៀល</button>
                            <button type="button" onClick={() => setPaidAmount(10000)} className="btn btn-sm bg-gray-400">10000រៀល</button>
                            <button type="button" onClick={() => setPaidAmount(20000)} className="btn btn-sm bg-gray-400">20000រៀល</button>
                            <button type="button" onClick={() => setPaidAmount(50000)} className="btn btn-sm bg-gray-400">50000រៀល</button>
                        </div>

                        <hr className="bg-gray-200 mt-4 font-bold " />

                        <div className=" flex flex-col mt-2">
                            <label htmlFor="">Change Amount : <span className="text-red-500 font-semibold">{Math.max(paidAmount - totalCost, 0)}រៀល</span> </label>
                            <label htmlFor="">Due Amount : <span className="text-red-500 font-semibold">{Math.max(totalCost - paidAmount, 0)}រៀល</span>​</label>
                        </div>
                        <button className="btn btn-neutral w-full mt-4">Pay Now</button>
                    </form>
                </div>

            </Modal>


            <div className="w-full">
                <h1 className="text-3xl font-bold">Point of Sale</h1>
                <div className="grid grid-cols-12 gap-4 mt-4 items-start">
                    <div className="col-span-12  lg:col-span-8 gap-4">
                        <div className="mb-3 bg-white p-3 shadow-sm rounded-lg">
                            <div className="flex items-center justify-between">
                                <h1 className="font-semibold text-lg">Categories</h1>
                                <label className="input input-sm input-bordered flex items-center gap-2">
                                    <BiSearch size={18} />
                                    <input
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="text"
                                        className="grow"
                                        value={search}
                                        placeholder="Search product"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mb-3 overflow-x-scroll bg-white p-3 shadow-sm rounded-lg">

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCategories("")}
                                    className={`btn btn-sm rounded-md ${categories === "" ? "btn-neutral" : ""}`}
                                >
                                    All
                                </button>


                                {
                                    category?.map((item) => (
                                        <button
                                            key={item._id}
                                            onClick={() => setCategories(item._id)}
                                            value={search}
                                            className={` ${categories === item._id && "btn-neutral"} btn btn-sm rounded-md`}
                                        >
                                            {item?.name}
                                        </button>
                                    ))
                                }


                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">


                            {isProductLoading && (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="animate-pulse">
                                        <div className="w-full h-32 bg-gray-200 rounded-md"></div>
                                        <div className="h-4 bg-gray-200 rounded mt-2"></div>
                                        <div className="h-4 bg-gray-200 rounded mt-1 w-1/2 mx-auto"></div>
                                    </div>
                                ))
                            )}


                            {!isProductLoading && (!product || product.length === 0) && (
                                <div className="col-span-full text-center text-gray-500">
                                    No products found.
                                </div>
                            )}


                            {!isProductLoading && product && product.length > 0 && (
                                product.map((item) => (
                                    <div

                                        onClick={() => handleAddToCarts(item)}
                                        key={item._id}>
                                        <div className="overflow-hidden rounded-md">
                                            <img
                                                src={`${api.baseURL}/api/upload/${item.imageUrl}`}
                                                alt={item.name}
                                                className="w-full h-38 mt-2  transition-transform duration-300 hover:scale-110"
                                            />
                                        </div>
                                        <p className="text-center">{item.name}</p>
                                        <p className="font-medium text-center text-red-600">
                                            {item.salePrice.toFixed(2)}រៀល
                                        </p>
                                    </div>
                                ))
                            )}

                        </div>

                    </div>

                    <div className="col-span-12 bg-white p-3 rounded-lg lg:col-span-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">Cart</h4>
                            <button className="bg-red-500 text-white rounded p-2"
                                onClick={handleClearCart}
                            >
                                Clear
                            </button>
                        </div>

                        <table className="table-auto w-full border-collapse my-4">

                            <thead>
                                <tr className="bg-gray-200 text-sm">
                                    <th className="p-2">Name</th>
                                    <th>Quantity</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            {
                                carts.map(item => (
                                    <tbody key={item.product} >
                                        <tr className="text-center even:bg-gray-50">
                                            <td className="p-2">{item.name}</td>
                                            <td className="p-2">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button type="button"
                                                        disabled={item.quantity === 1}
                                                        onClick={() => handleDecrement(item.product)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleIncrement(item.product)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className=" text-red-600">{item.totalPrice}រៀល</td>
                                            <td className="">
                                                <button
                                                    onClick={() => handleRemoveItem(item.product)}
                                                >
                                                    x
                                                </button>
                                            </td>
                                        </tr>


                                    </tbody>
                                ))
                            }




                        </table>

                        <hr className="h-2px bg-gray-200 shadow-sm mb-2" />

                        <div className="flex justify-between items-center text-xl mt-2 font-bold text-gray-800">
                            <p>TOTAL</p>
                            <p>{totalCost?.toFixed(2)}រៀល</p>
                        </div>

                        {
                            carts.length >= 1 && (
                                <button disabled={saleIsLoading} type="submit"
                                    onClick={() => {
                                        setIsOpenModl(true)
                                    }}
                                    className="btn btn-sm btn-neutral py-2 text-white w-full mt-4"
                                >
                                    Add Payment
                                </button>

                            )
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default POS;
