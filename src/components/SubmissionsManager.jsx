import React, { useState } from 'react'
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import useStore from '../store'

const SubmissionsManager = ({ formId, onClose }) => {
  const { getFormSubmissions, updateSubmissionStatus, deleteSubmission } = useStore()
  const submissions = getFormSubmissions(formId)
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
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

  const handleStatusChange = (submissionId, status) => {
    updateSubmissionStatus(formId, submissionId, status)
  }

  const handleDelete = (submissionId) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      deleteSubmission(formId, submissionId)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Form Submissions</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Submissions List */}
          <div className="w-1/2 border-r overflow-y-auto p-6">
            {submissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No submissions yet
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map(submission => (
                  <div
                    key={submission.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedSubmission?.id === submission.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[submission.status]}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(submission.id, 'approved')
                          }}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Approve"
                        >
                          <CheckCircleIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(submission.id, 'rejected')
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Reject"
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(submission.id)
                        }}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submission Details */}
          <div className="w-1/2 overflow-y-auto p-6">
            {selectedSubmission ? (
              <div>
                <h3 className="text-lg font-medium mb-4">Submission Details</h3>
                <div className="space-y-4">
                  {Object.entries(selectedSubmission.data).map(([key, value]) => (
                    <div key={key} className="border-b pb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {key}
                      </label>
                      <div className="mt-1 text-gray-900">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a submission to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmissionsManager
