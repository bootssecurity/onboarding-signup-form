import React from 'react'

const DividerField = ({ field }) => {
  const spacingClasses = {
    small: 'my-4',
    medium: 'my-6',
    large: 'my-8'
  }

  return (
    <hr 
      className={spacingClasses[field.spacing || 'medium']}
      style={{ 
        borderStyle: field.style || 'solid',
        borderColor: field.color || '#e5e7eb'
      }} 
    />
  )
}

export default DividerField
