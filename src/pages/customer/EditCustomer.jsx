import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCollection } from '../../hook/useCollection';
import toast from 'react-hot-toast';
import { useFindByid } from '../../hook/useFindById';
function EditCustomer() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [note, setNote] = useState("")
    const { isLoading, update } = useCollection("customer")

    const navigate = useNavigate()
    const route = useParams()

    const { data: customer, isLoading: isFinding } = useFindByid("customer", route.id)
    console.log(customer)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            phone,
            address,
            note
        }
        const res = await update(data, route.id)
        if (res) {
            console.log(res)
            toast.success("update succcessFully !")
            setName("")
            setPhone("")
            setAddress("")
            setNote("")
            navigate("/customer")

        }
    }

    useEffect(() => {
        if (customer && isFinding == false) {
            setName(customer?.name)
            setPhone(customer?.phone)
            setAddress(customer?.address)
            setNote(customer?.note)
        }
    }, [customer, isFinding])

    return (

        <div className="p-6 bg-base-200 min-h-screen">

            {/* Title */}
            <h1 className="text-xl font-semibold">Edit Customer</h1>

            {/* Form Card */}
            <div className="max-w-lg bg-base-100 p-5 rounded-lg mt-4 shadow">
                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-3">
                        <label className="block mb-1">Name*</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="input input-bordered w-full"
                            required
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label className="block mb-1" >Phone*</label>
                        <input
                            type="text"
                            placeholder="Enter phone"
                            className="input input-bordered w-full"
                            value={phone} onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label className="block mb-1" >Address*</label>
                        <input
                            type="text"
                            placeholder="Enter address"
                            className="input input-bordered w-full"
                            value={address} onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    {/* Note */}
                    <div className="mb-3">
                        <label className="block mb-1" >Note*</label>
                        <input
                            type="text"
                            placeholder="Enter note"
                            className="input input-bordered w-full"
                            value={note} onChange={(e) => setNote(e.target.value)}
                        />
                    </div>


                    {/* Button Section */}
                    <div className="mb-3 flex items-center justify-end gap-4">
                        <Link to="/customer" className="btn">
                            "Back"
                        </Link>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-neutral btn-outline"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-md"></span>
                                    "Updating..."
                                </>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );

}

export default EditCustomer
