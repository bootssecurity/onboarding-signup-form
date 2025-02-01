import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

const createAuthFields = () => [
  {
    id: nanoid(),
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    description: 'This will be your login email'
  },
  {
    id: nanoid(),
    type: 'password',
    label: 'Password',
    placeholder: 'Create a strong password',
    required: true,
    description: 'Must be at least 8 characters'
  },
  {
    id: nanoid(),
    type: 'confirm_password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    required: true,
    description: 'Re-enter your password'
  }
]

const createField = (type, label, field = {}) => ({
  id: nanoid(),
  type,
  label,
  required: false,
  placeholder: field.placeholder || '',
  description: '',
  value: '',
  ...(type === 'heading' ? {
    content: field.defaultContent || 'New Heading',
    headingLevel: field.headingLevel || 'h2',
    textAlign: 'left',
    color: '#000000',
    fontSize: 'default'
  } : {}),
  ...(type === 'text_block' ? {
    content: field.defaultContent || 'Enter your text here',
    textAlign: 'left',
    color: '#374151',
    fontSize: '1rem'
  } : {}),
  ...(type === 'image' ? {
    src: '',
    alt: '',
    width: '100%',
    height: 'auto',
    alignment: 'left',
    allowedTypes: ['jpg', 'jpeg', 'png', 'gif'],
    maxSize: 5
  } : {}),
  ...(type === 'divider' ? {
    style: 'solid',
    color: '#e5e7eb',
    spacing: 'medium'
  } : {}),
  ...(type === 'spacer' ? {
    spacing: 'medium',
    showLine: false,
    lineColor: '#f3f4f6',
    customHeight: '2rem'
  } : {}),
  ...(type === 'container' ? {
    content: field.defaultContent || '',
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    border: true,
    borderColor: '#e5e7eb',
    borderRadius: '0.5rem'
  } : {}),
  ...(type === 'bullet_list' ? {
    items: field.defaultItems || ['List item 1', 'List item 2'],
    color: '#374151',
    fontSize: '1rem',
    textAlign: 'left'
  } : {}),
  ...(type === 'alert' ? {
    variant: 'info',
    title: '',
    content: 'Alert content goes here'
  } : {}),
  ...(type === 'quote' ? {
    content: 'Quote text goes here',
    citation: '',
    accentColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    textColor: '#374151',
    italic: true,
    padding: '1.5rem'
  } : {}),
  ...(type === 'profile_photo' ? {
    allowedTypes: ['jpg', 'jpeg', 'png'],
    maxSize: 2,
    imageUrl: null
  } : {}),
  ...(type === 'file' ? {
    allowedTypes: ['pdf', 'doc', 'docx'],
    maxSize: 5
  } : {})
})

const useStore = create(
  persist(
    (set, get) => ({
      steps: [{
        id: nanoid(),
        title: 'Account Setup',
        fields: createAuthFields()
      }],
      currentStep: 0,
      formStyle: {
        primaryColor: '#2563eb',
        backgroundColor: '#ffffff',
        borderRadius: '8px'
      },
      savedForms: [],
      currentFormId: null,
      submissions: {},

      getPublicLink: (formId) => {
        const baseUrl = window.location.origin
        return `${baseUrl}/submit/${formId}`
      },

      saveSubmission: (formId, submissionData) => set((state) => {
        const submissions = state.submissions[formId] || []
        const newSubmission = {
          id: nanoid(),
          formId,
          data: submissionData,
          submittedAt: new Date().toISOString(),
          status: 'pending'
        }

        return {
          submissions: {
            ...state.submissions,
            [formId]: [...submissions, newSubmission]
          }
        }
      }),

      updateSubmissionStatus: (formId, submissionId, status) => set((state) => ({
        submissions: {
          ...state.submissions,
          [formId]: state.submissions[formId].map(sub =>
            sub.id === submissionId ? { ...sub, status } : sub
          )
        }
      })),

      deleteSubmission: (formId, submissionId) => set((state) => ({
        submissions: {
          ...state.submissions,
          [formId]: state.submissions[formId].filter(sub => sub.id !== submissionId)
        }
      })),

      getFormSubmissions: (formId) => {
        const state = get()
        return state.submissions[formId] || []
      },

      saveForm: (title) => set((state) => {
        const formId = state.currentFormId || nanoid()
        const newForm = {
          id: formId,
          title,
          steps: state.steps,
          style: state.formStyle,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        const existingFormIndex = state.savedForms.findIndex(f => f.id === formId)
        const updatedForms = existingFormIndex >= 0
          ? state.savedForms.map((form, index) => 
              index === existingFormIndex ? newForm : form
            )
          : [...state.savedForms, newForm]

        return {
          savedForms: updatedForms,
          currentFormId: formId
        }
      }),

      loadForm: (formId) => set((state) => {
        const form = state.savedForms.find(f => f.id === formId)
        if (!form) return state

        return {
          steps: form.steps,
          formStyle: form.style,
          currentFormId: formId,
          currentStep: 0
        }
      }),

      deleteForm: (formId) => set((state) => ({
        savedForms: state.savedForms.filter(f => f.id !== formId),
        ...(state.currentFormId === formId ? {
          steps: [{
            id: nanoid(),
            title: 'Account Setup',
            fields: createAuthFields()
          }],
          currentStep: 0,
          currentFormId: null
        } : {})
      })),

      createNewForm: () => set({
        steps: [{
          id: nanoid(),
          title: 'Account Setup',
          fields: createAuthFields()
        }],
        currentStep: 0,
        currentFormId: null,
        formStyle: {
          primaryColor: '#2563eb',
          backgroundColor: '#ffffff',
          borderRadius: '8px'
        }
      }),

      addStep: () => set((state) => ({ 
        steps: [...state.steps, { id: nanoid(), fields: [] }] 
      })),

      removeStep: (stepId) => set((state) => ({
        steps: state.steps.filter(step => step.id !== stepId)
      })),

      setCurrentStep: (step) => set({ currentStep: step }),

      addField: (stepId, field) => set((state) => ({
        steps: state.steps.map(step => 
          step.id === stepId 
            ? { 
                ...step, 
                fields: [...step.fields, createField(field.type, field.label, field)]
              }
            : step
        )
      })),

      updateField: (stepId, fieldId, updates) => set((state) => ({
        steps: state.steps.map(step =>
          step.id === stepId
            ? {
                ...step,
                fields: step.fields.map(field =>
                  field.id === fieldId ? { ...field, ...updates } : field
                ),
              }
            : step
        ),
      })),

      updateFieldValue: (stepId, fieldId, value) => set((state) => ({
        steps: state.steps.map(step =>
          step.id === stepId
            ? {
                ...step,
                fields: step.fields.map(field =>
                  field.id === fieldId ? { ...field, value } : field
                ),
              }
            : step
        ),
      })),

      removeField: (stepId, fieldId) => set((state) => ({
        steps: state.steps.map(step =>
          step.id === stepId
            ? { ...step, fields: step.fields.filter(field => field.id !== fieldId) }
            : step
        )
      })),

      reorderFields: (stepId, activeId, overId) => set((state) => {
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
      }),

      updateFormStyle: (styleUpdates) => set((state) => ({
        formStyle: { ...state.formStyle, ...styleUpdates }
      }))
    }),
    {
      name: 'form-builder-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({
        savedForms: state.savedForms,
        currentFormId: state.currentFormId,
        steps: state.steps,
        formStyle: state.formStyle,
        submissions: state.submissions
      })
    }
  )
)

export default useStore
