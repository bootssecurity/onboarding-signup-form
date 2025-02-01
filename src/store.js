import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

const useStore = create(
  persist(
    (set, get) => ({
      steps: [{
        id: nanoid(),
        fields: []
      }],
      currentStep: 0,
      formStyle: {
        primaryColor: '#2563eb',
        backgroundColor: '#ffffff',
        borderRadius: '8px'
      },
      formSettings: {
        title: 'New Guard Registration',
        description: 'Please fill out the form to register as a new security guard.',
        submitButtonText: 'Submit Registration',
        successMessage: 'Thank you for your registration. We will review your application shortly.',
        notificationEmail: ''
      },
      submissions: [],

      addSubmission: (submissionData) => {
        set((state) => ({
          submissions: [
            ...state.submissions, 
            {
              id: crypto.randomUUID(),
              data: submissionData,
              status: 'pending',
              createdAt: new Date().toISOString(),
              notes: ''
            }
          ]
        }))
      },

      addField: (stepId, field) => {
        set((state) => {
          const newField = {
            id: nanoid(),
            type: field.type,
            label: field.label || '',
            placeholder: field.placeholder || '',
            description: field.description || '',
            required: false,
            ...(field.type === 'heading' && {
              content: field.defaultContent || 'New Heading',
              headingLevel: 'h2',
              textAlign: 'left',
              color: '#000000'
            }),
            ...(field.type === 'text_block' && {
              content: field.defaultContent || '<p>Enter your text here</p>',
              textAlign: 'left',
              color: '#374151',
              fontSize: '1rem'
            }),
            ...(field.type === 'image' && {
              src: '',
              alt: '',
              width: '100%',
              height: 'auto',
              alignment: 'center',
              placeholder: field.placeholder || 'Upload an image or enter URL'
            }),
            ...(field.type === 'divider' && {
              style: 'solid',
              color: '#e5e7eb',
              spacing: 'medium'
            }),
            ...(field.type === 'spacer' && {
              spacing: 'medium',
              showLine: false,
              lineColor: '#f3f4f6',
              customHeight: '1rem'
            }),
            ...(field.type === 'file' && {
              allowedTypes: ['pdf', 'doc', 'docx'],
              maxSize: 5
            })
          }

          return {
            steps: state.steps.map(step =>
              step.id === stepId
                ? { ...step, fields: [...step.fields, newField] }
                : step
            )
          }
        })
      },

      updateField: (stepId, fieldId, updates) => {
        set((state) => ({
          steps: state.steps.map(step =>
            step.id === stepId
              ? {
                  ...step,
                  fields: step.fields.map(field =>
                    field.id === fieldId ? { ...field, ...updates } : field
                  ),
                }
              : step
          )
        }))
      },

      removeField: (stepId, fieldId) => {
        set((state) => ({
          steps: state.steps.map(step =>
            step.id === stepId
              ? { ...step, fields: step.fields.filter(field => field.id !== fieldId) }
              : step
          )
        }))
      },

      addStep: () => {
        set((state) => ({ 
          steps: [...state.steps, { id: nanoid(), fields: [] }] 
        }))
      },

      removeStep: (stepId) => {
        set((state) => ({
          steps: state.steps.filter(step => step.id !== stepId)
        }))
      },

      setCurrentStep: (step) => {
        set({ currentStep: step })
      },

      reorderFields: (stepId, activeId, overId) => {
        set((state) => {
          const step = state.steps.find(s => s.id === stepId)
          if (!step?.fields) return state

          const oldIndex = step.fields.findIndex(f => f.id === activeId)
          const newIndex = step.fields.findIndex(f => f.id === overId)

          if (oldIndex === -1 || newIndex === -1) return state

          const newFields = [...step.fields]
          const [movedField] = newFields.splice(oldIndex, 1)
          newFields.splice(newIndex, 0, movedField)

          return {
            steps: state.steps.map(s =>
              s.id === stepId ? { ...s, fields: newFields } : s
            )
          }
        })
      },

      updateFormStyle: (styleUpdates) => {
        set((state) => ({
          formStyle: { ...state.formStyle, ...styleUpdates }
        }))
      },

      updateFormSettings: (settings) => {
        set((state) => ({
          formSettings: { ...state.formSettings, ...settings }
        }))
      }
    }),
    {
      name: 'form-builder-storage',
      version: 1
    }
  )
)

export default useStore
