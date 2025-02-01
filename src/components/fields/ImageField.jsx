import React from 'react'

const ImageField = ({ field }) => {
  return (
    <div 
      className="py-4" 
      style={{ 
        textAlign: field.alignment || 'center',
        display: 'flex',
        justifyContent: field.alignment || 'center'
      }}
    >
      {field.src ? (
        <img 
          src={field.src} 
          alt={field.alt || 'Uploaded image'}
          style={{
            width: field.width || '100%',
            height: field.height || 'auto',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
          className="rounded-lg shadow-md"
        />
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          style={{ width: field.width || '100%' }}
        >
          <p className="text-gray-500">
            {field.placeholder || 'Upload an image or enter URL'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ImageField
