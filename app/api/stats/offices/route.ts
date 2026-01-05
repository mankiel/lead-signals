import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get all government contract signals
    const signals = await prisma.leadSignal.findMany({
      where: {
        signalType: 'government_contract'
      },
      select: {
        metadata: true
      }
    })

    // Aggregate by office
    const officeCounts: Record<string, number> = {}
    
    signals.forEach((signal) => {
      const metadata = signal.metadata as any
      const office = metadata?.office || metadata?.agency || 'Unknown'
      officeCounts[office] = (officeCounts[office] || 0) + 1
    })

    // Convert to array and sort by count
    const data = Object.entries(officeCounts)
      .map(([office, count]) => ({ office, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // Top 10 offices

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching office stats:', error)
    return NextResponse.json({ data: [] })
  }
}
