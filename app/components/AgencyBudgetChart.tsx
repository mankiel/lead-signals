'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface AgencyBudget {
  name: string
  budget_authority: number
  obligated: number
  outlay: number
}

interface DoDAgency {
  name: string
  fullName: string
  total_obligations: number
}

export default function AgencyBudgetChart() {
  const [data, setData] = useState<AgencyBudget[]>([])
  const [dodData, setDodData] = useState<DoDAgency[]>([])
  const [loading, setLoading] = useState(true)
  const [fiscalYear, setFiscalYear] = useState('2025')
  const [viewMode, setViewMode] = useState<'agencies' | 'dod'>('agencies')

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

  const fetchDoDAgencies = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stats/dod-agencies')
      const result = await response.json()
      
      if (result.data) {
        setDodData(result.data)
        setViewMode('dod')
      }
    } catch (error) {
      console.error('Error fetching DoD agencies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBarClick = (data: any) => {
    if (data && data.name === 'DOD' && viewMode === 'agencies') {
      fetchDoDAgencies()
    }
  }

  const handleBackToAgencies = () => {
    setViewMode('agencies')
  }

  const formatBillion = (value: number) => `$${value}B`

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">
          {viewMode === 'agencies' ? `Agency Budget Authority (FY ${fiscalYear})` : 'DoD Sub-Agencies (FY 2025)'}
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">Loading budget data...</div>
      </div>
    )
  }

  if ((viewMode === 'agencies' && data.length === 0) || (viewMode === 'dod' && dodData.length === 0)) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">
          {viewMode === 'agencies' ? `Agency Budget Authority (FY ${fiscalYear})` : 'DoD Sub-Agencies (FY 2025)'}
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {viewMode === 'dod' && (
            <button
              onClick={handleBackToAgencies}
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
            >
              ← Back
            </button>
          )}
          <h3 className="text-lg font-semibold text-black">
            {viewMode === 'agencies' ? `Agency Budget Authority (FY ${fiscalYear})` : 'DoD Sub-Agencies (FY 2025)'}
          </h3>
        </div>
        <div className="text-xs text-gray-500">
          Source: USASpending.gov
        </div>
      </div>
      
      {viewMode === 'agencies' ? (
        <>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={formatBillion} />
              <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number | undefined) => value ? formatBillion(value) : '$0B'} />
              <Legend />
              <Bar 
                dataKey="budget_authority" 
                fill="#3b82f6" 
                name="Budget Authority" 
                cursor="pointer"
                onClick={handleBarClick}
              />
              <Bar 
                dataKey="obligated" 
                fill="#10b981" 
                name="Obligated" 
                cursor="pointer"
                onClick={handleBarClick}
              />
              <Bar 
                dataKey="outlay" 
                fill="#f59e0b" 
                name="Outlay" 
                cursor="pointer"
                onClick={handleBarClick}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-xs text-gray-600">
            <p className="mb-1"><span className="font-semibold">Budget Authority:</span> Total amount agencies are authorized to spend</p>
            <p className="mb-1"><span className="font-semibold">Obligated:</span> Amount committed through contracts/grants</p>
            <p className="mb-1"><span className="font-semibold">Outlay:</span> Actual payments made</p>
            <p className="mt-2 text-blue-600 font-medium">💡 Click on DOD to view sub-agencies</p>
          </div>
        </>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={dodData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={formatBillion} />
              <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11 }} />
              <Tooltip 
                formatter={(value: number | undefined) => value ? formatBillion(value) : '$0B'}
                labelFormatter={(label) => {
                  const agency = dodData.find(a => a.name === label)
                  return agency?.fullName || label
                }}
              />
              <Bar dataKey="total_obligations" fill="#dc2626" name="Total Obligations" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-xs text-gray-600">
            <p><span className="font-semibold">Total Obligations:</span> Amount committed by each DoD component through contracts and grants</p>
          </div>
        </>
      )}
    </div>
  )
}
