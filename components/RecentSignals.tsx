"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const signals = [
  {
    id: 1,
    department: "Department of Veterans Affairs",
    type: "Solicitation",
    title: "Electronic Health Record (EHR) Modernization Support Services",
    description: "Comprehensive technical support for the VistA EHR system modernization including data migration, integration, and training services",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/4a2e91fbf0a04928a8ff074c24c89f3c/view",
    posted: "01/02/2025",
    deadline: "03/15/2026",
    naicsCode: "541513",
    naicsTitle: "Computer Facilities Management Services",
    solicitationNumber: "36C10X25N0001",
    setValue: "$35,000,000",
    placeOfPerformance: "Nationwide",
    contactEmail: "contracting@va.gov",
    setAside: "Total Small Business",
    daysLeft: 66,
    elapsed: 33,
    status: "active"
  },
  {
    id: 2,
    department: "General Services Administration",
    type: "Combined Synopsis",
    title: "Cloud Infrastructure and DevSecOps Services - IT Schedule 70",
    description: "Enterprise-wide cloud infrastructure services including AWS, Azure, and GCP platform management, DevSecOps pipeline development, and continuous integration/deployment support",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/8b3f72ade1c149f3bcaa165d39e28b7f/view",
    posted: "01/03/2025",
    deadline: "04/20/2026",
    naicsCode: "541519",
    naicsTitle: "Other Computer Related Services",
    solicitationNumber: "47QTCA25R0042",
    setValue: "$75,000,000",
    placeOfPerformance: "Washington, DC",
    contactEmail: "schedules@gsa.gov",
    setAside: "Unrestricted",
    daysLeft: 102,
    elapsed: 25,
    status: "active"
  },
  {
    id: 3,
    department: "Department of Defense",
    type: "Presolicitation",
    title: "Joint Artificial Intelligence Research Initiative (JAIRIA) - Advanced ML/AI Development",
    description: "Development and deployment of next-generation machine learning and artificial intelligence capabilities for multi-domain operations including autonomous systems integration",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/9c4e83bdf2d150e4cdbb276e40f39c8g/view",
    posted: "01/04/2025",
    deadline: "02/28/2026",
    naicsCode: "541715",
    naicsTitle: "Research and Development in Physical, Engineering, Life Sciences",
    solicitationNumber: "HQ003425R0018",
    setValue: "$18,500,000",
    placeOfPerformance: "Arlington, VA",
    contactEmail: "darpa.contracts@mail.mil",
    setAside: "8(a)",
    daysLeft: 50,
    elapsed: 42,
    status: "active"
  },
  {
    id: 4,
    department: "Department of Homeland Security",
    type: "Solicitation",
    title: "Cybersecurity Operations Center (CSOC) Managed Services",
    description: "24/7/365 Security Operations Center services including threat monitoring, incident response, vulnerability management, and security information and event management (SIEM)",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/1d5f94cgeh3e61f5decc387f51g40d9h/view",
    posted: "01/05/2025",
    deadline: "03/30/2026",
    naicsCode: "541512",
    naicsTitle: "Computer Systems Design Services",
    solicitationNumber: "70RSAT25R00000015",
    setValue: "$42,000,000",
    placeOfPerformance: "Multiple Locations",
    contactEmail: "cisa.procurement@hq.dhs.gov",
    setAside: "SDVOSB",
    daysLeft: 79,
    elapsed: 30,
    status: "active"
  },
  {
    id: 5,
    department: "National Aeronautics and Space Administration",
    type: "Sources Sought",
    title: "Advanced Propulsion Systems Research and Development",
    description: "Research and development of next-generation spacecraft propulsion systems including electric propulsion, nuclear thermal propulsion, and advanced chemical systems",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/2e6g05dhfi4f72g6efdd498g62h51e0i/view",
    posted: "01/06/2025",
    deadline: "02/15/2026",
    naicsCode: "336419",
    naicsTitle: "Other Guided Missile and Space Vehicle Parts Manufacturing",
    solicitationNumber: "80NSSC25K0123",
    setValue: "$25,000,000",
    placeOfPerformance: "Kennedy Space Center, FL",
    contactEmail: "nasa-procurement@nasa.gov",
    setAside: "Unrestricted",
    daysLeft: 36,
    elapsed: 55,
    status: "urgent"
  },
  {
    id: 6,
    department: "Department of Energy",
    type: "Solicitation",
    title: "Renewable Energy Grid Integration and Storage Solutions",
    description: "Design, development, and deployment of advanced energy storage systems and grid integration technologies for renewable energy sources including solar, wind, and hydroelectric",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/3f7h16eigi5g83h7fgee509h73i62f1j/view",
    posted: "01/07/2025",
    deadline: "04/01/2026",
    naicsCode: "221118",
    naicsTitle: "Other Electric Power Generation",
    solicitationNumber: "DE-SOL-0025678",
    setValue: "$52,000,000",
    placeOfPerformance: "National Renewable Energy Laboratory, CO",
    contactEmail: "contracts@doe.gov",
    setAside: "HUBZone",
    daysLeft: 81,
    elapsed: 28,
    status: "active"
  },
  {
    id: 7,
    department: "Department of Transportation",
    type: "Combined Synopsis",
    title: "Intelligent Transportation Systems (ITS) Deployment and Integration",
    description: "Deployment of advanced traffic management systems, connected vehicle infrastructure, and smart city transportation solutions across metropolitan areas",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/4g8i27fjhj6h94i8ghff610i84j73g2k/view",
    posted: "01/08/2025",
    deadline: "03/22/2026",
    naicsCode: "541330",
    naicsTitle: "Engineering Services",
    solicitationNumber: "693JJ325R000012",
    setValue: "$28,000,000",
    placeOfPerformance: "Multiple Cities",
    contactEmail: "dot.contracting@dot.gov",
    setAside: "Woman-Owned Small Business",
    daysLeft: 68,
    elapsed: 32,
    status: "active"
  },
  {
    id: 8,
    department: "Department of Health and Human Services",
    type: "Solicitation",
    title: "Public Health Data Analytics and Surveillance Platform",
    description: "Development and maintenance of integrated public health surveillance system with real-time data analytics, disease outbreak prediction, and population health management capabilities",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/5h9j38gkik7i05j9higg721j95k84h3l/view",
    posted: "01/09/2025",
    deadline: "05/15/2026",
    naicsCode: "541511",
    naicsTitle: "Custom Computer Programming Services",
    solicitationNumber: "75N98125R00045",
    setValue: "$31,500,000",
    placeOfPerformance: "Atlanta, GA",
    contactEmail: "cdc.procurement@hhs.gov",
    setAside: "Total Small Business",
    daysLeft: 122,
    elapsed: 18,
    status: "active"
  },
  {
    id: 9,
    department: "Department of Commerce",
    type: "Presolicitation",
    title: "Weather Satellite Data Processing and Distribution Infrastructure",
    description: "High-performance computing infrastructure for processing and distributing weather satellite data including GOES-R, JPSS, and next-generation satellite systems",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/6i0k49hljl8j16k0ijhh832k06l95i4m/view",
    posted: "01/10/2025",
    deadline: "02/28/2026",
    naicsCode: "518210",
    naicsTitle: "Data Processing, Hosting, and Related Services",
    solicitationNumber: "1333ND25PNRCQ0012",
    setValue: "$46,000,000",
    placeOfPerformance: "Silver Spring, MD",
    contactEmail: "noaa.contracts@noaa.gov",
    setAside: "Unrestricted",
    daysLeft: 45,
    elapsed: 45,
    status: "active"
  },
  {
    id: 10,
    department: "Environmental Protection Agency",
    type: "Sources Sought",
    title: "Environmental Monitoring IoT Sensor Network Deployment",
    description: "Design and deployment of nationwide IoT sensor network for real-time environmental monitoring including air quality, water quality, and soil contamination detection",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/7j1l50imkm9k27l1jkii943l17m06j5n/view",
    posted: "01/11/2025",
    deadline: "03/05/2026",
    naicsCode: "334516",
    naicsTitle: "Analytical Laboratory Instrument Manufacturing",
    solicitationNumber: "EP-W-25-005",
    setValue: "$19,800,000",
    placeOfPerformance: "Nationwide",
    contactEmail: "epa.procurement@epa.gov",
    setAside: "8(a)",
    daysLeft: 49,
    elapsed: 41,
    status: "active"
  },
  {
    id: 11,
    department: "Department of the Interior",
    type: "Solicitation",
    title: "Wildfire Prevention and Management Technology Solutions",
    description: "Advanced wildfire detection, prediction, and management systems including drone surveillance, satellite monitoring, and AI-powered fire behavior modeling",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/8k2m61jnln0l38m2klji054m28n17k6o/view",
    posted: "01/12/2025",
    deadline: "04/10/2026",
    naicsCode: "541990",
    naicsTitle: "All Other Professional, Scientific, Technical Services",
    solicitationNumber: "140D0425R0008",
    setValue: "$23,400,000",
    placeOfPerformance: "Boise, ID",
    contactEmail: "doi.contracts@doi.gov",
    setAside: "SDVOSB",
    daysLeft: 85,
    elapsed: 26,
    status: "active"
  },
  {
    id: 12,
    department: "Department of Agriculture",
    type: "Combined Synopsis",
    title: "Precision Agriculture Data Analytics Platform",
    description: "Development of integrated precision agriculture platform providing farmers with real-time crop health monitoring, yield prediction, and resource optimization recommendations",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/9l3n72kopo1m49n3lmkj165n39o28l7p/view",
    posted: "01/13/2025",
    deadline: "03/28/2026",
    naicsCode: "541712",
    naicsTitle: "Research and Development in Physical, Engineering, Life Sciences (except Biotech)",
    solicitationNumber: "12FPC25R0011",
    setValue: "$16,700,000",
    placeOfPerformance: "Ames, IA",
    contactEmail: "usda.procurement@usda.gov",
    setAside: "HUBZone",
    daysLeft: 70,
    elapsed: 31,
    status: "active"
  },
  {
    id: 13,
    department: "Department of Defense",
    type: "Solicitation",
    title: "Unmanned Aerial Systems (UAS) Maintenance and Support Services",
    description: "Comprehensive maintenance, repair, and operational support for military unmanned aerial vehicle fleet including MQ-9 Reaper and RQ-4 Global Hawk platforms",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/0m4o83lppp2n50o4mnlk276o40p39m8q/view",
    posted: "12/28/2024",
    deadline: "01/18/2026",
    naicsCode: "336413",
    naicsTitle: "Other Aircraft Parts and Auxiliary Equipment Manufacturing",
    solicitationNumber: "FA821125R0002",
    setValue: "$89,000,000",
    placeOfPerformance: "Creech AFB, NV",
    contactEmail: "usaf.contracting@us.af.mil",
    setAside: "Unrestricted",
    daysLeft: 2,
    elapsed: 92,
    status: "urgent"
  },
  {
    id: 14,
    department: "Social Security Administration",
    type: "Solicitation",
    title: "Enterprise Customer Relationship Management (CRM) System Modernization",
    description: "Modernization of legacy CRM system to cloud-based platform with enhanced case management, omnichannel support, and AI-powered customer service capabilities",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/1n5p94mqq3o61p5noml387p51q40n9r/view",
    posted: "01/01/2025",
    deadline: "04/25/2026",
    naicsCode: "511210",
    naicsTitle: "Software Publishers",
    solicitationNumber: "SSA-RFP-25-0042",
    setValue: "$38,900,000",
    placeOfPerformance: "Baltimore, MD",
    contactEmail: "ssa.contracts@ssa.gov",
    setAside: "Woman-Owned Small Business",
    daysLeft: 100,
    elapsed: 24,
    status: "active"
  },
  {
    id: 15,
    department: "Department of Education",
    type: "Combined Synopsis",
    title: "National Education Data Warehouse and Analytics Platform",
    description: "Enterprise data warehouse solution for aggregating and analyzing K-12 and higher education data including student outcomes, institutional performance, and federal program effectiveness",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/2o6q05nrr4p72q6opnm498q62r51o0s/view",
    posted: "01/06/2025",
    deadline: "05/01/2026",
    naicsCode: "541690",
    naicsTitle: "Other Scientific and Technical Consulting Services",
    solicitationNumber: "ED-OSERS-25-R-0003",
    setValue: "$21,200,000",
    placeOfPerformance: "Washington, DC",
    contactEmail: "ed.procurement@ed.gov",
    setAside: "Total Small Business",
    daysLeft: 107,
    elapsed: 22,
    status: "active"
  },
  {
    id: 16,
    department: "General Services Administration",
    type: "Solicitation",
    title: "Federal Building Energy Efficiency Upgrade Program",
    description: "Energy efficiency upgrades for federal facilities including HVAC modernization, LED lighting installation, building automation systems, and renewable energy integration",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/3p7r16oss5q83r7pqon509r73s62p1t/view",
    posted: "12/30/2024",
    deadline: "01/20/2026",
    naicsCode: "236220",
    naicsTitle: "Commercial and Institutional Building Construction",
    solicitationNumber: "GS-02P-25-MQ-C-0001",
    setValue: "$67,500,000",
    placeOfPerformance: "Washington, DC Metro Area",
    contactEmail: "gsa.pbs.contracting@gsa.gov",
    setAside: "Unrestricted",
    daysLeft: 4,
    elapsed: 88,
    status: "urgent"
  },
  {
    id: 17,
    department: "Department of Veterans Affairs",
    type: "Presolicitation",
    title: "National Prescription Eyeglasses Manufacturing and Distribution",
    description: "Manufacture and distribution of prescription eyeglasses for veterans including frames, lenses, coatings, and nationwide delivery services",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/4q8s27ptt6r94s8rqpo610s84t73q2u/view",
    posted: "01/05/2025",
    deadline: "02/20/2026",
    naicsCode: "339115",
    naicsTitle: "Ophthalmic Goods Manufacturing",
    solicitationNumber: "36C26225R0089",
    setValue: "$12,300,000",
    placeOfPerformance: "Nationwide",
    contactEmail: "va.prosthetics@va.gov",
    setAside: "SDVOSB",
    daysLeft: 39,
    elapsed: 52,
    status: "active"
  },
  {
    id: 18,
    department: "Department of Homeland Security",
    type: "Solicitation",
    title: "Border Surveillance Technology Integration",
    description: "Integration of advanced surveillance technologies including ground sensors, aerial drones, thermal imaging, and AI-powered threat detection systems along international borders",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/5r9t38quu7s05t9srqp721t95u84r3v/view",
    posted: "01/08/2025",
    deadline: "04/15/2026",
    naicsCode: "561621",
    naicsTitle: "Security Systems Services",
    solicitationNumber: "70CMTC25R00000009",
    setValue: "$156,000,000",
    placeOfPerformance: "US-Mexico Border States",
    contactEmail: "cbp.contracting@dhs.gov",
    setAside: "Unrestricted",
    daysLeft: 93,
    elapsed: 25,
    status: "active"
  },
  {
    id: 19,
    department: "National Institutes of Health",
    type: "Sources Sought",
    title: "Genomic Sequencing and Bioinformatics Analysis Services",
    description: "High-throughput genomic sequencing services and bioinformatics analysis support for precision medicine research including whole genome sequencing and variant interpretation",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/6s0u49rvv8t16u0tsrq832u06v95s4w/view",
    posted: "01/09/2025",
    deadline: "03/10/2026",
    naicsCode: "541714",
    naicsTitle: "Research and Development in Biotechnology",
    solicitationNumber: "75N95125R00027",
    setValue: "$29,600,000",
    placeOfPerformance: "Bethesda, MD",
    contactEmail: "nih.grants@nih.gov",
    setAside: "8(a)",
    daysLeft: 56,
    elapsed: 38,
    status: "active"
  },
  {
    id: 20,
    department: "Department of State",
    type: "Combined Synopsis",
    title: "Global Diplomatic Communications Network Upgrade",
    description: "Upgrade of secure communications infrastructure for US diplomatic missions worldwide including satellite communications, encrypted networks, and unified communications platforms",
    source: "SAM.gov",
    sourceUrl: "https://sam.gov/opp/7t1v50swwe9u27v1utsp943v17w06t5x/view",
    posted: "01/10/2025",
    deadline: "05/20/2026",
    naicsCode: "517410",
    naicsTitle: "Satellite Telecommunications",
    solicitationNumber: "19AQMM25R0003",
    setValue: "$94,800,000",
    placeOfPerformance: "Worldwide",
    contactEmail: "state.a-contracts@state.gov",
    setAside: "Unrestricted",
    daysLeft: 127,
    elapsed: 17,
    status: "active"
  }
]

