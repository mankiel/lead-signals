import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fix() {
  const contracts = await prisma.leadSignal.findMany({
    where: { 
      signalType: 'government_contract'
    }
  })
  
  for (const contract of contracts) {
    let description = contract.description
    
    // Clean up any remaining "Department of" in descriptions
    if (description && description.includes('epartment of')) {
      description = description.replace(/\b(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/gi, '')
      
      await prisma.leadSignal.update({
        where: { id: contract.id },
        data: { description }
      })
      
      const m = contract.metadata as any
      console.log(`✅ Fixed description for: ${m?.title?.substring(0, 50)}`)
    }
  }
  
  console.log('Done!')
}

fix()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
