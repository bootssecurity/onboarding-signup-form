import React, { useState, useRef } from 'react'
import { TrashIcon, PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

const ProfilePhotoField = ({ field, labelClasses }) => {
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        e.target.value = ''
        return
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        e.target.value = ''
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <label className={labelClasses}>
        {field.label}
        {field.required && <span className="text-red-500 text-xs">*</span>}
      </label>
      {field.description && (
        <p className="text-xs text-gray-500 mb-2">{field.description}</p>
      )}
      
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          {preview ? (
            <>
              <img 
                src={preview} 
                alt="Profile preview" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors"
                title="Remove photo"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">
              <PhotoIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required={field.required}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowUpTrayIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {preview ? 'Change Photo' : 'Upload Photo'}
            </span>
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Accepted formats: JPG, PNG. Max size: 2MB
        </p>
      </div>
    </div>
  )
}

export default ProfilePhotoField
