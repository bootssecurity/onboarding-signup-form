import React, { useState } from 'react'
import { TrashIcon, PencilIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import useStore from '../store'
import FieldEditor from './FieldEditor'

const FormField = ({ field, stepId, index, onChange, error }) => {
  const { removeField, reorderFields, steps, currentStep } = useStore()
  const currentFields = steps[currentStep]?.fields ?? []
  const [showEditor, setShowEditor] = useState(false)

  const moveField = (direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < currentFields.length) {
      const targetField = currentFields[newIndex]
      reorderFields(stepId, field.id, targetField.id)
    }
  }

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    setShowEditor(true)
  }

  const renderField = () => {
    switch (field.type) {
      case 'heading':
        return (
          <div 
            className="py-2" 
            style={{ textAlign: field.textAlign || 'left' }}
          >
            {field.headingLevel === 'h1' && (
              <h1 
                className="text-4xl font-bold" 
                style={{ color: field.color || '#000000' }}
              >
                {field.content || 'New Heading'}
              </h1>
            )}
            {field.headingLevel === 'h2' && (
              <h2 
                className="text-3xl font-bold" 
                style={{ color: field.color || '#000000' }}
              >
                {field.content || 'New Heading'}
              </h2>
            )}
            {field.headingLevel === 'h3' && (
              <h3 
                className="text-2xl font-bold" 
                style={{ color: field.color || '#000000' }}
              >
                {field.content || 'New Heading'}
              </h3>
            )}
            {field.headingLevel === 'h4' && (
              <h4 
                className="text-xl font-bold" 
                style={{ color: field.color || '#000000' }}
              >
                {field.content || 'New Heading'}
              </h4>
            )}
          </div>
        )
      
      case 'text_block':
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
      
      case 'image':
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
      
      case 'divider':
        return (
          <hr 
            className={`my-6 border-t ${
              field.style === 'dashed' ? 'border-dashed' : 
              field.style === 'dotted' ? 'border-dotted' : 
              field.style === 'double' ? 'border-double' : 
              'border-solid'
            }`}
            style={{ 
              borderColor: field.color || '#e5e7eb',
              borderTopWidth: field.spacing === 'small' ? '1px' : 
                             field.spacing === 'large' ? '3px' : '2px'
            }}
          />
        )
      
      case 'spacer':
        return (
          <div 
            style={{
              height: field.spacing === 'small' ? '0.5rem' :
                      field.spacing === 'large' ? '2rem' : '1rem',
              borderTop: field.showLine ? `1px ${field.style || 'solid'} ${field.lineColor || '#e5e7eb'}` : 'none'
            }}
          />
        )
      
      case 'text':
      case 'email':
      case 'phone':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            <input 
              type={field.type}
              placeholder={field.placeholder}
              className={`w-full px-3 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              required={field.required}
              onChange={handleInputChange}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
        )
      
      case 'textarea':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            <textarea 
              placeholder={field.placeholder}
              className={`w-full px-3 py-2 border rounded-md min-h-[100px] ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              required={field.required}
              onChange={handleInputChange}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
        )
      
      case 'file':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            <input 
              type="file"
              className={`w-full px-3 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              required={field.required}
              onChange={handleInputChange}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
        )
      
      case 'profile_photo':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            <input 
              type="file"
              accept="image/*"
              className={`w-full px-3 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              required={field.required}
              onChange={handleInputChange}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
        )
      
      default:
        return <div>Unsupported field type: {field.type}</div>
    }
  }

  return (
    <div className="relative group">
      <div className="absolute right-0 -top-4 hidden group-hover:flex gap-2 bg-white shadow-sm rounded-md border p-1 z-10">
        {index > 0 && (
          <button
            onClick={() => moveField('up')}
            className="p-1.5 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
            title="Move up"
          >
            <ChevronUpIcon className="w-4 h-4" />
          </button>
        )}
        {index < currentFields.length - 1 && (
          <button
            onClick={() => moveField('down')}
            className="p-1.5 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
            title="Move down"
          >
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        )}
        <button 
          onClick={handleEditClick}
          className="p-1.5 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
          title="Edit field"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button 
          onClick={() => removeField(stepId, field.id)}
          className="p-1.5 text-gray-600 hover:text-red-600 rounded-md hover:bg-red-50"
          title="Remove field"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      {showEditor && (
        <FieldEditor 
          field={field} 
          stepId={stepId} 
          onClose={() => setShowEditor(false)} 
        />
      )}

      {renderField()}
    </div>
  )
}

export default FormField
