import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding Huntsville lead signals...')

  await prisma.leadSignal.create({
    data: {
      companyName: 'Huntsville Aerospace Tech',
      signalType: 'funding',
      description: 'Huntsville, Alabama-based aerospace company raised $15M Series A funding to expand rocket technology operations in the Rocket City',
      source: 'TechCrunch',
      sourceUrl: 'https://techcrunch.com'
    }
  })

  await prisma.leadSignal.create({
    data: {
      companyName: 'Rocket City Dynamics',
      signalType: 'job_posting',
      description: 'Hiring 50+ aerospace engineers in Huntsville, Alabama for defense contracts',
      source: 'LinkedIn'
    }
  })

  await prisma.leadSignal.create({
    data: {
      companyName: 'Alabama Defense Solutions',
      signalType: 'growth',
      description: 'Huntsville-based defense contractor announces 200% revenue growth, expanding Redstone Arsenal operations',
      source: 'Business Wire'
    }
  })

  console.log('✅ Huntsville lead signals added!')
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
