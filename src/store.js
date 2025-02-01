import { create } from 'zustand'
import { nanoid } from 'nanoid'

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

const useStore = create((set) => ({
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
  },
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
}))

export default useStore
