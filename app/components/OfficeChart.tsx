'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface OfficeData {
  office: string
  count: number
}

export default function OfficeChart() {
  const [data, setData] = useState<OfficeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats/offices')
      .then(res => res.json())
      .then(result => {
        setData(result.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching office stats:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Active Solicitations by Office</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">Loading chart...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Active Solicitations by Office</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Active Solicitations by Office</h3>
        <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-300">
          <span className="text-xs text-blue-800 font-semibold">Top 10</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="office" 
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1e40af" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
