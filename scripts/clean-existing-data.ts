import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanData() {
  const contracts = await prisma.leadSignal.findMany({
    where: { signalType: 'government_contract' }
  })

  console.log(`Cleaning ${contracts.length} government contracts...`)

  for (const contract of contracts) {
    const metadata = contract.metadata as any
    let updated = false

    // Clean agency name
    if (metadata?.agency) {
      let cleanAgency = metadata.agency
      // Remove prefix "Department of" or "Dept of"
      cleanAgency = cleanAgency.replace(/^(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/i, '').trim()
      // Remove suffix ", Department of" or ", Dept of"
      cleanAgency = cleanAgency.replace(/,?\s*(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s*$/i, '').trim()
      if (cleanAgency !== metadata.agency) {
        metadata.agency = cleanAgency
        updated = true
      }
    }

    // Clean title
    if (metadata?.title) {
      const cleanTitle = metadata.title.replace(/^(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/i, '').trim()
      if (cleanTitle !== metadata.title) {
        metadata.title = cleanTitle
        updated = true
      }
    }

    // Update companyName (which is the agency)
    let cleanCompanyName = contract.companyName
    if (cleanCompanyName) {
      cleanCompanyName = cleanCompanyName.replace(/^(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/i, '').trim()
      cleanCompanyName = cleanCompanyName.replace(/,?\s*(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s*$/i, '').trim()
    }

    // Update description
    let cleanDescription = contract.description
    if (cleanDescription) {
      cleanDescription = cleanDescription.replace(/Agency: (Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/gi, 'Agency: ')
      cleanDescription = cleanDescription.replace(/^(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/i, '')
    }

    if (updated || cleanCompanyName !== contract.companyName || cleanDescription !== contract.description) {
      await prisma.leadSignal.update({
        where: { id: contract.id },
        data: {
          companyName: cleanCompanyName,
          description: cleanDescription,
          metadata: metadata
        }
      })
      console.log(`✅ Cleaned: ${metadata.title}`)
    }
  }

  console.log('Done!')
}

cleanData()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
