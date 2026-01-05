'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface FundingData {
  month: string
  amount: number
}

export default function AgencyBudgetChart() {
  const [data, setData] = useState<FundingData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFundingData()
  }, [])

  const fetchFundingData = async () => {
    setLoading(true)
    try {
      // Generate sample time-series data for demonstration
      // In production, this would fetch from an API
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const sampleData = months.map((month, index) => ({
        month,
        amount: Math.floor(50 + Math.random() * 100 + index * 5) // Trending upward
      }))
      
      setData(sampleData)
    } catch (error) {
      console.error('Error fetching funding data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatBillion = (value: number) => `$${value}B`

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Contract Funding Trends (FY 2025)
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">Loading funding data...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Contract Funding Trends (FY 2025)
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Contract Funding Trends (FY 2025)
        </h3>
        <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
          <span className="text-xs text-blue-700 font-semibold">Monthly Data</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="funding-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            tickFormatter={formatBillion}
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            formatter={(value: number | undefined) => value !== undefined ? [`$${value}B`, 'Funding'] : ['$0B', 'Funding']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fill="url(#funding-gradient)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        Data shows cumulative contract funding over fiscal year 2025
      </div>
    </div>
  )
}
