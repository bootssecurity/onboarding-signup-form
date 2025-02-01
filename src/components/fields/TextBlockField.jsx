import React from 'react'

const TextBlockField = ({ field }) => {
  return (
    <div 
      className="py-2"
      style={{ textAlign: field.textAlign || 'left' }}
    >
      <div
        className="prose max-w-none"
        style={{ 
          color: field.color || '#374151',
          fontSize: field.fontSize || '1rem'
        }}
      >
        {field.content}
      </div>
    </div>
  )
}

export default TextBlockField
