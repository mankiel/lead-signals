import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const contracts = await prisma.leadSignal.findMany({
    where: {
      signalType: 'government_contract'
    },
    select: {
      id: true,
      metadata: true
    }
  })
  
  console.log(`Total government contracts: ${contracts.length}`)
  
  if (contracts.length > 0) {
    const offices = contracts
      .map(c => c.metadata?.office)
      .filter(o => o)
    
    console.log(`Contracts with office data: ${offices.length}`)
    console.log('\nOffices found:')
    
    const officeCounts: Record<string, number> = {}
    offices.forEach(office => {
      if (office) {
        officeCounts[office] = (officeCounts[office] || 0) + 1
      }
    })
    
    Object.entries(officeCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([office, count]) => {
        console.log(`  ${office}: ${count}`)
      })
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
