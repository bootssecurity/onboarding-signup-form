import React, { useState } from 'react'
import useStore from '../store'

const SubmitForm = ({ formId }) => {
  const { savedForms, saveSubmission } = useStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const form = savedForms.find(f => f.id === formId)
  if (!form) return <div>Form not found</div>

  const isLastStep = currentStep === form.steps.length - 1

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isLastStep) {
      saveSubmission(formId, formData)
      alert('Form submitted successfully!')
      // Optionally redirect or show success message
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const currentFields = form.steps[currentStep].fields

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold mb-6">{form.title}</h1>
          
          <div className="space-y-6">
            {currentFields.map(field => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.description && (
                  <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                )}
                <input
                  type={field.type === 'email' ? 'email' : 'text'}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isLastStep ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </form>

      {form.steps.length > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex gap-2">
            {form.steps.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmitForm
