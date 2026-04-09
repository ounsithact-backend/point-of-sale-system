import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts'

import { formatDate } from '../utils/formatDate'
import { use30DaysAgoReport } from '../hook/use30DaysAgoReport'
function RevenueCharts() {

  const { data, isLoading } = use30DaysAgoReport()
  // console.log(data)
  let sales = data?.map(item => {
    const date = formatDate(item.createdAt, 'DD/MMM')
    return {
      ...item,
      createdAt: date
    }
  })
 


  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
      <h2 className="text-center font-bold text-2xl my-4">
        Sale in 30 days
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sales}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="createdAt" />
          <YAxis />

          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="totalCost"
            stroke="#4f46e5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueCharts