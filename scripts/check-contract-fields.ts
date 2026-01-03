const SAM_API_KEY = 'SAM-f06affbc-a655-4f72-abfe-a3777ad49b0d'

async function checkFields() {
  // Get a single opportunity with full details
  const apiUrl = `https://api.sam.gov/opportunities/v2/search?api_key=${SAM_API_KEY}&limit=1&noticeid=f25d685f6fdd4e5cab748fbb02cb7bcb`
  
  const response = await fetch(apiUrl)
  const data = await response.json()
  
  if (data.opportunitiesData && data.opportunitiesData.length > 0) {
    const opp = data.opportunitiesData[0]
    
    console.log('=== All Fields ===')
    Object.keys(opp).sort().forEach(key => {
      console.log(`${key}:`, JSON.stringify(opp[key], null, 2).substring(0, 200))
    })
  }
}

checkFields()
