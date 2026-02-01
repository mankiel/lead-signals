import { NextRequest, NextResponse } from 'next/server'
// import { getAuth, clerkClient } from '@clerk/nextjs/server'
// import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export async function GET(req: NextRequest) {
  try {
    // Auth disabled - return mock user
    // const { userId } = await getAuth(req)
    
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const user = {
      id: randomUUID(),
      clerkId: 'demo-user',
      email: 'demo@example.com',
      name: 'Demo User',
      subscriptions: [],
      notificationPrefs: null
    }
    
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
