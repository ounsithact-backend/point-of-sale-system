
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useFindByid } from '../../hook/useFindById'
import { useCollection } from '../../hook/useCollection'
import toast from 'react-hot-toast'

function PurchaseStatusModal({ open, onClose, editId }) {

    const [purchaseStatus, setPurchaseStatus] = useState("")
    const { data, isLoading } = useFindByid("purchase", editId)
    const {update,isLoading:updating}=useCollection("purchase/updatePurchaseStatus")

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        const res= await update({purchaseStatus},editId)
        if(res){

            closeModal()
            toast.success("update purchase succesFully !")
            
        }
    }
    function closeModal(){
        onClose()
        setPurchaseStatus("")
    }

    useEffect(() => {
        if (data && isLoading === false) {
            setPurchaseStatus(data?.purchaseStatus)
        }
    }, [data, isLoading])

    

    return (
        <>
            <Modal open={open} onClose={closeModal} title={"update purchase status"}>

                <form action="" onSubmit={handleSubmit}>

                    <div className='mt-5 mb-2'>

                        <label className='block mb-4'>Status</label>

                        <select required className="select w-full select-bordered" value={purchaseStatus} onChange={(e) => setPurchaseStatus(e.target.value)}>

                            <option value="" disabled>Select Purchase Status</option>
                            <option value="received">Received</option>
                            <option value="pending">Pending</option>
                            <option value="ordered">Ordered</option>
                            <option value="cancel">Cancel</option>

                        </select>

                    </div>
                    <button disabled={updating} className='btn btn-neutral w-full'>Save</button>
                </form>
            </Modal>
        </>
    )
}

export default PurchaseStatusModal
