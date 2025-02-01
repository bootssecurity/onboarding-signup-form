import { create } from 'zustand'
import { nanoid } from 'nanoid'

const FORM_DATA_KEY = 'formBuilderData'

const createField = (type, label, field = {}) => ({
  id: nanoid(),
  type,
  label,
  required: false,
  placeholder: field.placeholder || '',
  description: '',
  ...(type === 'heading' ? {
    content: field.defaultContent || 'New Heading',
    headingLevel: field.headingLevel || 'h2',
    textAlign: 'left',
    color: '#000000',
    fontSize: 'default'
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

// Load initial state from local storage or use default
const loadInitialState = () => {
  const savedData = localStorage.getItem(FORM_DATA_KEY)
  if (savedData) {
    return JSON.parse(savedData)
  } else {
    return {
      steps: [{
        id: nanoid(),
        fields: [
          createField('email', 'Email', { required: true }),
          createField('password', 'Password', { required: true }),
          createField('password', 'Confirm Password', { required: true, placeholder: 'Confirm Password' })
        ]
      }],
      currentStep: 0,
      formStyle: {
        primaryColor: '#2563eb',
        backgroundColor: '#ffffff',
        borderRadius: '8px'
      }
    }
  }
}

const useStore = create((set) => {
  const initialState = loadInitialState()

  return {
    ...initialState,
    addStep: () => set((state) => {
      const newSteps = [...state.steps, { id: nanoid(), fields: [] }]
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, steps: newSteps }))
      return { steps: newSteps }
    }),
    removeStep: (stepId) => set((state) => {
      const newSteps = state.steps.filter(step => step.id !== stepId)
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, steps: newSteps }))
      return { steps: newSteps }
    }),
    setCurrentStep: (step) => set((state) => {
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, currentStep: step }))
      return { currentStep: step }
    }),
    addField: (stepId, field) => set((state) => {
      const newSteps = state.steps.map(step => 
        step.id === stepId 
          ? { 
              ...step, 
              fields: [...step.fields, createField(field.type, field.label, field)]
            }
          : step
      )
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, steps: newSteps }))
      return { steps: newSteps }
    }),
    updateField: (stepId, fieldId, updates) => set((state) => {
      const newSteps = state.steps.map(step =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map(field =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            }
          : step
      )
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, steps: newSteps }))
      return { steps: newSteps }
    }),
    removeField: (stepId, fieldId) => set((state) => {
      const newSteps = state.steps.map(step =>
        step.id === stepId
          ? { ...step, fields: step.fields.filter(field => field.id !== fieldId) }
          : step
      )
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, steps: newSteps }))
      return { steps: newSteps }
    }),
    reorderFields: (stepId, activeId, overId) => set((state) => {
      const step = state.steps.find(s => s.id === stepId)
      if (!step?.fields) return state

      const oldIndex = step.fields.findIndex(f => f.id === activeId)
      const newIndex = step.fields.findIndex(f => f.id === overId)

      if (oldIndex === -1 || newIndex === -1) return state

      const newFields = [...step.fields]
      const [movedField] = newFields.splice(oldIndex, 1)
      newFields.splice(newIndex, 0, movedField)

      const newSteps = state.steps.map(s =>
        s.id === stepId ? { ...s, fields: newFields } : s
      )
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, steps: newSteps }))
      return { steps: newSteps }
    }),
    updateFormStyle: (styleUpdates) => set((state) => {
      const newFormStyle = { ...state.formStyle, ...styleUpdates }
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify({ ...state, formStyle: newFormStyle }))
      return { formStyle: newFormStyle }
    })
  }
})

export default useStore
