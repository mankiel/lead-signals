import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding concept lead signals...')

  // First, check if we already have data
  const existingCount = await prisma.leadSignal.count()
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} signals. Deleting existing data...`)
    await prisma.leadSignal.deleteMany({})
  }

  // Add sample signals
  await prisma.leadSignal.create({
    data: {
      id: randomUUID(),
      companyName: 'Department of Defense',
      signalType: 'government_contract',
      description: 'Advanced Aerospace Technology Development - Seeking proposals for next-generation rocket propulsion systems',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/opp/huntsville-aerospace',
      metadata: {
        title: 'Advanced Aerospace Technology Development',
        contractType: 'Solicitation',
        agency: 'DEFENSE',
        subtier: 'The Air Force',
        office: 'The Air Force',
        value: '$15.0M',
        naicsCode: '336414',
        postedDate: new Date().toISOString(),
        responseDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Huntsville, AL'
      }
    }
  })

  await prisma.leadSignal.create({
    data: {
      id: randomUUID(),
      companyName: 'Department of Defense',
      signalType: 'government_contract',
      description: 'Aerospace Engineering Services for Redstone Arsenal defense contracts - seeking qualified contractors',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/opp/rocket-city-dynamics',
      metadata: {
        title: 'Aerospace Engineering Services',
        contractType: 'Sources Sought',
        agency: 'DEFENSE',
        subtier: 'The Army',
        office: 'The Army',
        naicsCode: '541330',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        responseDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Redstone Arsenal, AL'
      }
    }
  })

  await prisma.leadSignal.create({
    data: {
      id: randomUUID(),
      companyName: 'Department of Defense',
      signalType: 'government_contract',
      description: 'Defense Systems Integration - Combined Synopsis/Solicitation for mission-critical defense technology solutions',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/opp/alabama-defense',
      metadata: {
        title: 'Defense Systems Integration',
        contractType: 'Combined Synopsis/Solicitation',
        agency: 'DEFENSE',
        subtier: 'Defense Logistics Agency',
        office: 'Defense Logistics Agency',
        value: '$25.0M',
        naicsCode: '541512',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        responseDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Huntsville, AL'
      }
    }
  })

  await prisma.leadSignal.create({
    data: {
      id: randomUUID(),
      companyName: 'National Aeronautics and Space Administration',
      signalType: 'government_contract',
      description: 'Lunar Landing Technology Development - NASA seeks contractors for lunar landing technology at Marshall Space Flight Center',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/opp/nasa-spaceventures',
      metadata: {
        title: 'Lunar Landing Technology Development',
        contractType: 'Solicitation',
        agency: 'NASA',
        subtier: 'Marshall Space Flight Center',
        value: '$50.0M',
        naicsCode: '336414',
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        responseDeadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Huntsville, AL'
      }
    }
  })

  await prisma.leadSignal.create({
    data: {
      id: randomUUID(),
      companyName: 'Department of Defense',
      signalType: 'government_contract',
      description: 'Advanced Manufacturing Facility Requirements for defense technology production - presolicitation notice',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/opp/redstone-innovations',
      metadata: {
        title: 'Advanced Manufacturing Facility Requirements',
        contractType: 'Presolicitation',
        agency: 'DEFENSE',
        subtier: 'The Navy',
        office: 'The Navy',
        value: '$30.0M',
        naicsCode: '332710',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        responseDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Huntsville, AL'
      }
    }
  })

  const finalCount = await prisma.leadSignal.count()
  console.log(`✅ Successfully loaded ${finalCount} concept lead signals!`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Error loading data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
