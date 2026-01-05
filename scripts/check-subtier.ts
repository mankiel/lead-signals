import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  const contracts = await prisma.leadSignal.findMany({
    where: { signalType: 'government_contract' }
  })
  
  console.log('Current subtier values:')
  contracts.forEach(c => {
    const m = c.metadata as any
    if (m?.subtier) {
      console.log(`  "${m.subtier}"`)
    }
  })
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
