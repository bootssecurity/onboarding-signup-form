import React, { useState } from 'react'
import FormField from './FormField'
import useStore from '../store'

export default function FormPreview({ stepId }) {
  const { steps, currentStep, setCurrentStep, formStyle } = useStore()
  const step = steps.find(s => s.id === stepId)
  const fields = step?.fields ?? []
  const [formErrors, setFormErrors] = useState({})

  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    const errors = {}
    let canProceed = true

    fields.forEach(field => {
      if (field.required && !field.value) {
        errors[field.id] = `${field.label} is required`
        canProceed = false
      }
    })

    setFormErrors(errors)

    if (canProceed) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    const formData = {}
    steps.forEach(step => {
      step.fields.forEach(field => {
        formData[field.label] = field.value || '' // Assuming you have a 'value' property to store user input
      })
    })

    const formId = window.location.pathname.split('/')[2]
    const submissions = JSON.parse(localStorage.getItem(`${formId}-submissions`) || '[]')
    submissions.push(formData)
    localStorage.setItem(`${formId}-submissions`, JSON.stringify(submissions))

    // Reset the form or redirect to a thank you page
    setCurrentStep(0) // Reset to the first step
    alert('Form submitted successfully!')
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div 
          className="relative p-8 bg-white border border-gray-200 rounded-xl shadow-sm"
          style={{
            backgroundColor: formStyle.backgroundColor,
            borderRadius: formStyle.borderRadius
          }}
        >
          {!fields.length ? (
            <div className="py-16 text-center text-gray-500 border-2 border-dashed rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm">Click the + button next to elements to add them here</p>
                <p className="text-xs text-gray-400">Fields will appear in this area</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <FormField 
                    field={field} 
                    stepId={stepId}
                    index={index}
                  />
                  {formErrors[field.id] && (
                    <p className="text-red-500 text-xs mt-1">{formErrors[field.id]}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
            )}
            {!isLastStep && (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            )}
            {isLastStep && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
