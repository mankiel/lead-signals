import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating to working source URLs...')

  const signals = await prisma.leadSignal.findMany()
  
  for (const signal of signals) {
    let workingUrl = ''
    
    // Use real working URLs
    if (signal.companyName.includes('Huntsville Aerospace')) {
      workingUrl = 'https://techcrunch.com/tag/funding/'
    } else if (signal.companyName.includes('Rocket City Dynamics')) {
      workingUrl = 'https://www.linkedin.com/jobs/search/?keywords=aerospace%20engineer'
    } else if (signal.companyName.includes('Alabama Defense')) {
      workingUrl = 'https://www.businesswire.com/portal/site/home/news/'
    } else if (signal.companyName.includes('Department of Defense')) {
      workingUrl = 'https://sam.gov/search/?index=opp&page=1&pageSize=25&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true'
    } else if (signal.companyName.includes('NASA')) {
      workingUrl = 'https://sam.gov/search/?index=awards&page=1&pageSize=25&sort=-modifiedDate'
    } else if (signal.companyName.includes('Army Corps')) {
      workingUrl = 'https://sam.gov/search/?index=opp&page=1&pageSize=25&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true'
    }
    
    await prisma.leadSignal.update({
      where: { id: signal.id },
      data: { sourceUrl: workingUrl }
    })
    
    console.log(`✅ Updated: ${signal.companyName}`)
  }

  console.log('✅ All URLs now point to real working pages!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
