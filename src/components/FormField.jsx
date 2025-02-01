import React, { useState } from 'react'
import { TrashIcon, PencilIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import useStore from '../store'
import FieldEditor from './FieldEditor'
import {
  HeadingField,
  TextBlockField,
  ImageField,
  DividerField,
  SpacerField
} from './fields'

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

  const renderField = () => {
    switch (field.type) {
      case 'heading':
        return <HeadingField field={field} />
      case 'text_block':
        return <TextBlockField field={field} />
      case 'image':
        return <ImageField field={field} />
      case 'divider':
        return <DividerField field={field} />
      case 'spacer':
        return <SpacerField field={field} />
      
      // Other field types remain the same
      case 'text':
      case 'email':
      case 'phone':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            {field.description && (
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
            )}
            <input 
              type={field.type}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border rounded-md"
              required={field.required}
              onChange={(e) => onChange && onChange(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
        )
      
      // Other field types...
      default:
        return null
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
          onClick={() => setShowEditor(true)}
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
