import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="mb-4 sm:mb-6 inline-block">
            <span className="text-4xl sm:text-5xl lg:text-6xl">🏛️</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight px-4">
            Lead Signals
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto font-medium px-4">
            Never miss a sales opportunity. Get notified of government contract opportunities in real-time.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform active:scale-95 sm:hover:scale-105"
          >
            Get Started →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform active:scale-95 sm:hover:scale-105">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-5 bg-gradient-to-br from-yellow-100 to-yellow-200 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center">💰</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Funding Signals</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Track companies that just raised funding and are ready to spend
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform active:scale-95 sm:hover:scale-105">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-5 bg-gradient-to-br from-blue-100 to-blue-200 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center">💼</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Hiring Alerts</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Monitor job postings that indicate growing teams and budgets
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform active:scale-95 sm:hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-5 bg-gradient-to-br from-purple-100 to-purple-200 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center">⚙️</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Tech Changes</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Detect technology stack changes that create sales opportunities
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white text-center">Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-white">Free</h3>
              <p className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-white">$0<span className="text-base sm:text-xl">/mo</span></p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-white text-sm sm:text-base">
                <li className="flex items-center gap-2"><span className="text-green-300 font-bold text-base sm:text-lg">✓</span> 10 notifications/month</li>
                <li className="flex items-center gap-2"><span className="text-green-300 font-bold text-base sm:text-lg">✓</span> All signal types</li>
                <li className="flex items-center gap-2"><span className="text-green-300 font-bold text-base sm:text-lg">✓</span> Email notifications</li>
              </ul>
            </div>

            <div className="relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl sm:transform sm:scale-105 border-2 sm:border-4 border-yellow-400">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pro</h3>
              <p className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$29<span className="text-base sm:text-xl">/mo</span></p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base">
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold text-base sm:text-lg">✓</span> Unlimited notifications</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold text-base sm:text-lg">✓</span> All signal types</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold text-base sm:text-lg">✓</span> Email & in-app notifications</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold text-base sm:text-lg">✓</span> Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
