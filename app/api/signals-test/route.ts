import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const signals = await prisma.leadSignal.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    
    return NextResponse.json({ 
      count: signals.length,
      signals 
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
