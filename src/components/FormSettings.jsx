import React from 'react'
import useStore from '../store'

const FormSettings = ({ onClose }) => {
  const { formSettings, updateFormSettings } = useStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const settings = {
      title: formData.get('title'),
      description: formData.get('description'),
      submitButtonText: formData.get('submitButtonText'),
      successMessage: formData.get('successMessage'),
      notificationEmail: formData.get('notificationEmail')
    }
    updateFormSettings(settings)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Form Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Form Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={formSettings.title}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={formSettings.description}
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Submit Button Text
            </label>
            <input
              type="text"
              name="submitButtonText"
              defaultValue={formSettings.submitButtonText}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Success Message
            </label>
            <textarea
              name="successMessage"
              defaultValue={formSettings.successMessage}
              className="w-full px-3 py-2 border rounded-md"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notification Email
            </label>
            <input
              type="email"
              name="notificationEmail"
              defaultValue={formSettings.notificationEmail}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="email@example.com"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormSettings
