import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres:sumbuK-xonko3-sezwor@db.affkhjhyyrqmibqocohv.supabase.co:5432/postgres?sslmode=require"
})

async function main() {
  const signals = await prisma.leadSignal.findMany()
  console.log('Total signals in database:', signals.length)
  signals.forEach(s => {
    console.log(`- ${s.companyName} (${s.signalType})`)
  })
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
