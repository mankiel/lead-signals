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
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">⏰ Upcoming Deadlines (Next 30 Days)</h3>
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold">{totalSolicitations} active</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="urgentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="soonGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#ea580c" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="upcomingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eab308" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="laterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis 
            dataKey="range" 
            tick={{ fontSize: 11, fill: '#4b5563' }}
          />
          <YAxis allowDecimals={false} tick={{ fill: '#4b5563' }} />
          <Tooltip 
            formatter={(value: number | undefined) => value ? [`${value} solicitation${value !== 1 ? 's' : ''}`, 'Count'] : ['0 solicitations', 'Count']}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={800}>
            {data.map((entry, index) => {
              const gradients = ['url(#urgentGrad)', 'url(#soonGrad)', 'url(#upcomingGrad)', 'url(#laterGrad)']
              return <Cell key={`cell-${index}`} fill={gradients[index] || colors[index]} />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
          <span className="text-gray-600">Urgent (0-7 days)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f97316' }}></div>
          <span className="text-gray-600">Soon (8-14 days)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#eab308' }}></div>
          <span className="text-gray-600">Moderate (15-21 days)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22c55e' }}></div>
          <span className="text-gray-600">More Time (22-30 days)</span>
        </div>
      </div>
    </div>
  )
}
