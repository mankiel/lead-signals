import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const contracts = await prisma.leadSignal.findMany({
      where: {
        signalType: 'government_contract'
      },
      select: {
        metadata: true
      }
    })

    const now = new Date()
    const buckets = {
      '0-7 days': 0,
      '8-14 days': 0,
      '15-21 days': 0,
      '22-30 days': 0
    }

    contracts.forEach((contract) => {
      const metadata = contract.metadata as any
      if (metadata?.responseDeadline) {
        const deadline = new Date(metadata.responseDeadline)
        const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        
        // Only count if less than 30 days and not expired
        if (daysRemaining > 0 && daysRemaining <= 30) {
          if (daysRemaining <= 7) {
            buckets['0-7 days']++
          } else if (daysRemaining <= 14) {
            buckets['8-14 days']++
          } else if (daysRemaining <= 21) {
            buckets['15-21 days']++
          } else {
            buckets['22-30 days']++
          }
        }
      }
    })

    const data = Object.entries(buckets).map(([range, count]) => ({
      range,
      count
    }))

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching deadline stats:', error)
    return NextResponse.json({ data: [] })
  }
}
