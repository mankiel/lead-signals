const SAM_API_KEY = process.env.SAM_API_KEY || ''

async function exploreSamApi() {
  const apiUrl = `https://api.sam.gov/opportunities/v2/search?api_key=${SAM_API_KEY}&limit=20&postedFrom=12/01/2025&postedTo=01/02/2026&ptype=o,k`
  
  const response = await fetch(apiUrl)
  const data = await response.json()
  
  if (data.opportunitiesData && data.opportunitiesData.length > 0) {
    console.log(`Found ${data.opportunitiesData.length} opportunities\n`)
    
    for (const opp of data.opportunitiesData) {
      if (opp.resourceLinks && opp.resourceLinks.length > 0) {
        console.log('=== Opportunity with resourceLinks ===')
        console.log('Notice ID:', opp.noticeId)
        console.log('Title:', opp.title)
        console.log('Type:', opp.type)
        console.log('Resource Links:', JSON.stringify(opp.resourceLinks, null, 2))
        console.log('\n')
      }
      
      if (opp.additionalInfoLink) {
        console.log('=== Opportunity with additionalInfoLink ===')
        console.log('Notice ID:', opp.noticeId)
        console.log('Title:', opp.title)
        console.log('Additional Info Link:', opp.additionalInfoLink)
        console.log('\n')
      }
    }
    
    // Also check for any field containing "contract"
    const firstOpp = data.opportunitiesData[0]
    console.log('\n=== All fields ===')
    for (const key in firstOpp) {
      if (key.toLowerCase().includes('contract') || key.toLowerCase().includes('type')) {
        console.log(`${key}:`, firstOpp[key])
      }
    }
  }
}

exploreSamApi()
