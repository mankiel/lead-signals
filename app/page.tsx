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
  ChevronRight,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
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
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block px-3 py-2"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Real-time DoD Contract Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance leading-[1.1]">
              Defense Contract Signals for{" "}
              <span className="text-primary">Growing Teams</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Track Department of Defense contract opportunities in real-time.
              Get notified of Sources Sought, Synopsis, and Presolicitations
              before your competition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Request Access
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                Learn More
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "500+", label: "Active Opportunities" },
              { value: "$1.2B+", label: "Contract Value Tracked" },
              { value: "8", label: "DoD Agencies Covered" },
              { value: "24/7", label: "Real-time Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Everything you need to win contracts
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our platform monitors SAM.gov and delivers actionable intelligence
              directly to you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Target,
                title: "Smart Filtering",
                description:
                  "Filter opportunities by agency, NAICS code, contract type, and deadline to find exactly what you need.",
              },
              {
                icon: Clock,
                title: "Deadline Tracking",
                description:
                  "Never miss a deadline with real-time alerts for upcoming response windows and urgent opportunities.",
              },
              {
                icon: TrendingUp,
                title: "Market Analytics",
                description:
                  "Understand market trends with visual analytics on budget authority, solicitation types, and agency activity.",
              },
              {
                icon: Zap,
                title: "Instant Alerts",
                description:
                  "Get notified instantly when new opportunities match your criteria via email or in-app notifications.",
              },
              {
                icon: Shield,
                title: "Verified Data",
                description:
                  "All opportunities are sourced directly from SAM.gov with verified solicitation numbers and direct links.",
              },
              {
                icon: BarChart3,
                title: "Budget Insights",
                description:
                  "Track budget authority levels and historical spending patterns to prioritize high-value opportunities.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border/60 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
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
        className="py-20 sm:py-28 bg-muted/30 border-y border-border/40"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start for free, upgrade when you need more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="p-7 rounded-xl bg-card border border-border/60">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Free
              </h3>
              <p className="text-3xl font-bold text-foreground mb-1">
                $0
                <span className="text-base font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Perfect for getting started
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "10 notifications/month",
                  "All signal types",
                  "Email notifications",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-chart-2/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-chart-2" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="block w-full text-center px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative p-7 rounded-xl bg-primary text-primary-foreground">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-chart-3 text-foreground text-xs font-semibold">
                  Popular
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Pro</h3>
              <p className="text-3xl font-bold mb-1">
                $29
                <span className="text-base font-normal opacity-75">/mo</span>
              </p>
              <p className="text-sm opacity-75 mb-6">For serious contractors</p>
              <ul className="space-y-3 mb-6">
                {[
                  "Unlimited notifications",
                  "All signal types",
                  "Email & in-app notifications",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="block w-full text-center px-5 py-2.5 rounded-lg bg-primary-foreground text-primary text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
              Ready to win more contracts?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Join hundreds of defense contractors who use Lead Signals to
              stay ahead of the competition.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
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
