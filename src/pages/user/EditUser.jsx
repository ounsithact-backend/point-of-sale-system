import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useCurrent from '../../auth/useCurrent';
import { useFindByid } from '../../hook/useFindById';
import {useCollection} from '../../hook/useCollection'

function EditUser() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const { data: user, isLoading: isFetchingUser } = useCurrent("")
    const route=useParams()
    const {data,isLoading:isFetching}=useFindByid("user",route.id)
    const {update}=useCollection("user")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username: userName,
            email,
            role
        }
        console.log(data)
        if(password){
          data['password']=password
        }
       const res= await update(data,route.id)
       if(res){
        setUserName("")
        setEmail("")
        setPassword("")
        setRole("")
        toast.success("update successFully")
        navigate("/user")
       }

    }
    useEffect(()=>{
        if(data && isFetching ==false){
            setUserName(data?.username || "")
            setEmail(data?.email || "")
            setRole(data?.role || "")
        }
    },[data,isFetching])

    return (

        <div className="p-6 bg-base-200 min-h-screen">

            {/* Title */}
            <h1 className="text-xl font-semibold">Edit User</h1>

            {/* Form Card */}
            <div className="max-w-lg bg-base-100 p-5 rounded-lg mt-4 shadow">
                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-3">
                        <label className="block mb-1">Username*</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="input input-bordered w-full"
                            required
                            value={userName} onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>


                    {/* Note */}
                    <div className="mb-3">
                        <label className="block mb-1" >Email*</label>
                        <input
                            type="email"
                            placeholder="Enter note"
                            className="input input-bordered w-full"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1" >Password*</label>
                        <input
                            type="password"
                            placeholder="Enter note"
                            className="input input-bordered w-full"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <div className='mb-3'>
                            <select
                                className='select'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="" disabled>---Role---</option>

                                {(user?.role === "super" && !isFetchingUser) && (
                                    <option value="admin">admin</option>
                                )}

                                <option value="cashier">cashier</option>
                            </select>
                        </div>
                    </div>

                    {/* ButtonSection */}
                    <div className="mb-3 flex items-center justify-end gap-4">
                        <Link to="/user" className="btn">
                            "Back"
                        </Link>

                        <button
                            disabled={isFetchingUser}
                            className="btn btn-neutral"
                        >
                            {isFetchingUser ? (
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

export default EditUser
