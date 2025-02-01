import React, { useState, useEffect } from 'react'
  import { nanoid } from 'nanoid'
  import useStore from '../store'

  const FormLink = () => {
    const [formId, setFormId] = useState(null)
    const { steps, formStyle } = useStore()

    useEffect(() => {
      const id = nanoid()
      setFormId(id)
      localStorage.setItem(id, JSON.stringify({ steps, formStyle }))
    }, [])

    if (!formId) return null

    const link = `${window.location.origin}/form/${formId}`

    return (
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Share Your Form</h2>
        <p className="mb-2">Copy the link below to share your form:</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={link}
            readOnly
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={() => navigator.clipboard.writeText(link)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>
    )
  }

  export default FormLink
