import React from 'react'
import FormField from './FormField'
import useStore from '../store'

export default function FormPreview({ stepId }) {
  const { steps, formStyle } = useStore()
  const step = steps.find(s => s.id === stepId)
  const fields = step?.fields ?? []

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
                <FormField 
                  key={field.id} 
                  field={field} 
                  stepId={stepId}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
