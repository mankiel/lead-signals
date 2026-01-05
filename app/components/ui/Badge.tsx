import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({ 
  children, 
  variant = 'gray',
  size = 'md',
  className = '' 
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 ring-primary-600/20',
    success: 'bg-success-100 text-success-700 ring-success-600/20',
    warning: 'bg-warning-100 text-warning-700 ring-warning-600/20',
    danger: 'bg-danger-100 text-danger-700 ring-danger-600/20',
    gray: 'bg-gray-100 text-gray-700 ring-gray-600/20',
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  }
  
  return (
    <span 
      className={`
        inline-flex items-center font-medium rounded-full ring-1 ring-inset
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
