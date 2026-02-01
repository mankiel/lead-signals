import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

// GET - Fetch user's saved signals
export async function GET() {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        SavedSignal: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ savedSignals: [] })
    }

    return NextResponse.json({ savedSignals: user.SavedSignal })
  } catch (error) {
    console.error('Error fetching saved signals:', error)
    return NextResponse.json({ error: 'Failed to fetch saved signals' }, { status: 500 })
  }
}

// POST - Save a new signal
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { signalId, companyName, title, description, metadata, sourceUrl, notes } = body

    if (!signalId) {
      return NextResponse.json({ error: 'Signal ID is required' }, { status: 400 })
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { clerkId } })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          clerkId,
          email: `${clerkId}@placeholder.com`,
          updatedAt: new Date()
        }
      })
    }

    // Check if already saved
    const existing = await prisma.savedSignal.findUnique({
      where: {
        userId_signalId: {
          userId: user.id,
          signalId
        }
      }
    })

    if (existing) {
      return NextResponse.json({ error: 'Signal already saved', savedSignal: existing }, { status: 409 })
    }

    const savedSignal = await prisma.savedSignal.create({
      data: {
        userId: user.id,
        signalId,
        companyName: companyName || 'Unknown',
        title,
        description,
        metadata,
        sourceUrl,
        notes
      }
    })

    return NextResponse.json({ savedSignal }, { status: 201 })
  } catch (error) {
    console.error('Error saving signal:', error)
    return NextResponse.json({ error: 'Failed to save signal' }, { status: 500 })
  }
}

// DELETE - Remove a saved signal
export async function DELETE(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const signalId = searchParams.get('signalId')

    if (!signalId) {
      return NextResponse.json({ error: 'Signal ID is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { clerkId } })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await prisma.savedSignal.delete({
      where: {
        userId_signalId: {
          userId: user.id,
          signalId
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting saved signal:', error)
    return NextResponse.json({ error: 'Failed to delete saved signal' }, { status: 500 })
  }
}
