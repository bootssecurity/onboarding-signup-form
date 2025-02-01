import React from 'react'
import Sidebar from './components/Sidebar'
import FormPreview from './components/FormPreview'
import useStore from './store'

const App = () => {
  const { steps, currentStep, addStep, setCurrentStep, currentFormId } = useStore()
  const currentStepId = steps[currentStep]?.id

  if (!currentStepId) return null

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentStep === index 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {step.title || `Step ${index + 1}`}
                </button>
              ))}
              <button
                onClick={addStep}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Step
              </button>
            </div>
            {currentFormId && (
              <div className="text-sm text-gray-500">
                Editing saved form
              </div>
            )}
          </div>
        </div>
        <FormPreview stepId={currentStepId} />
      </div>
    </div>
  )
}

export default App
