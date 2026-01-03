import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Lead Signals
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Never miss a sales opportunity. Get notified of lead signals in real-time.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Funding Signals</h3>
            <p className="text-gray-600">
              Track companies that just raised funding and are ready to spend
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">��</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Hiring Alerts</h3>
            <p className="text-gray-600">
              Monitor job postings that indicate growing teams and budgets
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Tech Changes</h3>
            <p className="text-gray-600">
              Detect technology stack changes that create sales opportunities
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-4xl font-bold mb-4">$0<span className="text-lg">/mo</span></p>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ 10 notifications/month</li>
                <li>✓ All signal types</li>
                <li>✓ Email notifications</li>
              </ul>
            </div>

            <div className="bg-white text-blue-600 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-4">$29<span className="text-lg">/mo</span></p>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Unlimited notifications</li>
                <li>✓ All signal types</li>
                <li>✓ Email & in-app notifications</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
