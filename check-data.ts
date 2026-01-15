import { prisma } from './lib/prisma'

async function main() {
  try {
    const count = await prisma.leadSignal.count()
    console.log('Total signals in database:', count)
    
    if (count > 0) {
      const signals = await prisma.leadSignal.findMany({ take: 3 })
      console.log('\nSample signals:')
      signals.forEach((signal, i) => {
        console.log(`\n${i + 1}. ${signal.companyName}`)
        console.log(`   Type: ${signal.signalType}`)
        console.log(`   Source: ${signal.source}`)
      })
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
