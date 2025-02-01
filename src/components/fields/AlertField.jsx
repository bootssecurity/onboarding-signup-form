import React from 'react'
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

const AlertField = ({ field }) => {
  const variants = {
    info: {
      bg: '#f0f9ff',
      border: '#bae6fd',
      text: '#0369a1',
      icon: InformationCircleIcon
    },
    success: {
      bg: '#f0fdf4',
      border: '#86efac',
      text: '#166534',
      icon: CheckCircleIcon
    },
    warning: {
      bg: '#fefce8',
      border: '#fde047',
      text: '#854d0e',
      icon: ExclamationTriangleIcon
    },
    error: {
      bg: '#fef2f2',
      border: '#fecaca',
      text: '#991b1b',
      icon: XCircleIcon
    }
  }

  const variant = variants[field.variant || 'info']
  const Icon = variant.icon

  return (
    <div 
      className="rounded-lg p-4 flex gap-3 items-start"
      style={{ 
        backgroundColor: variant.bg,
        borderColor: variant.border,
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <Icon className="w-5 h-5 mt-0.5" style={{ color: variant.text }} />
      <div style={{ color: variant.text }}>
        {field.title && (
          <h4 className="font-medium mb-1">{field.title}</h4>
        )}
        <div className="text-sm">
          {field.content}
        </div>
      </div>
    </div>
  )
}

export default AlertField
