import React, { useState } from 'react'
import FormField from './FormField'
import useStore from '../store'
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckIcon 
} from '@heroicons/react/24/outline'

const FormPreview = () => {
  const store = useStore()
  const { 
    steps, 
    currentStep, 
    setCurrentStep, 
    formSettings,
    addSubmission
  } = store
  
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const currentStepId = steps[currentStep]?.id
  const currentFields = steps[currentStep]?.fields || []
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const validateStep = () => {
    const newErrors = {}
    currentFields.forEach(field => {
      if (field.required && (!formData[field.id] || formData[field.id] === '')) {
        newErrors[field.id] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (!isLastStep) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep()) {
      addSubmission(formData)
      alert(formSettings.successMessage || 'Form submitted successfully!')
      setFormData({})
      setErrors({})
    }
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-8">
            {currentFields.length === 0 ? (
              <div className="py-16 text-center text-gray-500 border-2 border-dashed rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm">Drag and drop form elements here</p>
                  <p className="text-xs text-gray-400">Fields will appear in this area</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {currentFields.map((field, index) => (
                  <FormField 
                    key={field.id} 
                    field={field} 
                    stepId={currentStepId}
                    index={index}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    error={errors[field.id]}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-8 rounded-full ${
                      index === currentStep
                        ? 'bg-blue-600'
                        : index < currentStep
                        ? 'bg-blue-200'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 inline-flex items-center gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Previous
                </button>
              )}

              {!isLastStep && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  Next
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              )}

              {isLastStep && (
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 inline-flex items-center gap-2"
                >
                  <CheckIcon className="w-4 h-4" />
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormPreview
