import React, { useState } from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import useStore from '../store'

const FieldEditor = ({ field, stepId, onClose }) => {
  const { updateField } = useStore()
  const [currentTab, setCurrentTab] = useState('basic')
  const [alignment, setAlignment] = useState(field.textAlign || field.alignment || 'left')

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
    if (field.type === 'heading') {
      updates.content = formData.get('content')
      updates.headingLevel = formData.get('headingLevel')
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

    if (field.type === 'divider') {
      updates.style = formData.get('style')
      updates.color = formData.get('color')
      updates.spacing = formData.get('spacing')
    }

    // File specific fields
    if (field.type === 'file' || field.type === 'profile_photo') {
      updates.allowedTypes = formData.get('allowedTypes')?.split(',').map(t => t.trim()) || []
      updates.maxSize = parseInt(formData.get('maxSize')) || 5
    }

    updateField(stepId, field.id, updates)
    onClose()
  }

  const renderAlignmentButtons = () => (
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
  )

  const renderBasicFields = () => (
    <div className="space-y-4">
      {field.type !== 'divider' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            name="label"
            defaultValue={field.label}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
      )}

      {!['heading', 'image', 'divider'].includes(field.type) && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              name="placeholder"
              defaultValue={field.placeholder}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Help Text
            </label>
            <input
              type="text"
              name="description"
              defaultValue={field.description}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="required"
              id="required"
              defaultChecked={field.required}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="required" className="ml-2 text-sm text-gray-700">
              Required field
            </label>
          </div>
        </>
      )}
    </div>
  )

  const renderLayoutFields = () => {
    switch (field.type) {
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading Text
              </label>
              <input
                type="text"
                name="content"
                defaultValue={field.content}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading Level
              </label>
              <select
                name="headingLevel"
                defaultValue={field.headingLevel || 'h2'}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <select
                name="fontSize"
                defaultValue={field.fontSize || 'default'}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="default">Default</option>
                <option value="sm">Small</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Alignment
              </label>
              {renderAlignmentButtons()}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <input
                type="color"
                name="color"
                defaultValue={field.color || '#000000'}
                className="h-10 w-20"
              />
            </div>
          </div>
        )

      case 'image':
        return (
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
              />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alignment
              </label>
              {renderAlignmentButtons()}
            </div>
          </div>
        )

      case 'divider':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style
              </label>
              <select
                name="style"
                defaultValue={field.style || 'solid'}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="double">Double</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="color"
                name="color"
                defaultValue={field.color || '#e5e7eb'}
                className="h-10 w-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spacing
              </label>
              <select
                name="spacing"
                defaultValue={field.spacing || 'medium'}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderFileFields = () => {
    if (!['file', 'profile_photo'].includes(field.type)) return null

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allowed File Types (comma-separated)
          </label>
          <input
            type="text"
            name="allowedTypes"
            defaultValue={field.allowedTypes?.join(', ')}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="pdf, doc, docx"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max File Size (MB)
          </label>
          <input
            type="number"
            name="maxSize"
            defaultValue={field.maxSize}
            min="1"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    )
  }

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

        <div className="p-4 border-b">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCurrentTab('basic')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentTab === 'basic'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Basic Settings
            </button>
            {['heading', 'image', 'divider'].includes(field.type) && (
              <button
                type="button"
                onClick={() => setCurrentTab('layout')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentTab === 'layout'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Layout Settings
              </button>
            )}
            {['file', 'profile_photo'].includes(field.type) && (
              <button
                type="button"
                onClick={() => setCurrentTab('file')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentTab === 'file'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                File Settings
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {currentTab === 'basic' && renderBasicFields()}
          {currentTab === 'layout' && renderLayoutFields()}
          {currentTab === 'file' && renderFileFields()}

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
