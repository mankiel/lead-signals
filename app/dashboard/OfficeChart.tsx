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
    fetchOfficeStats()
  }, [])

  const fetchOfficeStats = async () => {
    try {
      const res = await fetch('/api/stats/offices')
      const json = await res.json()
      setData(json.data || [])
    } catch (error) {
      console.error('Error fetching office stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Active Solicitations by Office</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">Loading...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Active Solicitations by Office</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Active Solicitations by Office</h3>
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
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 mt-2">
        Data from cached database - no API calls made
      </p>
    </div>
  )
}
