import React, { useState } from 'react'
import { TrashIcon, PencilIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import useStore from '../store'
import FieldEditor from './FieldEditor'
import HeadingField from './fields/HeadingField'
import ImageField from './fields/ImageField'
import DividerField from './fields/DividerField'
import TextBlockField from './fields/TextBlockField'
import SpacerField from './fields/SpacerField'
import ContainerField from './fields/ContainerField'
import BulletListField from './fields/BulletListField'
import AlertField from './fields/AlertField'
import QuoteField from './fields/QuoteField'

const FormField = ({ field, stepId, index }) => {
  const { removeField, reorderFields, steps, currentStep, updateFieldValue } = useStore()
  const currentFields = steps[currentStep]?.fields ?? []
  const [showEditor, setShowEditor] = useState(false)

  const moveField = (direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < currentFields.length) {
      const targetField = currentFields[newIndex]
      reorderFields(stepId, field.id, targetField.id)
    }
  }

  const baseInputClasses = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
  const labelClasses = "block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2"

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
      case 'container':
        return <ContainerField field={field} />
      case 'bullet_list':
        return <BulletListField field={field} />
      case 'alert':
        return <AlertField field={field} />
      case 'quote':
        return <QuoteField field={field} />
      case 'email':
        return (
          <div>
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            {field.description && (
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
            )}
            <input 
              type="email" 
              placeholder={field.placeholder}
              className={baseInputClasses}
              required={field.required}
              value={field.value || ''}
              onChange={(e) => updateFieldValue(stepId, field.id, e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>
        )
      case 'password':
      case 'confirm_password':
        return (
          <div>
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            {field.description && (
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
            )}
            <input 
              type="password" 
              placeholder={field.placeholder}
              className={baseInputClasses}
              required={field.required}
              value={field.value || ''}
              onChange={(e) => updateFieldValue(stepId, field.id, e.target.value)}
              minLength={8}
            />
          </div>
        )
      case 'text':
      case 'website':
      case 'id_number':
        return (
          <div>
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            {field.description && (
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
            )}
            <input 
              type="text" 
              placeholder={field.placeholder}
              className={baseInputClasses}
              required={field.required}
              value={field.value || ''}
              onChange={(e) => updateFieldValue(stepId, field.id, e.target.value)}
            />
          </div>
        )
      case 'phone':
        return (
          <div>
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            {field.description && (
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
            )}
            <input 
              type="tel" 
              placeholder={field.placeholder}
              className={baseInputClasses}
              required={field.required}
              value={field.value || ''}
              onChange={(e) => updateFieldValue(stepId, field.id, e.target.value)}
              pattern="[0-9]{10}"
            />
          </div>
        )
      case 'textarea':
        return (
          <div>
            <label className={labelClasses}>
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </label>
            {field.description && (
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
            )}
            <textarea 
              placeholder={field.placeholder}
              className={`${baseInputClasses} min-h-[100px]`}
              required={field.required}
              value={field.value || ''}
              onChange={(e) => updateFieldValue(stepId, field.id, e.target.value)}
            />
          </div>
        )
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
