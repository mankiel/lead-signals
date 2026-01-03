import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding SAM.gov government contract signals...')

  const contracts = [
    {
      companyName: 'Department of Defense',
      signalType: 'government_contract',
      description: 'Solicitation: Advanced Aerospace Manufacturing Services - $50M contract opportunity for aerospace component manufacturing and assembly services.',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov',
      metadata: {
        contractType: 'Solicitation Notice',
        naicsCode: '336413',
        setAsideType: 'Small Business',
        responseDeadline: '2026-02-15',
        contactName: 'John Mitchell',
        contactEmail: 'john.mitchell@dod.gov',
        contactPhone: '(703) 555-0123'
      }
    },
    {
      companyName: 'NASA',
      signalType: 'government_contract',
      description: 'Award Notice: Lunar Surface Technology Development - $25M awarded for development of lunar exploration technologies and equipment.',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov',
      metadata: {
        contractType: 'Award Notice',
        awardAmount: '$25,000,000',
        awardDate: '2026-01-02',
        contractor: 'Redstone Aerospace Solutions',
        contactName: 'Sarah Williams',
        contactEmail: 'sarah.williams@nasa.gov',
        contactPhone: '(256) 555-0199'
      }
    },
    {
      companyName: 'U.S. Army Corps of Engineers',
      signalType: 'government_contract',
      description: 'Contract Posting: Infrastructure Modernization - Multi-year $75M opportunity for military base infrastructure upgrades and construction services.',
      source: 'SAM.gov',
      sourceUrl: 'https://sam.gov',
      metadata: {
        contractType: 'Contract Posting',
        naicsCode: '237310',
        placeOfPerformance: 'Huntsville, AL',
        contractPeriod: '5 years',
        contactName: 'Michael Rodriguez',
        contactEmail: 'm.rodriguez@usace.army.mil',
        contactPhone: '(256) 555-0287'
      }
    }
  ]

  for (const contract of contracts) {
    await prisma.leadSignal.create({
      data: contract
    })
    console.log(`✅ Added: ${contract.companyName} - ${contract.metadata.contractType}`)
  }

  console.log('✅ Government contract signals added!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