const getDepartmentColor = (dept: string) => {
  const colors: Record<string, string> = {
    "Department of Veterans Affairs": "bg-chart-4",
    "General Services Administration": "bg-chart-2",
    "Department of Defense": "bg-chart-1",
    "Department of Homeland Security": "bg-chart-2",
    "National Aeronautics and Space Administration": "bg-chart-3",
    "Department of Energy": "bg-chart-5",
    "Department of Transportation": "bg-chart-1",
    "Department of Health and Human Services": "bg-chart-4",
    "Department of Commerce": "bg-chart-2",
    "Environmental Protection Agency": "bg-chart-5",
    "Department of the Interior": "bg-chart-3",
    "Department of Agriculture": "bg-chart-4",
    "Social Security Administration": "bg-chart-1",
    "Department of Education": "bg-chart-2",
    "National Institutes of Health": "bg-chart-4",
    "Department of State": "bg-chart-1",
  }
  return colors[dept] || "bg-muted-foreground"
}

export function RecentSignals() {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-sm font-medium text-foreground">Recent Signals</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="20">
                <SelectTrigger className="w-full sm:w-32 h-8 text-xs bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-32 h-8 text-xs bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="grants">Grants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground px-2 whitespace-nowrap">1 of 1</span>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="group border border-border rounded-lg p-3 sm:p-4 hover:bg-secondary/30 hover:border-accent/30 transition-all cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div
                className={cn("hidden sm:block w-1 rounded-full self-stretch min-h-20", getDepartmentColor(signal.department))}
              />
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap flex-1">
                    <span className="font-medium text-sm text-foreground line-clamp-1">{signal.department}</span>
                    <Badge variant="secondary" className="text-[10px] bg-secondary text-muted-foreground shrink-0">
                      {signal.type}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-accent/50 text-accent shrink-0">
                      {signal.setValue}
                    </Badge>
                  </div>
                  <div className="sm:hidden shrink-0">
                    {signal.status === "urgent" ? (
                      <Badge className="bg-chart-5/20 text-chart-5 border-0 text-[10px]">{signal.daysLeft}d</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                        {signal.daysLeft}d
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground font-medium mb-1 line-clamp-1">{signal.title}</p>
                <p className="text-xs text-foreground/70 mb-3 line-clamp-2">{signal.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Posted: {signal.posted}
                  </span>
                  <span className="flex items-center gap-1">
                    NAICS: {signal.naicsCode}
                  </span>
                  <span className="flex items-center gap-1">
                    Sol: {signal.solicitationNumber}
                  </span>
                  <a href={signal.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                    {signal.source}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="sm:hidden mt-3">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                    <span>Deadline: {signal.deadline}</span>
                    <span>{signal.elapsed}% elapsed</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1">
                    <div
                      className={cn(
                        "h-1 rounded-full transition-all",
                        signal.status === "urgent" ? "bg-chart-5" : "bg-chart-1",
                      )}
                      style={{ width: `${signal.elapsed}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-2 min-w-32">
                {signal.status === "urgent" ? (
                  <Badge className="bg-chart-5/20 text-chart-5 border-0 text-[10px]">{signal.daysLeft} days left</Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                    {signal.daysLeft} days left
                  </Badge>
                )}
                <span className="text-[10px] text-muted-foreground">Deadline: {signal.deadline}</span>
                <div className="w-full mt-1">
                  <div className="w-full bg-secondary rounded-full h-1">
                    <div
                      className={cn(
                        "h-1 rounded-full transition-all",
                        signal.status === "urgent" ? "bg-chart-5" : "bg-chart-1",
                      )}
                      style={{ width: `${signal.elapsed}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{signal.elapsed}% elapsed</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
