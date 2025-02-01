import React from 'react'

const BulletListField = ({ field }) => {
  return (
    <div 
      className="py-2"
      style={{ 
        color: field.color || '#374151',
        textAlign: field.textAlign || 'left'
      }}
    >
      <ul className="list-disc list-inside space-y-2">
        {field.items.map((item, index) => (
          <li 
            key={index}
            style={{ 
              color: field.color || '#374151',
              fontSize: field.fontSize || '1rem'
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BulletListField
