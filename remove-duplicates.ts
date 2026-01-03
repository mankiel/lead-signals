import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
})

async function main() {
  // Get all signals
  const signals = await prisma.leadSignal.findMany({
    orderBy: { createdAt: 'asc' }
  })
  
  console.log(`Found ${signals.length} signals total`)
  
  // Keep only the first 3 (delete duplicates)
  const toDelete = signals.slice(3)
  
  for (const signal of toDelete) {
    await prisma.leadSignal.delete({ where: { id: signal.id } })
    console.log(`Deleted: ${signal.companyName}`)
  }
  
  console.log('✅ Duplicates removed!')
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
