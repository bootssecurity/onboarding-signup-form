import React from 'react'

const ContainerField = ({ field }) => {
  return (
    <div 
      className="rounded-lg"
      style={{ 
        backgroundColor: field.backgroundColor || '#f9fafb',
        padding: field.padding || '1.5rem',
        border: field.border ? `1px solid ${field.borderColor || '#e5e7eb'}` : 'none',
        borderRadius: field.borderRadius || '0.5rem'
      }}
    >
      <div className="prose max-w-none">
        {field.content}
      </div>
    </div>
  )
}

export default ContainerField
