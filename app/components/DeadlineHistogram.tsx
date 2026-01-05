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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Upcoming Deadlines (Next 30 Days)</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">Loading...</div>
      </div>
    )
  }

  const totalSolicitations = data.reduce((sum, item) => sum + item.count, 0)

  if (totalSolicitations === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Upcoming Deadlines (Next 30 Days)</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">No solicitations closing in the next 30 days</div>
      </div>
    )
  }

  // Color scheme: red for urgent, orange for soon, yellow for moderate, green for more time
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e']

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⏰</span>
          <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Upcoming Deadlines (Next 30 Days)</h3>
        </div>
        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {totalSolicitations} active
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="range" 
            tick={{ fontSize: 12, fill: '#374151' }}
          />
          <YAxis allowDecimals={false} tick={{ fill: '#374151' }} />
          <Tooltip 
            formatter={(value: number | undefined) => value ? [`${value} solicitation${value !== 1 ? 's' : ''}`, 'Count'] : ['0 solicitations', 'Count']}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '12px', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{ color: '#000', fontWeight: 'bold' }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-lg border border-red-200">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
          <span className="text-gray-700 font-medium">Urgent (0-7 days)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-200">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
          <span className="text-gray-700 font-medium">Soon (8-14 days)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#eab308' }}></div>
          <span className="text-gray-700 font-medium">Moderate (15-21 days)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
          <span className="text-gray-700 font-medium">More Time (22-30 days)</span>
        </div>
      </div>
    </div>
  )
}
