import React from 'react'

const HeadingField = ({ field }) => {
  const headingClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold'
  }

  const fontSize = {
    sm: 'text-sm',
    default: '',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const Tag = field.headingLevel || 'h2'
  
  return (
    <div className="py-2" style={{ textAlign: field.textAlign || 'left' }}>
      <Tag 
        className={`${headingClasses[field.headingLevel]} ${fontSize[field.fontSize] || ''}`}
        style={{ 
          color: field.color || '#000000'
        }}
      >
        {field.content}
      </Tag>
    </div>
  )
}

export default HeadingField
