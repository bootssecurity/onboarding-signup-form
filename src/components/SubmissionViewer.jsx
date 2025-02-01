import React, { useState, useEffect } from 'react'

  const SubmissionViewer = ({ formId }) => {
    const [submissions, setSubmissions] = useState([])

    useEffect(() => {
      const storedSubmissions = JSON.parse(localStorage.getItem(`${formId}-submissions`) || '[]')
      setSubmissions(storedSubmissions)
    }, [formId])

    if (!submissions.length) {
      return (
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Submissions</h2>
          <p>No submissions yet.</p>
        </div>
      )
    }

    return (
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Submissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(submissions[0]).map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission, index) => (
                <tr key={index}>
                  {Object.values(submission).map((value, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  export default SubmissionViewer
