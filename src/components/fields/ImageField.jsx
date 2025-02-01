import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

const ImageField = ({ field }) => (
  <div 
    className="py-2"
    style={{ textAlign: field.alignment || 'left' }}
  >
    {field.src ? (
      <img 
        src={field.src} 
        alt={field.alt} 
        style={{ 
          width: field.width || '100%',
          height: field.height || 'auto',
          display: 'inline-block'
        }}
        className="rounded-lg"
      />
    ) : (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <PhotoIcon className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Upload an image or enter URL</p>
      </div>
    )}
  </div>
)

export default ImageField
