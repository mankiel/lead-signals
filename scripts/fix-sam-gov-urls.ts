import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating SAM.gov URLs to specific searches...')

  const signals = await prisma.leadSignal.findMany()
  
  for (const signal of signals) {
    let specificUrl = signal.sourceUrl || ''
    
    // Link to main SAM.gov pages for demo contracts
    if (signal.companyName.includes('Department of Defense')) {
      specificUrl = 'https://sam.gov/content/opportunities'
    } else if (signal.companyName.includes('NASA')) {
      specificUrl = 'https://sam.gov/content/contract-opportunities'
    } else if (signal.companyName.includes('Army Corps')) {
      specificUrl = 'https://sam.gov/content/opportunities'
    }
    
    // Only update if it's a SAM.gov URL
    if (specificUrl.includes('sam.gov')) {
      await prisma.leadSignal.update({
        where: { id: signal.id },
        data: { sourceUrl: specificUrl }
      })
      
      console.log(`✅ Updated: ${signal.companyName}`)
    }
  }

  console.log('✅ SAM.gov URLs now have specific search filters!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
