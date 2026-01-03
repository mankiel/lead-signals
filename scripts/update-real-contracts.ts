import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Replacing with real government contracts...')

  // Delete existing government contracts
  await prisma.leadSignal.deleteMany({
    where: {
      signalType: 'government_contract'
    }
  })

  // Add government contract example using real SAM.gov URL structure
  // Note: Using SAM.gov search page as contracts expire and get removed regularly
  const realContracts = [
    {
      companyName: 'U.S. Army Corps of Engineers',
      signalType: 'government_contract',
      description: 'Construction - Heavy Construction Other Than Building Contract Opportunities. Browse active USACE infrastructure and construction projects nationwide.',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/search/?index=opp&page=1&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true&sfm%5BsimpleSearch%5D=usace',
      metadata: {
        contractType: 'Multiple Active Opportunities',
        naicsCode: '237990',
        setAsideType: 'Various',
        placeOfPerformance: 'Nationwide',
        contactName: 'USACE Contracting',
        contactEmail: 'usace.contracts@usace.army.mil',
        contactPhone: '(202) 761-0011'
      }
    },
    {
      companyName: 'National Aeronautics and Space Administration',
      signalType: 'government_contract',
      description: 'NASA Engineering and Research Services. Active opportunities for aerospace, research and development, and technical services.',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/search/?index=opp&page=1&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true&sfm%5BsimpleSearch%5D=nasa',
      metadata: {
        contractType: 'Multiple Opportunities',
        naicsCode: '541330',
        setAsideType: 'Various',
        placeOfPerformance: 'Multiple NASA Centers',
        contactName: 'NASA Procurement',
        contactEmail: 'nasa-procurement@nasa.gov',
        contactPhone: '(202) 358-0000'
      }
    },
    {
      companyName: 'General Services Administration',
      signalType: 'government_contract',
      description: 'GSA IT Professional Services Schedule (IT Schedule 70). Comprehensive IT solutions, cloud services, and cybersecurity offerings.',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov/search/?index=opp&page=1&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true&sfm%5BsimpleSearch%5D=gsa%20it%20schedule',
      metadata: {
        contractType: 'Schedule Contract',
        naicsCode: '541519',
        setAsideType: 'Open to All',
        placeOfPerformance: 'Federal Agencies Nationwide',
        contactName: 'GSA IT Schedule Team',
        contactEmail: 'schedules@gsa.gov',
        contactPhone: '(817) 850-6500'
      }
    }
  ]

  for (const contract of realContracts) {
    await prisma.leadSignal.create({
      data: contract
    })
    console.log(`✅ Added: ${contract.companyName}`)
  }

  console.log('✅ Real government contracts added!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
