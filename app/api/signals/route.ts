import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    // Temporarily disable auth for testing
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
    
    // Build where clause with filters
    const andConditions: any[] = [
      {
        OR: allowedTypes.map(type => ({
          metadata: { path: ['contractType'], string_contains: type }
        }))
      }
    ]
    
    // Add signal type filter if specified
    if (signalType) {
      andConditions.push({ signalType })
    }
    
    // Add agency filter if specified
    if (agency === 'defense') {
      andConditions.push({
        OR: [
          { companyName: { contains: 'DEFENSE', mode: 'insensitive' } },
          { metadata: { path: ['agency'], string_contains: 'DEFENSE' } }
        ]
      })
    }
    
    const signals = await prisma.leadSignal.findMany({
      where: {
        AND: andConditions
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })
    
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
    // Temporarily disable auth for testing
    // const { userId } = await auth()
    
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await req.json()
    const { companyName, signalType, description, source, sourceUrl, metadata } = body
    
    if (!companyName || !signalType || !description || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const signal = await prisma.leadSignal.create({
      data: {
        companyName,
        signalType,
        description,
        source,
        sourceUrl,
        metadata
      }
    })
    
    return NextResponse.json({ signal }, { status: 201 })
  } catch (error) {
    console.error('Error creating signal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
