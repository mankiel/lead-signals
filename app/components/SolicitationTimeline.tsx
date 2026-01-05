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
    <div className="mt-3 space-y-2">
      <div className="flex justify-between text-xs text-gray-600">
        <div>
          <span className="font-medium">Posted:</span> {posted.toLocaleDateString()}
        </div>
        <div className={`font-medium ${isExpired ? 'text-red-600' : remainingDays <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
          {isExpired ? 'EXPIRED' : `${remainingDays} days left`}
        </div>
        <div>
          <span className="font-medium">Deadline:</span> {deadline.toLocaleDateString()}
        </div>
      </div>
      
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all ${
            isExpired ? 'bg-red-500' : 
            remainingDays <= 7 ? 'bg-orange-500' : 
            'bg-green-500'
          }`}
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{totalDays} day solicitation period</span>
        <span>{Math.round(percentComplete)}% elapsed</span>
      </div>
    </div>
  )
}
