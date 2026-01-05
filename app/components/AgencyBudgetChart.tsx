'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface AgencyBudget {
  name: string
  budget_authority: number
  obligated: number
  outlay: number
}

export default function AgencyBudgetChart() {
  const [data, setData] = useState<AgencyBudget[]>([])
  const [loading, setLoading] = useState(true)
  const [fiscalYear, setFiscalYear] = useState('2025')

  useEffect(() => {
    fetchAgencyBudgets()
  }, [fiscalYear])

  const fetchAgencyBudgets = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stats/budgets')
      const result = await response.json()
      
      if (result.data) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Error fetching agency budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatBillion = (value: number) => `$${value}B`

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Agency Budget Authority (FY {fiscalYear})</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">Loading budget data...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Agency Budget Authority (FY {fiscalYear})</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Agency Budget Authority (FY {fiscalYear})</h3>
        <div className="text-xs text-gray-500">
          Source: USASpending.gov
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={formatBillion} />
          <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number) => formatBillion(value)} />
          <Legend />
          <Bar dataKey="budget_authority" fill="#3b82f6" name="Budget Authority" />
          <Bar dataKey="obligated" fill="#10b981" name="Obligated" />
          <Bar dataKey="outlay" fill="#f59e0b" name="Outlay" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-xs text-gray-600">
        <p className="mb-1"><span className="font-semibold">Budget Authority:</span> Total amount agencies are authorized to spend</p>
        <p className="mb-1"><span className="font-semibold">Obligated:</span> Amount committed through contracts/grants</p>
        <p><span className="font-semibold">Outlay:</span> Actual payments made</p>
      </div>
    </div>
  )
}
