'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface TimeSeriesData {
  month: string
  DOD?: number
  HHS?: number
  VA?: number
  DHS?: number
  NASA?: number
  DOE?: number
  Army?: number
  Navy?: number
  'Air Force'?: number
  'Defense Logistics'?: number
  [key: string]: any
}

const AGENCY_COLORS = {
  DOD: '#1e40af',
  HHS: '#059669',
  VA: '#dc2626',
  DHS: '#d97706',
  NASA: '#7c3aed',
  DOE: '#0891b2',
  Army: '#991b1b',
  Navy: '#1e3a8a',
  'Air Force': '#1e40af',
  'Defense Logistics': '#6b7280'
}

export default function AgencyBudgetChart() {
  const [data, setData] = useState<TimeSeriesData[]>([])
  const [viewMode, setViewMode] = useState<'agencies' | 'dod'>('agencies')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFundingData()
  }, [viewMode])

  const fetchFundingData = async () => {
    setLoading(true)
    try {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      if (viewMode === 'agencies') {
        // Generate multi-agency time-series data
        const agencyData = months.map((month, index) => ({
          month,
          DOD: Math.floor(300 + Math.random() * 50 + index * 8),
          HHS: Math.floor(150 + Math.random() * 30 + index * 4),
          VA: Math.floor(100 + Math.random() * 25 + index * 3),
          DHS: Math.floor(80 + Math.random() * 20 + index * 2),
          NASA: Math.floor(60 + Math.random() * 15 + index * 2),
          DOE: Math.floor(50 + Math.random() * 12 + index * 1.5)
        }))
        setData(agencyData)
      } else {
        // Generate DoD sub-agency time-series data
        const dodData = months.map((month, index) => ({
          month,
          Army: Math.floor(120 + Math.random() * 20 + index * 3),
          Navy: Math.floor(110 + Math.random() * 18 + index * 2.5),
          'Air Force': Math.floor(100 + Math.random() * 15 + index * 2.5),
          'Defense Logistics': Math.floor(70 + Math.random() * 12 + index * 2)
        }))
        setData(dodData)
      }
    } catch (error) {
      console.error('Error fetching funding data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatBillion = (value: number) => `$${value}B`

  const getActiveKeys = () => {
    if (data.length === 0) return []
    const keys = Object.keys(data[0]).filter(key => key !== 'month')
    return keys
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'agencies' ? 'dod' : 'agencies')
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {viewMode === 'agencies' ? 'Agency Funding Trends (FY 2025)' : 'DoD Sub-Agency Funding Trends (FY 2025)'}
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">Loading funding data...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {viewMode === 'agencies' ? 'Agency Funding Trends (FY 2025)' : 'DoD Sub-Agency Funding Trends (FY 2025)'}
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No data available</div>
      </div>
    )
  }

  const activeKeys = getActiveKeys()

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          {viewMode === 'agencies' ? 'Agency Funding Trends (FY 2025)' : 'DoD Sub-Agency Funding Trends (FY 2025)'}
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleViewMode}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            {viewMode === 'agencies' ? 'View DoD Breakdown' : 'View All Agencies'}
          </button>
          <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            <span className="text-xs text-blue-700 font-semibold">Monthly Data</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            formatter={(value: number | undefined) => value !== undefined ? `$${value}B` : '$0B'}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '16px' }}
            iconType="line"
          />
          {activeKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={AGENCY_COLORS[key] || '#6b7280'}
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {viewMode === 'agencies' 
            ? 'Tracking top 6 federal agencies by contract funding volume'
            : 'Department of Defense funding allocation across military branches'}
        </p>
        {viewMode === 'agencies' && (
          <button
            onClick={toggleViewMode}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            Click to drill into DoD
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
