import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useFindByid } from '../../hook/useFindById'
import { useAddPaymentPurchase } from '../../hook/useAddPaymentPurchase'
import toast from 'react-hot-toast'

function PurchasePaymentStatusModal({ open, onClose, editId }) {

    const [paidAmount, setPaidAmount] = useState(1)
    const [changeAmount, setChangeAmount] = useState(0)
    const { data, isLoading } = useFindByid("purchase", editId)
    const {addPayment,isLoading:updating}=useAddPaymentPurchase()



    const handleSubmit = async(e) => {
        e.preventDefault()
        const res= await addPayment(editId,{paidAmount})
        if(res){
            toast.success("update paid Amount successFully")
            closeModal()

        }
    }

    function closeModal() {
        onClose()
        setPaidAmount(0)
    }

    useEffect(() => {
        if (data && !isLoading) {
           
            const currentPaidInput = Number(paidAmount) || 0;
            const previousPaid = Number(data?.paidAmount) || 0;
            const totalCost = Number(data?.totalCost) || 0;

           
            const totalPaidSoFar = previousPaid + currentPaidInput;
            const result = totalPaidSoFar - totalCost;

            const amountToChange = Math.max(0, result);

            if (!isNaN(amountToChange)) {
                setChangeAmount(amountToChange);
            }
        }
    }, [data, isLoading, paidAmount,changeAmount ]);



    return ( 
        <div>
            <Modal open={open} onClose={closeModal} title={"update Paymentt Purchase Status"}>

                <form action="" onSubmit={handleSubmit}>
                    <div className='mt-5 mb-2'>

                        <label className='block mb-6'>Paid Amount :</label>
                        <input onChange={(e) => setPaidAmount(Number(e.target.value))} value={paidAmount} type="number" className='w-full input validator' placeholder='Enter Paid Amount' min={1} />

                    </div>
                    <div className='mb-5 space-y-2'>
                        <button type="button" onClick={()=>setPaidAmount(data.dueAmount *1)} className=' border border-gray-300  btn-ghost btn-sm text-gray-700 p-2' >
                            <span>Due Amount :</span><span className='text-red-500 font-semibold'> {isLoading ? "Loading...!" : data?.dueAmount}រៀល</span>

                        </button>
                        <button type="button" className=' border border-gray-300 p-2 btn-ghost btn-sm text-gray-700 cursor-text' >
                            <span>Change Amount :</span><span className='text-red-500 font-semibold'>{isLoading ? "loading..." : changeAmount}រៀល</span>
                        </button>
                    </div>
                    <button className='btn btn-neutral w-full'>Save</button>
                </form>

            </Modal>
        </div>
    )
}

export default PurchasePaymentStatusModal
