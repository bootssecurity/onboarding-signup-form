import React from 'react'
  import Sidebar from './components/Sidebar'
  import FormPreview from './components/FormPreview'
  import FormLink from './components/FormLink'
  import SubmissionViewer from './components/SubmissionViewer'
  import useStore from './store'

  export default function App() {
    const { steps, currentStep, addStep, setCurrentStep } = useStore()
    const currentStepId = steps[currentStep]?.id
    const isFormBuilder = window.location.pathname === '/'

    if (!isFormBuilder) {
      const formId = window.location.pathname.split('/')[2]
      return <SubmissionViewer formId={formId} />
    }

    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white border-b border-gray-200">
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
                  Step {index + 1}
                </button>
              ))}
              <button
                onClick={addStep}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Step
              </button>
            </div>
          </div>
          <FormPreview stepId={currentStepId} />
          <FormLink />
        </div>
      </div>
    )
  }
