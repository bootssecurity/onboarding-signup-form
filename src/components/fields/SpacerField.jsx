import React from 'react'

const SpacerField = ({ field }) => {
  const spacingMap = {
    small: '1rem',
    medium: '2rem',
    large: '4rem',
    custom: field.customHeight
  }

  return (
    <div 
      style={{ 
        height: spacingMap[field.spacing || 'medium'],
        backgroundColor: field.showLine ? (field.lineColor || '#f3f4f6') : 'transparent',
        border: field.showLine ? '1px dashed #e5e7eb' : 'none'
      }}
    />
  )
}

export default SpacerField
