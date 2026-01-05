'use client'

interface TimelineProps {
  postedDate: string
  responseDeadline: string
}

export default function SolicitationTimeline({ postedDate, responseDeadline }: TimelineProps) {
  const posted = new Date(postedDate)
  const deadline = new Date(responseDeadline)
  const now = new Date()
  
  const totalDays = Math.ceil((deadline.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24))
  const elapsedDays = Math.ceil((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24))
  const remainingDays = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  
  const percentComplete = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100))
  const isExpired = now > deadline
  
  return (
    <div className="mt-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 space-y-3">
      <div className="flex justify-between text-xs font-semibold">
        <div className="flex items-center gap-1 text-blue-700">
          <span>📅</span>
          <span>Posted:</span> 
          <span className="text-gray-700">{posted.toLocaleDateString()}</span>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold ${
          isExpired ? 'bg-red-100 text-red-700' : 
          remainingDays <= 7 ? 'bg-orange-100 text-orange-700' : 
          'bg-green-100 text-green-700'
        }`}>
          <span>{isExpired ? '⏰' : '⏱️'}</span>
          {isExpired ? 'EXPIRED' : `${remainingDays} days left`}
        </div>
        <div className="flex items-center gap-1 text-red-700">
          <span>🎯</span>
          <span>Deadline:</span> 
          <span className="text-gray-700">{deadline.toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full transition-all duration-500 rounded-full ${
            isExpired ? 'bg-gradient-to-r from-red-500 to-red-600' : 
            remainingDays <= 7 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
            'bg-gradient-to-r from-green-400 to-green-600'
          }`}
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-600 font-medium">
        <span>📊 {totalDays} day solicitation period</span>
        <span className="bg-gray-200 px-2 py-0.5 rounded-full">{Math.round(percentComplete)}% elapsed</span>
      </div>
    </div>
  )
}
