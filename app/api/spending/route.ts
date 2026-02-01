import { NextResponse } from 'next/server'

interface SpendingByAgency {
  name: string
  code: string
  amount: number
  id: number
}

interface AgencyBudgetaryResources {
  agency_budgetary_resources: number
  agency_total_obligated: number
  fiscal_year: number
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fiscalYear = searchParams.get('fiscal_year') || '2024'
  const type = searchParams.get('type') || 'agencies' // agencies, subtiers

  try {
    if (type === 'agencies') {
      // Get spending by awarding agency
      const response = await fetch('https://api.usaspending.gov/api/v2/spending/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'agency',
          filters: {
            fy: fiscalYear,
            quarter: '4' // Full year data
          }
        })
      })

      if (!response.ok) {
        // Fallback to agency overview endpoint
        const overviewResponse = await fetch(
          `https://api.usaspending.gov/api/v2/financial_balances/agencies/?fiscal_year=${fiscalYear}&funding_agency_id=all`
        )
        
        if (!overviewResponse.ok) {
          throw new Error('Failed to fetch spending data')
        }
        
        const overviewData = await overviewResponse.json()
        return NextResponse.json({
          fiscal_year: fiscalYear,
          results: overviewData.results || []
        })
      }

      const data = await response.json()
      return NextResponse.json({
        fiscal_year: fiscalYear,
        results: data.results || []
      })
    }

    if (type === 'toptier_agencies') {
      // Get list of toptier agencies with their budgetary resources
      const response = await fetch('https://api.usaspending.gov/api/v2/references/toptier_agencies/')
      
      if (!response.ok) {
        throw new Error('Failed to fetch toptier agencies')
      }
      
      const data = await response.json()
      return NextResponse.json({
        fiscal_year: fiscalYear,
        results: data.results || []
      })
    }

    if (type === 'agency_budgetary') {
      const agencyCode = searchParams.get('agency_code') || '097' // Default to DoD
      
      // Get budgetary resources for specific agency over multiple years
      const response = await fetch(
        `https://api.usaspending.gov/api/v2/agency/${agencyCode}/budgetary_resources/`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch agency budgetary resources')
      }
      
      const data = await response.json()
      return NextResponse.json({
        agency_code: agencyCode,
        results: data.agency_data_by_year || []
      })
    }

    if (type === 'subtiers') {
      const agencyCode = searchParams.get('agency_code') || '097' // Default to DoD
      
      // Get sub-agency breakdown
      const response = await fetch(
        `https://api.usaspending.gov/api/v2/agency/${agencyCode}/sub_agency/?fiscal_year=${fiscalYear}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch sub-agency data')
      }
      
      const data = await response.json()
      return NextResponse.json({
        fiscal_year: fiscalYear,
        agency_code: agencyCode,
        results: data.results || []
      })
    }

    if (type === 'fiscal_years') {
      // Get historical spending by year using spending over time endpoint
      const currentYear = new Date().getFullYear()
      const years = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear]
      
      const response = await fetch('https://api.usaspending.gov/api/v2/search/spending_over_time/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group: 'fiscal_year',
          filters: {
            time_period: years.map(year => ({
              start_date: `${year}-10-01`,
              end_date: `${year + 1}-09-30`
            })),
            award_type_codes: ['A', 'B', 'C', 'D'] // Contracts only
          }
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch spending over time')
      }
      
      const data = await response.json()
      return NextResponse.json({
        results: data.results || []
      })
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })

  } catch (error) {
    console.error('Spending API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch spending data' },
      { status: 500 }
    )
  }
}
