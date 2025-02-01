import React from 'react'

const FileField = ({ field, baseInputClasses, labelClasses }) => (
  <div>
    <label className={labelClasses}>
      {field.label}
      {field.required && <span className="text-red-500 text-xs">*</span>}
    </label>
    {field.description && (
      <p className="text-xs text-gray-500 mb-2">{field.description}</p>
    )}
    <div className="space-y-2">
      <input 
        type="file"
        accept={field.allowedTypes ? `.${field.allowedTypes.join(',.') }` : undefined}
        className={`${baseInputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
        required={field.required}
      />
      {(field.allowedTypes || field.maxSize) && (
        <p className="text-xs text-gray-500">
          {field.allowedTypes && (
            <span className="mr-2">
              Allowed types: {field.allowedTypes.join(', ')}
            </span>
          )}
          {field.maxSize && (
            <span>Max size: {field.maxSize}MB</span>
          )}
        </p>
      )}
    </div>
  </div>
)

export default FileField
