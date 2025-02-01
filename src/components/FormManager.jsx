import React, { useState } from 'react'
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon,
  DocumentDuplicateIcon,
  ClockIcon,
  ShareIcon,
  InboxIcon
} from '@heroicons/react/24/outline'
import useStore from '../store'
import SubmissionsManager from './SubmissionsManager'

const FormManager = ({ onClose }) => {
  const { savedForms, loadForm, deleteForm, createNewForm, getPublicLink } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showSubmissions, setShowSubmissions] = useState(null)

  const filteredForms = savedForms.filter(form => 
    form.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleShare = (formId) => {
    const link = getPublicLink(formId)
    navigator.clipboard.writeText(link)
    alert('Public link copied to clipboard!')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Saved Forms</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-6">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              onClick={() => {
                createNewForm()
                onClose()
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="w-5 h-5" />
              New Form
            </button>
          </div>

          <div className="space-y-4">
            {filteredForms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No forms found
              </div>
            ) : (
              filteredForms.map(form => (
                <div
                  key={form.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{form.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <DocumentDuplicateIcon className="w-4 h-4" />
                        {form.steps.length} steps
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        Updated {formatDate(form.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(form.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Share form"
                    >
                      <ShareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowSubmissions(form.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="View submissions"
                    >
                      <InboxIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        loadForm(form.id)
                        onClose()
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit form"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this form?')) {
                          deleteForm(form.id)
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete form"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showSubmissions && (
        <SubmissionsManager 
          formId={showSubmissions} 
          onClose={() => setShowSubmissions(null)} 
        />
      )}
    </div>
  )
}

export default FormManager
