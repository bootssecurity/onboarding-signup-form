import React from 'react'

const TextBlockField = ({ field }) => {
  return (
    <div 
      className="py-2" 
      style={{ 
        textAlign: field.textAlign || 'left',
        color: field.color || '#374151',
        fontSize: field.fontSize || '1rem'
      }}
    >
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ 
          __html: field.content || 'Text block content' 
        }}
      />
    </div>
  )
}

export default TextBlockField
