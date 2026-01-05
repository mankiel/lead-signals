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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          {viewMode === 'agencies' ? `Agency Budget Authority (FY ${fiscalYear})` : 'DoD Sub-Agencies (FY 2025)'}
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">Loading budget data...</div>
      </div>
    )
  }

  if ((viewMode === 'agencies' && data.length === 0) || (viewMode === 'dod' && dodData.length === 0)) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          {viewMode === 'agencies' ? `Agency Budget Authority (FY ${fiscalYear})` : 'DoD Sub-Agencies (FY 2025)'}
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {viewMode === 'dod' && (
            <button
              onClick={handleBackToAgencies}
              className="text-sm px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl text-gray-700 font-semibold transition-all duration-200 shadow-sm hover:shadow"
            >
              ← Back
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {viewMode === 'agencies' ? `Agency Budget Authority (FY ${fiscalYear})` : 'DoD Sub-Agencies (FY 2025)'}
            </h3>
          </div>
        </div>
        <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
          <span className="text-xs text-blue-700 font-semibold">Source: USASpending.gov</span>
        </div>
      </div>
      
      {viewMode === 'agencies' ? (
        <>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tickFormatter={formatBillion} tick={{ fill: '#374151' }} />
              <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 12, fill: '#374151' }} />
              <Tooltip 
                formatter={(value: number | undefined) => value ? formatBillion(value) : '$0B'}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar 
                dataKey="budget_authority" 
                fill="url(#blueGradient)" 
                name="Budget Authority" 
                cursor="pointer"
                onClick={handleBarClick}
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="obligated" 
                fill="url(#greenGradient)" 
                name="Obligated" 
                cursor="pointer"
                onClick={handleBarClick}
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="outlay" 
                fill="url(#orangeGradient)" 
                name="Outlay" 
                cursor="pointer"
                onClick={handleBarClick}
                radius={[0, 4, 4, 0]}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-700">
              <p><span className="font-bold text-blue-600">Budget Authority:</span> Total amount agencies are authorized to spend</p>
              <p><span className="font-bold text-green-600">Obligated:</span> Amount committed through contracts/grants</p>
              <p><span className="font-bold text-orange-600">Outlay:</span> Actual payments made</p>
            </div>
            <p className="mt-3 text-sm text-blue-700 font-bold flex items-center gap-2">
              <span>💡</span> Click on DOD to view sub-agencies
            </p>
          </div>
        </>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={dodData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tickFormatter={formatBillion} tick={{ fill: '#374151' }} />
              <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11, fill: '#374151' }} />
              <Tooltip 
                formatter={(value: number | undefined) => value ? formatBillion(value) : '$0B'}
                labelFormatter={(label) => {
                  const agency = dodData.find(a => a.name === label)
                  return agency?.fullName || label
                }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="total_obligations" fill="url(#redGradient)" name="Total Obligations" radius={[0, 4, 4, 0]} />
              <defs>
                <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
            <p className="text-xs text-gray-700"><span className="font-bold text-red-600">Total Obligations:</span> Amount committed by each DoD component through contracts and grants</p>
          </div>
        </>
      )}
    </div>
  )
}
