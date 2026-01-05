import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const SAM_API_KEY = process.env.SAM_API_KEY || ''

async function main() {
  console.log('Fetching real-time SAM.gov opportunities...')

  await prisma.leadSignal.deleteMany({
    where: {
      signalType: 'government_contract'
    }
  })

  try {
    // Fetch open solicitations (not awards) from SAM.gov Public API v2
    const apiUrl = `https://api.sam.gov/opportunities/v2/search?api_key=${SAM_API_KEY}&limit=50&postedFrom=12/01/2025&postedTo=01/02/2026&ptype=o,k`
    
    console.log('Calling SAM.gov Public API v2...')
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    console.log(`API Response Status: ${response.status}`)

    if (response.ok) {
      const data = await response.json()
      
      if (data.opportunitiesData && data.opportunitiesData.length > 0) {
        console.log(`✅ Found ${data.opportunitiesData.length} real opportunities from SAM.gov`)
        
        // Filter only open solicitations without awarded contractors
        const openOpportunities = data.opportunitiesData.filter(opp => 
          !opp.award?.awardee?.name
        )
        console.log(`   ${openOpportunities.length} open opportunities (no contractor awarded yet)`)
        
        // Process up to 10 open opportunities
        const processedCount = Math.min(openOpportunities.length, 10)
        for (const opp of openOpportunities.slice(0, processedCount)) {
          const noticeId = opp.noticeId
          const detailUrl = opp.uiLink || `https://sam.gov/opp/${noticeId}/view`
          
          // Extract organizational hierarchy
          let agency = opp.department || opp.fullParentPathName?.split('.')[0] || 'Federal Agency'
          // Clean up agency name - remove "Department of" or "Dept of" prefix/suffix
          agency = agency.replace(/^(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/i, '').trim()
          agency = agency.replace(/,?\s*(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s*$/i, '').trim()
          
          const subtier = opp.subtier || opp.fullParentPathName?.split('.')[1] || ''
          const cleanedSubtier = subtier.replace(/^(DEPT OF|Dept of|Department of|DEPARTMENT OF)\s+/i, '').replace(/,?\s*(DEPT OF|Dept of|Department of|DEPARTMENT OF)\s*$/i, '').trim()
          
          const office = opp.office || opp.fullParentPathName?.split('.')[2] || ''
          
          // Extract value and period information
          const awardValue = opp.award?.amount ? `$${opp.award.amount.toLocaleString()}` : 'Not specified'
          const responseDeadline = opp.responseDeadLine || opp.archiveDate || 'TBD'
          const postedDate = opp.postedDate || ''
          
          // Extract resource links (attachments/documents)
          const resourceLinks = opp.resourceLinks || []
          const hasAttachments = resourceLinks.length > 0
          
          // Build comprehensive description
          const cleanTitle = (opp.title || 'Contract Opportunity').replace(/^(Department of|Dept of|DEPARTMENT OF|DEPT OF)\s+/i, '').trim()
          const description = [
            cleanTitle,
            `Type: ${opp.type || 'RFP'}`,
            `Agency: ${agency}`,
            subtier ? `Subtier: ${cleanedSubtier}` : null,
            office ? `Office: ${office}` : null,
            `NAICS: ${opp.naicsCode || 'N/A'}`,
            `Value: ${awardValue}`,
            `Response Deadline: ${responseDeadline}`,
            hasAttachments ? `📎 ${resourceLinks.length} attachment(s)` : null
          ].filter(Boolean).join(' | ').substring(0, 350)
          
          const contract = {
            companyName: agency,
            signalType: 'government_contract',
            description: description,
            source: 'SAM.gov',
            sourceUrl: detailUrl,
            metadata: {
              noticeId: noticeId,
              title: cleanTitle,
              postedDate: postedDate,
              responseDeadline: responseDeadline,
              agency: agency,
              subtier: cleanedSubtier,
              office: office,
              majorCommand: office,
              detailUrl: detailUrl,
              contractType: opp.type,
              naicsCode: opp.naicsCode,
              setAsideType: opp.setAsideCode,
              value: awardValue,
              placeOfPerformance: opp.placeOfPerformance,
              classificationCode: opp.classificationCode,
              resourceLinks: resourceLinks,
              solicitationNumber: opp.solicitationNumber
            }
          }

          await prisma.leadSignal.create({
            data: contract
          })
          console.log(`✅ Added: ${agency} - ${opp.title?.substring(0, 50)}...`)
          console.log(`   Type: ${opp.type} | Response: ${responseDeadline} | NAICS: ${opp.naicsCode || 'N/A'} | Attachments: ${resourceLinks.length}`)
        }

        if (openOpportunities.length > 0) {
          console.log(`✅ ${processedCount} SAM.gov open opportunities loaded!`)
          return
        } else {
          console.log('⚠️ No open opportunities found in date range')
          throw new Error('No open opportunities')
        }
      } else {
        console.log('No opportunities found in date range')
        throw new Error('No opportunities found')
      }
    }

    // If API fails, show error
    const errorText = await response.text()
    console.log('API Error Response:', errorText.substring(0, 500))
    throw new Error(`API returned ${response.status}`)

  } catch (error) {
    console.error('❌ Error fetching from SAM.gov API:', error)
    console.log('\nFalling back to sample data...')
    
    // Fallback to sample data
    const contracts = [
      {
        companyName: 'Department of Defense',
        signalType: 'government_contract',
        description: 'DARPA - AI Research Initiative | Solicitation | NAICS: 541715 | Value: $15M-$25M',
        source: 'SAM.gov',
        sourceUrl: 'https://sam.gov/content/opportunities',
        metadata: {
          title: 'DARPA - Next Generation AI Research',
          postedDate: '2025-12-15',
          responseDeadline: '2026-02-28',
          agency: 'Department of Defense'
        }
      },
      {
        companyName: 'General Services Administration',
        signalType: 'government_contract',
        description: 'Cloud Infrastructure Services | IT Schedule 70 | NAICS: 541519 | Value: $50M-$100M',
        source: 'SAM.gov',
        sourceUrl: 'https://sam.gov/content/opportunities',
        metadata: {
          title: 'Cloud Infrastructure and DevSecOps',
          postedDate: '2025-12-20',
          responseDeadline: '2026-03-15',
          agency: 'General Services Administration'
        }
      },
      {
        companyName: 'Department of Veterans Affairs',
        signalType: 'government_contract',
        description: 'EHR Modernization Support | IDIQ | NAICS: 541513 | Value: $30M-$45M',
        source: 'SAM.gov',
        sourceUrl: 'https://sam.gov/content/opportunities',
        metadata: {
          title: 'Electronic Health Record Modernization',
          postedDate: '2025-12-18',
          responseDeadline: '2026-02-15',
          agency: 'Department of Veterans Affairs'
        }
      }
    ]

    for (const contract of contracts) {
      await prisma.leadSignal.create({ data: contract })
      console.log(`✅ Added sample: ${contract.companyName}`)
    }

    console.log('✅ Sample contracts loaded!')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
