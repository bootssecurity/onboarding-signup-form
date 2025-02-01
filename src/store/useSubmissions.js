import { nanoid } from 'nanoid'

const createSubmissionsSlice = (set) => ({
  submissions: [],

  addSubmission: (submissionData) => set((state) => ({
    submissions: [
      ...state.submissions, 
      {
        id: nanoid(),
        data: submissionData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        notes: ''
      }
    ]
  }))
})

export default createSubmissionsSlice
