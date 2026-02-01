import Link from "next/link"
import {
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Clock,
  BarChart3,
  Check,
  Sparkles,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground tracking-tight">
                Lead Signals
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-30" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Real-time DoD Contract Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance leading-[1.1]">
              Defense Contract Signals for{" "}
              <span className="text-primary">Growing Teams</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Track Department of Defense contract opportunities in real-time.
              Get notified of Sources Sought, Synopsis, and Presolicitations
              before your competition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-base font-semibold hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Request Access
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary/80 text-secondary-foreground rounded-xl text-base font-medium hover:bg-secondary transition-all border border-border/50"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "500+", label: "Active Opportunities" },
              { value: "$1.2B+", label: "Contract Value Tracked" },
              { value: "8", label: "DoD Agencies Covered" },
              { value: "24/7", label: "Real-time Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Everything you need to win contracts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform monitors SAM.gov and delivers actionable intelligence
              directly to you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Smart Filtering",
                description:
                  "Filter opportunities by agency, NAICS code, contract type, and deadline to find exactly what you need.",
                color: "chart-1",
              },
              {
                icon: Clock,
                title: "Deadline Tracking",
                description:
                  "Never miss a deadline with real-time alerts for upcoming response windows and urgent opportunities.",
                color: "chart-2",
              },
              {
                icon: TrendingUp,
                title: "Market Analytics",
                description:
                  "Understand market trends with visual analytics on budget authority, solicitation types, and agency activity.",
                color: "chart-3",
              },
              {
                icon: Zap,
                title: "Instant Alerts",
                description:
                  "Get notified instantly when new opportunities match your criteria via email or in-app notifications.",
                color: "chart-4",
              },
              {
                icon: Shield,
                title: "Verified Data",
                description:
                  "All opportunities are sourced directly from SAM.gov with verified solicitation numbers and direct links.",
                color: "chart-1",
              },
              {
                icon: BarChart3,
                title: "Budget Insights",
                description:
                  "Track budget authority levels and historical spending patterns to prioritize high-value opportunities.",
                color: "chart-2",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 sm:py-32 bg-gradient-to-b from-card/50 to-background border-y border-border/50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start for free, upgrade when you need more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-border transition-all">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Free
              </h3>
              <p className="text-4xl font-bold text-foreground mb-1">
                $0
                <span className="text-base font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Perfect for getting started
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "10 notifications/month",
                  "All signal types",
                  "Email notifications",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-chart-2/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-chart-2" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="block w-full text-center px-6 py-3.5 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 ring-1 ring-primary/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-chart-3 text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
                  Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-1">
                $29
                <span className="text-base font-normal opacity-80">/mo</span>
              </p>
              <p className="text-sm opacity-80 mb-8">For serious contractors</p>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited notifications",
                  "All signal types",
                  "Email & in-app notifications",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="block w-full text-center px-6 py-3.5 rounded-xl bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-all shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-12 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                Ready to win more contracts?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Join hundreds of defense contractors who use Lead Signals to
                stay ahead of the competition.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-base font-semibold hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Lead Signals</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Defense contract intelligence for modern teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
