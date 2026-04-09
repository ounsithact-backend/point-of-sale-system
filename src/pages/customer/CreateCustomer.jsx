import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCollection } from '../../hook/useCollection';
import toast from 'react-hot-toast';
function CreateCustomer() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [note, setNote] = useState("")
    const { create, isLoading } = useCollection("customer")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            phone,
            address,
            note
        }
        const res = await create(data)
        if (res) {
            console.log(res)
            toast.success("inserted succcessFully !")
            setName("")
            setPhone("")
            setAddress("")
            setNote("")
            navigate("/customer")

        }
    }

    return (

        <div className="p-6 bg-base-200 min-h-screen">

            {/* Title */}
            <h1 className="text-xl font-semibold">Create New Customer</h1>

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
                    {/* ButtonSection */}
                    <div className="mb-3 flex items-center justify-end gap-4">
                        <Link to="/customer" className="btn">
                            "Back"
                        </Link>

                        <button
                            disabled={isLoading}
                            className="btn btn-neutral"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );

}

export default CreateCustomer
