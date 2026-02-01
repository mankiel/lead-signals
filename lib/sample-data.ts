// Sample defense contract opportunities data
export const sampleSignals = [
  {
    id: '1',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Army seeking advanced tactical communications systems for deployment. Combined Synopsis/Solicitation for next-generation secure radio technology.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-28'),
    metadata: {
      contractType: 'Combined Synopsis/Solicitation',
      agency: 'Department of Defense',
      office: 'The Army',
      subtier: 'Army Contracting Command',
      value: 45000000,
      deadline: '2026-02-15',
      naicsCode: '334220',
      setAside: 'None',
      placeOfPerformance: 'Fort Bragg, NC'
    }
  },
  {
    id: '2',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Navy requires maintenance services for aircraft carrier systems. Sources Sought notice for qualified contractors with security clearance.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-27'),
    metadata: {
      contractType: 'Sources Sought',
      agency: 'Department of Defense',
      office: 'The Navy',
      subtier: 'Naval Sea Systems Command',
      value: 12000000,
      deadline: '2026-02-10',
      naicsCode: '336611',
      setAside: 'Small Business',
      placeOfPerformance: 'Norfolk, VA'
    }
  },
  {
    id: '3',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Air Force cybersecurity enhancement program. Presolicitation for enterprise-wide network security solutions.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-26'),
    metadata: {
      contractType: 'Presolicitation',
      agency: 'Department of Defense',
      office: 'The Air Force',
      subtier: 'Air Force Materiel Command',
      value: 78000000,
      deadline: '2026-03-01',
      naicsCode: '541512',
      setAside: 'None',
      placeOfPerformance: 'Scott AFB, IL'
    }
  },
  {
    id: '4',
    companyName: 'Defense Logistics Agency',
    signalType: 'government_contract',
    description: 'DLA energy division seeking fuel supply contract. Synopsis for multi-year petroleum products delivery.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-25'),
    metadata: {
      contractType: 'Synopsis',
      agency: 'Department of Defense',
      office: 'Defense Logistics Agency',
      subtier: 'Defense Logistics Agency Energy',
      value: 234000000,
      deadline: '2026-02-20',
      naicsCode: '424710',
      setAside: 'None',
      placeOfPerformance: 'Multiple Locations'
    }
  },
  {
    id: '5',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Army medical research equipment procurement. Solicitation for advanced diagnostic systems for field hospitals.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-24'),
    metadata: {
      contractType: 'Solicitation',
      agency: 'Department of Defense',
      office: 'The Army',
      subtier: 'Army Medical Command',
      value: 8500000,
      deadline: '2026-02-08',
      naicsCode: '339112',
      setAside: 'SDVOSB',
      placeOfPerformance: 'Fort Sam Houston, TX'
    }
  },
  {
    id: '6',
    companyName: 'Defense Information Systems Agency',
    signalType: 'government_contract',
    description: 'DISA cloud infrastructure modernization. Combined Synopsis/Solicitation for DoD cloud migration services.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-23'),
    metadata: {
      contractType: 'Combined Synopsis/Solicitation',
      agency: 'Department of Defense',
      office: 'Defense Information Systems Agency',
      subtier: 'Defense Information Systems Agency',
      value: 156000000,
      deadline: '2026-03-15',
      naicsCode: '518210',
      setAside: 'None',
      placeOfPerformance: 'Fort Meade, MD'
    }
  },
  {
    id: '7',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Navy submarine maintenance and repair. Sources Sought for qualified shipyard contractors.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-22'),
    metadata: {
      contractType: 'Sources Sought',
      agency: 'Department of Defense',
      office: 'The Navy',
      subtier: 'Naval Undersea Warfare Center',
      value: 98000000,
      deadline: '2026-02-25',
      naicsCode: '336611',
      setAside: 'None',
      placeOfPerformance: 'Groton, CT'
    }
  },
  {
    id: '8',
    companyName: 'National Geospatial-Intelligence Agency',
    signalType: 'government_contract',
    description: 'NGA geospatial analytics platform. Presolicitation for AI-powered mapping and intelligence systems.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-21'),
    metadata: {
      contractType: 'Presolicitation',
      agency: 'Department of Defense',
      office: 'National Geospatial-Intelligence Agency',
      subtier: 'National Geospatial-Intelligence Agency',
      value: 67000000,
      deadline: '2026-03-10',
      naicsCode: '541370',
      setAside: 'Small Business',
      placeOfPerformance: 'Springfield, VA'
    }
  },
  {
    id: '9',
    companyName: 'Defense Health Agency',
    signalType: 'government_contract',
    description: 'DHA medical supplies procurement. Synopsis for pharmaceutical and medical equipment delivery.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-20'),
    metadata: {
      contractType: 'Synopsis',
      agency: 'Department of Defense',
      office: 'Defense Health Agency',
      subtier: 'Defense Health Agency',
      value: 34000000,
      deadline: '2026-02-28',
      naicsCode: '424210',
      setAside: 'None',
      placeOfPerformance: 'Multiple MTFs'
    }
  },
  {
    id: '10',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Air Force drone surveillance systems. Special Notice for unmanned aerial vehicle procurement.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-19'),
    metadata: {
      contractType: 'Special Notice',
      agency: 'Department of Defense',
      office: 'The Air Force',
      subtier: 'Air Combat Command',
      value: 123000000,
      deadline: '2026-03-05',
      naicsCode: '336411',
      setAside: 'None',
      placeOfPerformance: 'Creech AFB, NV'
    }
  },
  {
    id: '11',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Army tactical vehicle armor upgrade. Solicitation for next-generation vehicle protection systems.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-18'),
    metadata: {
      contractType: 'Solicitation',
      agency: 'Department of Defense',
      office: 'The Army',
      subtier: 'Tank-automotive and Armaments Command',
      value: 89000000,
      deadline: '2026-02-18',
      naicsCode: '336992',
      setAside: 'None',
      placeOfPerformance: 'Detroit Arsenal, MI'
    }
  },
  {
    id: '12',
    companyName: 'Defense Logistics Agency',
    signalType: 'government_contract',
    description: 'DLA uniform and textile procurement. Combined Synopsis/Solicitation for military apparel manufacturing.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-17'),
    metadata: {
      contractType: 'Combined Synopsis/Solicitation',
      agency: 'Department of Defense',
      office: 'Defense Logistics Agency',
      subtier: 'Defense Logistics Agency Troop Support',
      value: 56000000,
      deadline: '2026-02-22',
      naicsCode: '315220',
      setAside: 'Small Business',
      placeOfPerformance: 'Philadelphia, PA'
    }
  }
]
