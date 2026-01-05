import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  const contracts = await prisma.leadSignal.findMany({
    where: { 
      signalType: 'government_contract',
      metadata: {
        path: ['agency'],
        string_contains: 'VETERANS'
      }
    }
  })
  
  console.log('Veterans Affairs contracts:')
  contracts.forEach(c => {
    const m = c.metadata as any
    console.log(`\nTitle: ${m?.title}`)
    console.log(`Agency: "${m?.agency}"`)
    console.log(`CompanyName: "${c.companyName}"`)
    console.log(`Description: ${c.description?.substring(0, 150)}`)
  })
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
