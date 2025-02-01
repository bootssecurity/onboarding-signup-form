import React, { useState } from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import useStore from '../store'

const FieldEditor = ({ field, stepId, onClose }) => {
  const { updateField } = useStore()
  const [currentTab, setCurrentTab] = useState('basic')
  const [alignment, setAlignment] = useState(field.textAlign || field.alignment || 'left')
  const [content, setContent] = useState(field.content || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updates = {
      label: formData.get('label'),
      placeholder: formData.get('placeholder'),
      description: formData.get('description'),
      required: formData.get('required') === 'on',
    }

    // Layout specific fields
    if (field.type === 'text_block') {
      updates.content = content
      updates.textAlign = alignment
      updates.color = formData.get('color')
      updates.fontSize = formData.get('fontSize')
    }

    if (field.type === 'image') {
      updates.src = formData.get('src')
      updates.alt = formData.get('alt')
      updates.width = formData.get('width')
      updates.height = formData.get('height')
      updates.alignment = alignment
    }

    updateField(stepId, field.id, updates)
    onClose()
  }

  const renderTextBlockFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md min-h-[100px]"
          placeholder="Enter your text here"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Alignment
        </label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              onClick={() => setAlignment(align)}
              className={`flex-1 py-2 px-3 border rounded-md transition-colors ${
                alignment === align 
                  ? 'bg-blue-50 border-blue-500 text-blue-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="capitalize">{align}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <input
          type="color"
          name="color"
          defaultValue={field.color || '#374151'}
          className="h-10 w-20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Size
        </label>
        <select
          name="fontSize"
          defaultValue={field.fontSize || '1rem'}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="0.75rem">Extra Small</option>
          <option value="1rem">Normal</option>
          <option value="1.25rem">Large</option>
          <option value="1.5rem">Extra Large</option>
        </select>
      </div>
    </div>
  )

  const renderImageFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          name="src"
          defaultValue={field.src}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alt Text
        </label>
        <input
          type="text"
          name="alt"
          defaultValue={field.alt}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Describe the image"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Alignment
        </label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              onClick={() => setAlignment(align)}
              className={`flex-1 py-2 px-3 border rounded-md transition-colors ${
                alignment === align 
                  ? 'bg-blue-50 border-blue-500 text-blue-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="capitalize">{align}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <select
            name="width"
            defaultValue={field.width || '100%'}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="25%">25%</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <select
            name="height"
            defaultValue={field.height || 'auto'}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="auto">Auto</option>
            <option value="200px">Small</option>
            <option value="300px">Medium</option>
            <option value="400px">Large</option>
          </select>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Edit {field.type.replace('_', ' ')} Field</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {field.type === 'text_block' && renderTextBlockFields()}
          {field.type === 'image' && renderImageFields()}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <CheckIcon className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FieldEditor
