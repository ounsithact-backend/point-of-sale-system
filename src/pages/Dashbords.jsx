import { FaDollarSign, FaUser, FaHandshake, FaFileInvoice } from "react-icons/fa";
import { useGenaralReport } from "../hook/useGenaralReport";
import { useState } from "react";
import RevenueCharts from "../components/RevenueCharts";

 function Dashbords() {
  const {data,isLoading}=useGenaralReport()
 

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      
      <h2 className="text-xl font-bold mb-4">General Report</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="card bg-base-100 shadow">
          <div className="card-body flex-row justify-between items-center">
            <div>
              <p className="text-sm">Today Revenue</p>
              <h2 className="text-2xl font-bold">{data?.totalSaleToday}រៀល</h2>
            </div>
            <div className="bg-gray-200 p-3 rounded-full">
             
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow p-4  ">
            <div>
              <p className="text-sm">Due Invoice</p>
             <h2 className="text-2xl font-bold">{data.totalSaleDue}រៀល</h2>
            </div>
          
        </div>

        <div className="card bg-base-100 shadow p-4">
          <p className="text-sm">Due Purchase</p>
          <h2 className="text-2xl font-bold">{data.totalPurchaseDue}រៀល</h2>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <p className="text-sm">Monthly Revenue</p>
          <h2 className="text-2xl font-bold">{data.totalMonthlySale}រៀល</h2>
        </div>

      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 mb-4">
        
        <div className="card bg-warning text-white shadow relative">
          <div className="card-body">
            <h2 className="text-3xl font-bold">{data.totalCustomers}</h2>
            <p>Customers</p>
            <FaUser className="absolute right-5 top-5 text-2xl opacity-70" />
          </div>
        </div>

        <div className="card bg-primary text-white shadow relative">
          <div className="card-body">
            <h2 className="text-3xl font-bold">{data.totalSuppliers}</h2>
            <p>Suppliers</p>
            <FaHandshake className="absolute right-5 top-5 text-2xl opacity-70" />
          </div>
        </div>

        <div className="card bg-neutral text-white shadow relative">
          <div className="card-body">
            <h2 className="text-3xl font-bold">{data.totalDuePurchaseToday}រៀល</h2>
            <p>Purchase Due Invoice</p>
            <FaFileInvoice className="absolute right-5 top-5 text-2xl opacity-70" />
          </div>
        </div>

        <div className="card bg-success text-white shadow relative">
          <div className="card-body">
            <h2 className="text-3xl font-bold">{data.totalDueSaleToday}រៀល</h2>
            <p>Sales Due Invoice</p>
            <FaFileInvoice className="absolute right-5 top-5 text-2xl opacity-70" />
          </div>
        </div>

      </div>
      <div className="bg-white w-full p-10 mt-2 shadow-lg rounded-md">
        <RevenueCharts/>
      </div>

    </div>
  );
}
export default Dashbords