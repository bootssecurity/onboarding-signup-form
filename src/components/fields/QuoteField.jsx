import React from 'react'

const QuoteField = ({ field }) => {
  return (
    <blockquote 
      className="border-l-4 pl-4 py-2 my-4"
      style={{ 
        borderColor: field.accentColor || '#e5e7eb',
        backgroundColor: field.backgroundColor || '#f9fafb',
        padding: field.padding || '1.5rem',
      }}
    >
      <div 
        className="text-lg"
        style={{ 
          color: field.textColor || '#374151',
          fontStyle: field.italic ? 'italic' : 'normal'
        }}
      >
        {field.content}
      </div>
      {field.citation && (
        <footer className="mt-2 text-sm text-gray-600">
          — {field.citation}
        </footer>
      )}
    </blockquote>
  )
}

export default QuoteField
