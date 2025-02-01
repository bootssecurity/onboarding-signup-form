import React, { useState } from 'react'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  EyeIcon,
  TrashIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'
import useStore from '../store'

const SubmissionsView = () => {
  const { submissions, updateSubmissionStatus, addSubmissionNote, deleteSubmission } = useStore()
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [newNote, setNewNote] = useState('')

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }

  const handleStatusChange = (submissionId, status) => {
    updateSubmissionStatus(submissionId, status)
    addSubmissionNote(submissionId, `Status changed to ${status}`)
  }

  const handleAddNote = (submissionId) => {
    if (newNote.trim()) {
      addSubmissionNote(submissionId, newNote)
      setNewNote('')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex">
        {/* Submissions List */}
        <div className="w-1/2 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-6">Guard Applications</h2>
          <div className="space-y-4">
            {submissions.map(submission => (
              <div 
                key={submission.id}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-colors ${
                  selectedSubmission?.id === submission.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[submission.status]}`}>
                      {submission.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(submission.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(submission.id, 'approved')
                      }}
                      className="p-1 text-gray-400 hover:text-green-600"
                      title="Approve"
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(submission.id, 'rejected')
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Reject"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (confirm('Are you sure you want to delete this submission?')) {
                          deleteSubmission(submission.id)
                        }
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  {submission.data.name && <div>Name: {submission.data.name}</div>}
                  {submission.data.email && <div>Email: {submission.data.email}</div>}
                  {submission.data.phone && <div>Phone: {submission.data.phone}</div>}
                </div>
              </div>
            ))}
            {submissions.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <ClockIcon className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">No submissions yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Submission Details */}
        <div className="w-1/2 border-l border-gray-200 bg-white">
          {selectedSubmission ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Application Details</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedSubmission.status]}`}>
                    {selectedSubmission.status}
                  </span>
                </div>
                <div className="space-y-4">
                  {Object.entries(selectedSubmission.data).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      {typeof value === 'string' && value.startsWith('data:image') ? (
                        <img src={value} alt={key} className="mt-1 max-w-xs rounded" />
                      ) : (
                        <div className="mt-1 text-sm text-gray-900">{value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-6 overflow-auto">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Notes</h4>
                <div className="space-y-4">
                  {selectedSubmission.notes.split('\n').map((note, index) => (
                    note && (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm">
                        {note}
                      </div>
                    )
                  ))}
                </div>
              </div>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <button
                    onClick={() => handleAddNote(selectedSubmission.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <EyeIcon className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2">Select a submission to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubmissionsView
