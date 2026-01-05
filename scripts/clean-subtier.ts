import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clean() {
  const contracts = await prisma.leadSignal.findMany({
    where: { signalType: 'government_contract' }
  })
  
  for (const contract of contracts) {
    const metadata = contract.metadata as any
    let updated = false
    
    // Clean subtier
    if (metadata?.subtier) {
      let cleanSubtier = metadata.subtier
      // Remove "DEPT OF" or "Department of" prefix
      cleanSubtier = cleanSubtier.replace(/^(DEPT OF|Dept of|Department of|DEPARTMENT OF)\s+/i, '')
      // Remove suffix
      cleanSubtier = cleanSubtier.replace(/,?\s*(DEPT OF|Dept of|Department of|DEPARTMENT OF)\s*$/i, '')
      
      if (cleanSubtier !== metadata.subtier) {
        metadata.subtier = cleanSubtier
        updated = true
      }
    }
    
    // Update description to reflect clean subtier
    let description = contract.description
    if (description && metadata?.subtier) {
      description = description.replace(/Subtier:\s+DEPT OF\s+/gi, 'Subtier: ')
      description = description.replace(/Subtier:\s+([^|]+),\s*(DEPT OF|Department of|DEPARTMENT OF|Dept of)/gi, 'Subtier: $1')
    }
    
    if (updated || description !== contract.description) {
      await prisma.leadSignal.update({
        where: { id: contract.id },
        data: {
          metadata: metadata,
          description: description
        }
      })
      console.log(`✅ Cleaned subtier: ${metadata.title?.substring(0, 50)}`)
      console.log(`   Subtier: "${metadata.subtier}"`)
    }
  }
  
  console.log('Done!')
}

clean()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
