'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface DeadlineData {
  range: string
  count: number
}

export default function DeadlineHistogram() {
  const [data, setData] = useState<DeadlineData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats/deadlines')
      .then(res => res.json())
      .then(result => {
        setData(result.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching deadline stats:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">Loading...</div>
      </div>
    )
  }

  const totalSolicitations = data.reduce((sum, item) => sum + item.count, 0)

  if (totalSolicitations === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">No solicitations closing in the next 30 days</div>
      </div>
    )
  }

  // Corporate blue color scheme
  const colors = ['#1e3a8a', '#1e40af', '#2563eb', '#3b82f6']

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Upcoming Deadlines</h3>
        <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-300">
          <span className="text-xs text-blue-800 font-semibold">{totalSolicitations} active</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="range" 
            tick={{ fontSize: 12 }}
          />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value: number | undefined) => value ? [`${value} solicitation${value !== 1 ? 's' : ''}`, 'Count'] : ['0 solicitations', 'Count']}
            labelStyle={{ color: '#000' }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#1e3a8a' }}></div>
          <span className="text-gray-600">Urgent (0-7 days)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#1e40af' }}></div>
          <span className="text-gray-600">Soon (8-14 days)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#2563eb' }}></div>
          <span className="text-gray-600">Moderate (15-21 days)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
          <span className="text-gray-600">More Time (22-30 days)</span>
        </div>
      </div>
    </div>
  )
}
