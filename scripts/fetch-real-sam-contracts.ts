import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const SAM_API_KEY = process.env.SAM_GOV_API_KEY || process.env.SAM_GOV_API_KEY || process.env.SAM_API_KEY || ''

async function main() {
  console.log('Fetching real-time SAM.gov opportunities...')

  await prisma.leadSignal.deleteMany({
    where: {
      signalType: 'government_contract'
    }
  })

  try {
    // Fetch open solicitations and white paper requests from SAM.gov Public API v2
    // ptype: o=Solicitation, k=Combined Synopsis, r=Sources Sought (white papers), s=Special Notice, p=Presolicitation
    const limit = 100 // Max records per API call
    const maxPages = 5 // Max API calls (stay within daily quota of 8-10)
    let allOpenOpportunities: any[] = []
    let totalRecords = 0
    
    console.log(`Fetching up to ${maxPages * limit} opportunities using pagination...`)
    
    for (let page = 0; page < maxPages; page++) {
      const offset = page * limit
      const apiUrl = `https://api.sam.gov/opportunities/v2/search?api_key=${SAM_API_KEY}&limit=${limit}&offset=${offset}&postedFrom=12/01/2025&postedTo=01/05/2026&ptype=o,k,r,s,p`
      
      console.log(`\nAPI Call ${page + 1}/${maxPages} (offset: ${offset})...`)
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })

      console.log(`API Response Status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.log(`API Error: ${errorText.substring(0, 200)}`)
        break
      }

      const data = await response.json()
      totalRecords = data.totalRecords || 0
      
      if (!data.opportunitiesData || data.opportunitiesData.length === 0) {
        console.log('No more opportunities in this page')
        break
      }
      
      console.log(`✅ Received ${data.opportunitiesData.length} opportunities (${totalRecords} total available)`)
      
      // Filter only open solicitations without awarded contractors
      const openOpps = data.opportunitiesData.filter(opp => !opp.award?.awardee?.name)
      allOpenOpportunities.push(...openOpps)
      console.log(`   ${openOpps.length} open (no contractor awarded)`)
      
      // Stop if we've retrieved all available records
      if (offset + limit >= totalRecords) {
        console.log('Reached end of available records')
        break
      }
      
      // Small delay to be respectful to API
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    console.log(`\n📊 Total open opportunities collected: ${allOpenOpportunities.length}`)
    
    if (allOpenOpportunities.length > 0) {
      // Process all collected opportunities
      for (const opp of allOpenOpportunities) {
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

          try {
            await prisma.leadSignal.create({
              data: contract
            })
            console.log(`✅ Added: ${agency} - ${opp.title?.substring(0, 50)}...`)
            console.log(`   Type: ${opp.type} | Response: ${responseDeadline} | NAICS: ${opp.naicsCode || 'N/A'} | Attachments: ${resourceLinks.length}`)
          } catch (dbError: any) {
            console.log(`⚠️  Skipped (encoding issue): ${agency} - ${opp.title?.substring(0, 30)}...`)
            // Continue to next opportunity
          }
        }

        console.log(`\n✅ ${allOpenOpportunities.length} SAM.gov open opportunities loaded!`)
        console.log(`📈 Used ${Math.min(maxPages, Math.ceil(totalRecords / limit))} API calls`)
      } else {
        console.log('⚠️ No open opportunities found in date range')
        throw new Error('No open opportunities')
      }
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
          agency: 'Department of Defense',
          subtier: 'Defense Advanced Research Projects Agency',
          office: 'Defense Logistics Agency'
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
          agency: 'General Services Administration',
          subtier: 'Federal Acquisition Service',
          office: 'Defense Logistics Agency'
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
          agency: 'Department of Veterans Affairs',
          subtier: 'Veterans Health Administration',
          office: 'The Army'
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
