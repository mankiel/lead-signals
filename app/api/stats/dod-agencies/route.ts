import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const response = await fetch(
      'https://api.usaspending.gov/api/v2/agency/097/sub_agency/?fiscal_year=2025&limit=50'
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch DoD sub-agency data')
    }
    
    const result = await response.json()
    
    // Filter and format the data
    const dodData = result.results
      .filter((agency: any) => agency.total_obligations > 0)
      .map((agency: any) => ({
        name: agency.abbreviation || agency.name.substring(0, 20),
        fullName: agency.name,
        total_obligations: Math.round(agency.total_obligations / 1000000000)
      }))
      .sort((a: any, b: any) => b.total_obligations - a.total_obligations)
      .slice(0, 15) // Top 15 DoD agencies
    
    return NextResponse.json({ data: dodData })
  } catch (error) {
    console.error('Error fetching DoD agencies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch DoD agencies' },
      { status: 500 }
    )
  }
}
