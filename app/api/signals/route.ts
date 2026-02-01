import { NextRequest, NextResponse } from 'next/server'
// import { auth } from '@clerk/nextjs/server'
// import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import { sampleSignals } from '@/lib/sample-data'

export async function GET(req: NextRequest) {
  try {
    // Auth disabled - using sample data
    // const { userId } = await auth()
    
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(req.url)
    const signalType = searchParams.get('type')
    const agency = searchParams.get('agency') // 'defense', 'all', or null
    const limit = parseInt(searchParams.get('limit') || '50')
    
    // Filter for specific solicitation types
    const allowedTypes = [
      'Solicitation',
      'Sources Sought',
      'Synopsis',
      'Presolicitation', 
      'Combined Synopsis/Solicitation',
      'Special Notice'
    ]
    
    // Use sample data instead of database
    let signals = [...sampleSignals]
    
    // Filter by signal type if specified
    if (signalType) {
      signals = signals.filter(s => s.signalType === signalType)
    }
    
    // Filter by agency if specified
    if (agency === 'defense') {
      signals = signals.filter(s => 
        s.companyName.toLowerCase().includes('defense') ||
        s.metadata?.agency?.toLowerCase().includes('defense')
      )
    }
    
    // Filter by allowed contract types
    signals = signals.filter(s => 
      s.metadata?.contractType && allowedTypes.includes(s.metadata.contractType)
    )
    
    // Apply limit
    signals = signals.slice(0, limit)
    
    return NextResponse.json({ signals })
  } catch (error) {
    console.error('Error fetching signals:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : '') : undefined
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Auth disabled - using sample data
    // const { userId } = await auth()
    
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await req.json()
    const { companyName, signalType, description, source, sourceUrl, metadata } = body
    
    if (!companyName || !signalType || !description || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Return mock signal - database write disabled
    const signal = {
      id: randomUUID(),
      companyName,
      signalType,
      description,
      source,
      sourceUrl,
      metadata,
      createdAt: new Date()
    }
    
    return NextResponse.json({ signal }, { status: 201 })
  } catch (error) {
    console.error('Error creating signal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
