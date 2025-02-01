import React, { useState, useEffect } from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import useStore from '../store'

const FieldEditor = ({ field, stepId, onClose }) => {
  const { updateField } = useStore()
  const [currentTab, setCurrentTab] = useState('basic')
  const [fieldState, setFieldState] = useState({})

  useEffect(() => {
    setFieldState({
      ...field,
      label: field.label || '',
      description: field.description || '',
      required: field.required || false
    })
  }, [field])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFieldState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const updates = {
      ...fieldState,
    }

    if (field.type === 'heading') {
      updates.content = fieldState.content;
      updates.headingLevel = fieldState.headingLevel;
      updates.textAlign = fieldState.textAlign;
      updates.color = fieldState.color;
      updates.fontSize = fieldState.fontSize;
    }

    if (field.type === 'text_block') {
      updates.content = fieldState.content;
      updates.textAlign = fieldState.textAlign;
      updates.color = fieldState.color;
      updates.fontSize = fieldState.fontSize;
    }

    if (field.type === 'image') {
      updates.src = fieldState.src;
      updates.alt = fieldState.alt;
      updates.width = fieldState.width;
      updates.height = fieldState.height;
      updates.alignment = fieldState.alignment;
    }

    if (field.type === 'divider') {
      updates.style = fieldState.style;
      updates.color = fieldState.color;
      updates.spacing = fieldState.spacing;
    }

    if (field.type === 'spacer') {
      updates.spacing = fieldState.spacing;
      updates.showLine = fieldState.showLine;
      updates.lineColor = fieldState.lineColor;
    }

    updateField(stepId, field.id, updates)
    onClose()
  }

  const renderBasicFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </label>
        <input
          type="text"
          name="label"
          value={fieldState.label}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={fieldState.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="required"
          id="required"
          checked={fieldState.required}
          onChange={handleInputChange}
          className="h-4 w-4 text-blue-600 rounded border-gray-300"
        />
        <label htmlFor="required" className="ml-2 text-sm text-gray-700">
          Required field
        </label>
      </div>
    </div>
  )

  const renderLayoutFields = () => {
    switch (field.type) {
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading Content
              </label>
              <input
                type="text"
                name="content"
                value={fieldState.content}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading Level
              </label>
              <select
                name="headingLevel"
                value={fieldState.headingLevel}
                onChange={handleInputChange}
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
                Text Alignment
              </label>
              <div className="flex gap-2">
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => setFieldState(prev => ({ ...prev, textAlign: align }))}
                    className={`flex-1 py-2 px-3 border rounded-md transition-colors ${
                      fieldState.textAlign === align 
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
                value={fieldState.color}
                onChange={handleInputChange}
                className="h-10 w-20"
              />
            </div>
          </div>
        )

      case 'text_block':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                name="content"
                value={fieldState.content}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
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
                    onClick={() => setFieldState(prev => ({ ...prev, textAlign: align }))}
                    className={`flex-1 py-2 px-3 border rounded-md transition-colors ${
                      fieldState.textAlign === align 
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
                value={fieldState.color}
                onChange={handleInputChange}
                className="h-10 w-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <select
                name="fontSize"
                value={fieldState.fontSize}
                onChange={handleInputChange}
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
                value={fieldState.src}
                onChange={handleInputChange}
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
                value={fieldState.alt}
                onChange={handleInputChange}
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
                    onClick={() => setFieldState(prev => ({ ...prev, alignment: align }))}
                    className={`flex-1 py-2 px-3 border rounded-md transition-colors ${
                      fieldState.alignment === align 
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
                  value={fieldState.width}
                  onChange={handleInputChange}
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
                  value={fieldState.height}
                  onChange={handleInputChange}
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

      case 'divider':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style
              </label>
              <select
                name="style"
                value={fieldState.style}
                onChange={handleInputChange}
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
                value={fieldState.color}
                onChange={handleInputChange}
                className="h-10 w-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spacing
              </label>
              <select
                name="spacing"
                value={fieldState.spacing}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        )

      case 'spacer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spacing
              </label>
              <select
                name="spacing"
                value={fieldState.spacing}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="showLine"
                id="showLine"
                checked={fieldState.showLine}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="showLine" className="ml-2 text-sm text-gray-700">
                Show Divider Line
              </label>
            </div>

            {fieldState.showLine && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Line Color
                </label>
                <input
                  type="color"
                  name="lineColor"
                  value={fieldState.lineColor}
                  onChange={handleInputChange}
                  className="h-10 w-20"
                />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
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
            {['heading', 'text_block', 'image', 'divider', 'spacer'].includes(field.type) && (
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
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {currentTab === 'basic' && renderBasicFields()}
          {currentTab === 'layout' && renderLayoutFields()}

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
