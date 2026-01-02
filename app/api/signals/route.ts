import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await getAuth(req)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const signalType = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const where = signalType ? { signalType } : {}
    
    const signals = await prisma.leadSignal.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit
    })
    
    return NextResponse.json({ signals })
  } catch (error) {
    console.error('Error fetching signals:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await getAuth(req)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
