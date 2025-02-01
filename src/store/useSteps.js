import { nanoid } from 'nanoid'

const createStepsSlice = (set) => ({
  steps: [{
    id: nanoid(),
    fields: []
  }],
  currentStep: 0,

  addStep: () => set((state) => ({ 
    steps: [...state.steps, { id: nanoid(), fields: [] }] 
  })),

  removeStep: (stepId) => set((state) => ({
    steps: state.steps.filter(step => step.id !== stepId)
  })),

  setCurrentStep: (step) => set({ currentStep: step }),

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
  })
})

export default createStepsSlice
