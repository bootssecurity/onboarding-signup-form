import { nanoid } from 'nanoid'

const createFieldsSlice = (set) => ({
  addField: (stepId, field) => set((state) => {
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
  }),

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
    )
  })),

  removeField: (stepId, fieldId) => set((state) => ({
    steps: state.steps.map(step =>
      step.id === stepId
        ? { ...step, fields: step.fields.filter(field => field.id !== fieldId) }
        : step
    )
  }))
})

export default createFieldsSlice
