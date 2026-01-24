import { NextRequest, NextResponse } from 'next/server'
import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await getAuth(req)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      const client = await clerkClient()
      const clerkUser = await client.users.getUser(userId)
      
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
        },
        include: {
          subscriptions: true,
          notificationPrefs: true
        }
      })
    }
    
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
