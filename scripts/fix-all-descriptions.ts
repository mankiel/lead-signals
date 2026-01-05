import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fix() {
  const contracts = await prisma.leadSignal.findMany({
    where: { signalType: 'government_contract' }
  })
  
  for (const contract of contracts) {
    let description = contract.description
    
    if (description) {
      const original = description
      
      // Remove "Agency: [something], DEPARTMENT OF"
      description = description.replace(/Agency:\s+([^|]+),\s*(Department of|Dept of|DEPARTMENT OF|DEPT OF)/gi, 'Agency: $1')
      
      // Remove "Subtier: [something], DEPARTMENT OF" or ", DE..."
      description = description.replace(/Subtier:\s+([^|]+),\s*(Department of|Dept of|DEPARTMENT OF|DEPT OF|DE[A-Z]*)/gi, 'Subtier: $1')
      
      // General cleanup of ", DEPARTMENT OF" or ", DEPT OF"
      description = description.replace(/,\s*(Department of|Dept of|DEPARTMENT OF|DEPT OF)/gi, '')
      
      if (description !== original) {
        await prisma.leadSignal.update({
          where: { id: contract.id },
          data: { description }
        })
        
        const m = contract.metadata as any
        console.log(`✅ Fixed: ${m?.title?.substring(0, 60)}`)
        console.log(`   Old: ${original.substring(0, 120)}...`)
        console.log(`   New: ${description.substring(0, 120)}...`)
      }
    }
  }
  
  console.log('Done!')
}

fix()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
