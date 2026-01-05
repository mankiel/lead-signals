import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  const contracts = await prisma.leadSignal.findMany({
    where: { signalType: 'government_contract' }
  })
  
  console.log('Current agency names:')
  contracts.forEach(c => {
    const m = c.metadata as any
    console.log(`  "${m?.agency || 'N/A'}"`)
  })
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
