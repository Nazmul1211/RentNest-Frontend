"use client"

import { MakeRentalPayment } from '../_action/MakeRentalPayment'

const HandleMakeRentalRequestByOnClick = ({ req }: { req: any }) => {
    const handlePayment = async () => {
        await MakeRentalPayment({ rentalRequestId: req.id })
    }

    return (
        <div>
            {
                req?.status === "APPROVED" && req?.status !== "PAID" && req?.status !== "COMPLETED" &&
                <button onClick={handlePayment} className="bg-teal-500 hover:bg-teal-600 cursor-pointer text-sm font-medium py-1 px-3 rounded-lg">Pay Now</button>

            }
        </div>
    )
}

export default HandleMakeRentalRequestByOnClick