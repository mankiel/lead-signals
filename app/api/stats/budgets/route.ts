import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const response = await fetch('https://api.usaspending.gov/api/v2/references/toptier_agencies/')
    const result = await response.json()
    
    // Filter to relevant agencies and format data
    const relevantAgencies = ['DOD', 'VA', 'DHS', 'DOI', 'HHS', 'NASA', 'EPA', 'USDA', 'STATE', 'USPS']
    const budgetData = result.results
      .filter((agency: any) => relevantAgencies.includes(agency.abbreviation))
      .map((agency: any) => ({
        name: agency.abbreviation,
        budget_authority: Math.round(agency.budget_authority_amount / 1000000000), // Convert to billions
        obligated: Math.round(agency.obligated_amount / 1000000000),
        outlay: Math.round(agency.outlay_amount / 1000000000)
      }))
      .sort((a, b) => b.budget_authority - a.budget_authority)

    return NextResponse.json({ data: budgetData })
  } catch (error) {
    console.error('Error fetching agency budgets:', error)
    return NextResponse.json({ error: 'Failed to fetch agency budgets' }, { status: 500 })
  }
}
