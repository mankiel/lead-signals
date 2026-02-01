// Sample defense contract opportunities data
// Deadlines are spread across different timeframes for chart visualization
const today = new Date('2026-01-31');
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

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
      title: 'Advanced Tactical Communications Systems',
      value: 45000000,
      deadline: '2026-02-15',
      responseDeadline: addDays(today, 15), // 15 days - Soon
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
      responseDeadline: addDays(today, 10), // 10 days - Soon
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
      responseDeadline: addDays(today, 29), // 29 days - Soon
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
      title: 'Multi-Year Petroleum Products Delivery',
      deadline: '2026-02-20',
      responseDeadline: addDays(today, 45), // 45 days - Mid-term (31-60)
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
      responseDeadline: addDays(today, 8), // 8 days - Soon
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
      title: 'DoD Cloud Migration Services',
      deadline: '2026-03-15',
      responseDeadline: addDays(today, 55), // 55 days - Mid-term (31-60)
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
      responseDeadline: addDays(today, 25), // 25 days - Soon
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
      responseDeadline: addDays(today, 70), // 70 days - Mid-term (61-90)
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
      responseDeadline: addDays(today, 28), // 28 days - Soon
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
      responseDeadline: addDays(today, 5), // 5 days - Urgent
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
      responseDeadline: addDays(today, 18), // 18 days - Soon
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
      responseDeadline: addDays(today, 95), // 95 days - Later (91+)
      naicsCode: '315220',
      setAside: 'Small Business',
      placeOfPerformance: 'Philadelphia, PA'
    }
  },
  {
    id: '13',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Navy shipboard training systems upgrade. Solicitation for virtual reality training platforms.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-16'),
    metadata: {
      contractType: 'Solicitation',
      agency: 'Department of Defense',
      office: 'The Navy',
      subtier: 'Naval Air Systems Command',
      value: 42000000,
      deadline: '2026-02-14',
      responseDeadline: addDays(today, 3), // 3 days - Urgent
      naicsCode: '541512',
      setAside: 'None',
      placeOfPerformance: 'San Diego, CA'
    }
  },
  {
    id: '14',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Army engineering services for base infrastructure. Sources Sought for construction management.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-16'),
    metadata: {
      contractType: 'Sources Sought',
      agency: 'Department of Defense',
      office: 'The Army',
      subtier: 'Army Corps of Engineers',
      value: 65000000,
      deadline: '2026-03-01',
      responseDeadline: addDays(today, 62), // 62 days - Mid-term (61-90)
      naicsCode: '237990',
      setAside: 'None',
      placeOfPerformance: 'Multiple CONUS'
    }
  },
  {
    id: '15',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Air Force satellite communications upgrade. Presolicitation for space-based communication systems.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-15'),
    metadata: {
      contractType: 'Presolicitation',
      agency: 'Department of Defense',
      office: 'The Air Force',
      subtier: 'Space Force',
      value: 189000000,
      title: 'Space-Based Communication Systems',
      deadline: '2026-03-20',
      responseDeadline: addDays(today, 100), // 100 days - Later (91+)
      naicsCode: '517410',
      setAside: 'None',
      placeOfPerformance: 'Colorado Springs, CO'
    }
  },
  {
    id: '16',
    companyName: 'Defense Logistics Agency',
    signalType: 'government_contract',
    description: 'DLA Aviation parts procurement. Synopsis for aircraft spare parts supply chain.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-15'),
    metadata: {
      contractType: 'Synopsis',
      agency: 'Department of Defense',
      office: 'Defense Logistics Agency',
      subtier: 'Defense Logistics Agency Aviation',
      value: 145000000,
      title: 'Aircraft Spare Parts Supply Chain',
      deadline: '2026-02-28',
      responseDeadline: addDays(today, 38), // 38 days - Mid-term (31-60)
      naicsCode: '336413',
      setAside: 'None',
      placeOfPerformance: 'Richmond, VA'
    }
  },
  {
    id: '17',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Marine Corps combat training center modernization. Combined Synopsis/Solicitation for simulation systems.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-14'),
    metadata: {
      contractType: 'Combined Synopsis/Solicitation',
      agency: 'Department of Defense',
      office: 'The Navy',
      subtier: 'Marine Corps Systems Command',
      value: 71000000,
      deadline: '2026-02-25',
      responseDeadline: addDays(today, 12), // 12 days - Soon
      naicsCode: '541519',
      setAside: 'Small Business',
      placeOfPerformance: 'Twentynine Palms, CA'
    }
  },
  {
    id: '18',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Army intelligence systems integration. Solicitation for ISR platform development.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-14'),
    metadata: {
      contractType: 'Solicitation',
      agency: 'Department of Defense',
      office: 'The Army',
      subtier: 'Army Intelligence and Security Command',
      value: 92000000,
      deadline: '2026-03-05',
      responseDeadline: addDays(today, 75), // 75 days - Mid-term (61-90)
      naicsCode: '541513',
      setAside: 'None',
      placeOfPerformance: 'Fort Belvoir, VA'
    }
  },
  {
    id: '19',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Air Force aircraft maintenance services. Sources Sought for F-35 maintenance support.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-13'),
    metadata: {
      contractType: 'Sources Sought',
      agency: 'Department of Defense',
      office: 'The Air Force',
      subtier: 'Air Force Life Cycle Management Center',
      value: 156000000,
      title: 'F-35 Aircraft Maintenance Support',
      deadline: '2026-03-10',
      responseDeadline: addDays(today, 21), // 21 days - Soon
      naicsCode: '336412',
      setAside: 'None',
      placeOfPerformance: 'Hill AFB, UT'
    }
  },
  {
    id: '20',
    companyName: 'Defense Logistics Agency',
    signalType: 'government_contract',
    description: 'DLA Land and Maritime equipment procurement. Presolicitation for ground vehicle parts.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-13'),
    metadata: {
      contractType: 'Presolicitation',
      agency: 'Department of Defense',
      office: 'Defense Logistics Agency',
      subtier: 'Defense Logistics Agency Land and Maritime',
      value: 87000000,
      deadline: '2026-02-26',
      responseDeadline: addDays(today, 6), // 6 days - Urgent
      naicsCode: '336399',
      setAside: 'Small Business',
      placeOfPerformance: 'Columbus, OH'
    }
  },
  {
    id: '21',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Navy submarine combat systems. Special Notice for advanced sonar technology.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-12'),
    metadata: {
      contractType: 'Special Notice',
      agency: 'Department of Defense',
      office: 'The Navy',
      subtier: 'Naval Supply Systems Command',
      value: 134000000,
      title: 'Advanced Sonar Technology',
      deadline: '2026-03-15',
      responseDeadline: addDays(today, 48), // 48 days - Mid-term (31-60)
      naicsCode: '334511',
      setAside: 'None',
      placeOfPerformance: 'Mechanicsburg, PA'
    }
  },
  {
    id: '22',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Army ammunition procurement. Synopsis for small arms ammunition manufacturing.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-12'),
    metadata: {
      contractType: 'Synopsis',
      agency: 'Department of Defense',
      office: 'The Army',
      subtier: 'Joint Munitions Command',
      value: 198000000,
      title: 'Small Arms Ammunition Manufacturing',
      deadline: '2026-02-29',
      responseDeadline: addDays(today, 110), // 110 days - Later (91+)
      naicsCode: '332993',
      setAside: 'None',
      placeOfPerformance: 'Lake City, MO'
    }
  },
  {
    id: '23',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Air Force base operations support. Combined Synopsis/Solicitation for facility maintenance.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-11'),
    metadata: {
      contractType: 'Combined Synopsis/Solicitation',
      agency: 'Department of Defense',
      office: 'The Air Force',
      subtier: 'Air Force Installation Contracting Agency',
      value: 54000000,
      deadline: '2026-02-21',
      responseDeadline: addDays(today, 20), // 20 days - Soon
      naicsCode: '561210',
      setAside: 'Small Business',
      placeOfPerformance: 'Joint Base San Antonio, TX'
    }
  },
  {
    id: '24',
    companyName: 'Defense Logistics Agency',
    signalType: 'government_contract',
    description: 'DLA medical supplies for overseas operations. Solicitation for pharmaceutical distribution.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-11'),
    metadata: {
      contractType: 'Solicitation',
      agency: 'Department of Defense',
      office: 'Defense Logistics Agency',
      subtier: 'Defense Logistics Agency Disposition Services',
      value: 76000000,
      deadline: '2026-03-01',
      responseDeadline: addDays(today, 85), // 85 days - Mid-term (61-90)
      naicsCode: '424210',
      setAside: 'None',
      placeOfPerformance: 'Battle Creek, MI'
    }
  },
  {
    id: '25',
    companyName: 'Missile Defense Agency',
    signalType: 'government_contract',
    description: 'MDA radar systems upgrade. Presolicitation for ground-based interceptor radar.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-10'),
    metadata: {
      contractType: 'Presolicitation',
      agency: 'Department of Defense',
      office: 'Missile Defense Agency',
      subtier: 'Missile Defense Agency',
      value: 267000000,
      title: 'Ground-Based Interceptor Radar Systems',
      deadline: '2026-03-25',
      responseDeadline: addDays(today, 2), // 2 days - Urgent
      naicsCode: '334511',
      setAside: 'None',
      placeOfPerformance: 'Huntsville, AL'
    }
  },
  {
    id: '26',
    companyName: 'Defense Contract Management Agency',
    signalType: 'government_contract',
    description: 'DCMA quality assurance services. Sources Sought for contractor oversight.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-10'),
    metadata: {
      contractType: 'Sources Sought',
      agency: 'Department of Defense',
      office: 'Defense Contract Management Agency',
      subtier: 'Defense Contract Management Agency',
      value: 38000000,
      deadline: '2026-02-18',
      responseDeadline: addDays(today, 52), // 52 days - Mid-term (31-60)
      naicsCode: '541614',
      setAside: 'Small Business',
      placeOfPerformance: 'Multiple Locations'
    }
  },
  {
    id: '27',
    companyName: 'Defense Advanced Research Projects Agency',
    signalType: 'government_contract',
    description: 'DARPA AI research program. Synopsis for advanced machine learning systems.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-09'),
    metadata: {
      contractType: 'Synopsis',
      agency: 'Department of Defense',
      office: 'Defense Advanced Research Projects Agency',
      subtier: 'Defense Advanced Research Projects Agency',
      value: 125000000,
      title: 'Advanced Machine Learning Systems',
      deadline: '2026-03-30',
      responseDeadline: addDays(today, 120), // 120 days - Later (91+)
      naicsCode: '541715',
      setAside: 'None',
      placeOfPerformance: 'Arlington, VA'
    }
  },
  {
    id: '28',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Army Reserve training equipment. Solicitation for mobile training systems.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-09'),
    metadata: {
      contractType: 'Solicitation',
      agency: 'Department of Defense',
      office: 'The Army',
      subtier: 'Army Reserve Command',
      value: 31000000,
      deadline: '2026-02-17',
      responseDeadline: addDays(today, 16), // 16 days - Soon
      naicsCode: '334220',
      setAside: 'SDVOSB',
      placeOfPerformance: 'Fort Bragg, NC'
    }
  },
  {
    id: '29',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Navy expeditionary warfare systems. Combined Synopsis/Solicitation for amphibious equipment.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-08'),
    metadata: {
      contractType: 'Combined Synopsis/Solicitation',
      agency: 'Department of Defense',
      office: 'The Navy',
      subtier: 'Naval Facilities Engineering Systems Command',
      value: 95000000,
      deadline: '2026-03-08',
      responseDeadline: addDays(today, 68), // 68 days - Mid-term (61-90)
      naicsCode: '336612',
      setAside: 'None',
      placeOfPerformance: 'Port Hueneme, CA'
    }
  },
  {
    id: '30',
    companyName: 'Department of Defense',
    signalType: 'government_contract',
    description: 'Air National Guard aircraft modernization. Special Notice for avionics upgrades.',
    source: 'SAM.gov',
    sourceUrl: 'https://sam.gov',
    createdAt: new Date('2026-01-08'),
    metadata: {
      contractType: 'Special Notice',
      agency: 'Department of Defense',
      office: 'The Air Force',
      subtier: 'Air National Guard',
      value: 112000000,
      deadline: '2026-03-12',
      responseDeadline: addDays(today, 4), // 4 days - Urgent
      naicsCode: '336413',
      setAside: 'Small Business',
      placeOfPerformance: 'Multiple ANG Bases'
    }
  }
]
