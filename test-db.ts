import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.leadSignal.count()
  console.log(`Total signals in database: ${count}`)
  
  const defenseCount = await prisma.leadSignal.count({
    where: {
      OR: [
        { companyName: { contains: 'DEFENSE', mode: 'insensitive' } },
        { metadata: { path: ['agency'], string_contains: 'DEFENSE' } }
      ]
    }
  })
  console.log(`Defense signals: ${defenseCount}`)
  
  const sample = await prisma.leadSignal.findFirst({
    where: {
      metadata: { path: ['agency'], string_contains: 'DEFENSE' }
    }
  })
  console.log(`Sample signal:`, sample?.companyName, sample?.metadata)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
