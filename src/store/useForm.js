const createFormSlice = (set) => ({
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

  updateFormStyle: (styleUpdates) => set((state) => ({
    formStyle: { ...state.formStyle, ...styleUpdates }
  })),

  updateFormSettings: (settings) => set((state) => ({
    formSettings: { ...state.formSettings, ...settings }
  }))
})

export default createFormSlice
