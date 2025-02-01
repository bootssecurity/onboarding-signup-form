import React from 'react'
import FormField from './FormField'
import useStore from '../store'

const FormPreview = ({ stepId }) => {
  const { steps, currentStep, setCurrentStep, validateStep, submitForm } = useStore()
  const step = steps.find(s => s.id === stepId)
  const fields = step?.fields ?? []
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  const showSubmit = steps.length === 1 || isLastStep

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    } else {
      alert('Please fill in all required fields correctly')
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      if (submitForm()) {
        alert('Form submitted successfully!')
      }
    } else {
      alert('Please fill in all required fields correctly')
    }
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="relative p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
            {step?.title && (
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{step.title}</h2>
            )}
            
            <div className="space-y-6">
              {fields.map((field, index) => (
                <FormField 
                  key={field.id} 
                  field={field} 
                  stepId={stepId}
                  index={index}
                />
              ))}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t">
              <div>
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div>
                {showSubmit ? (
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {steps.length > 1 && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {steps.map((s, index) => (
                <div
                  key={s.id}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormPreview
