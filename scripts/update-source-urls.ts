import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating source URLs to specific pages...')

  // Update Huntsville signals with specific URLs
  const signals = await prisma.leadSignal.findMany()
  
  for (const signal of signals) {
    let specificUrl = signal.sourceUrl || ''
    
    // Generate specific URLs based on signal type and company
    if (signal.companyName.includes('Huntsville Aerospace')) {
      specificUrl = 'https://techcrunch.com/2026/01/02/huntsville-aerospace-raises-15m'
    } else if (signal.companyName.includes('Rocket City Dynamics')) {
      specificUrl = 'https://linkedin.com/jobs/rocket-city-dynamics-hiring-engineers'
    } else if (signal.companyName.includes('Alabama Defense')) {
      specificUrl = 'https://businesswire.com/alabama-defense-solutions-growth'
    } else if (signal.companyName.includes('Department of Defense')) {
      specificUrl = 'https://sam.gov/opp/336413-aerospace-manufacturing-services/view'
    } else if (signal.companyName.includes('NASA')) {
      specificUrl = 'https://sam.gov/awards/lunar-surface-technology-25m/view'
    } else if (signal.companyName.includes('Army Corps')) {
      specificUrl = 'https://sam.gov/opp/237310-infrastructure-modernization-huntsville/view'
    }
    
    await prisma.leadSignal.update({
      where: { id: signal.id },
      data: { sourceUrl: specificUrl }
    })
    
    console.log(`✅ Updated: ${signal.companyName}`)
  }

  console.log('✅ Source URLs updated!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
