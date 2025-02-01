import React from 'react'

const InputField = ({ field, type = 'text', baseInputClasses, labelClasses }) => (
  <div>
    <label className={labelClasses}>
      {field.label}
      {field.required && <span className="text-red-500 text-xs">*</span>}
    </label>
    {field.description && (
      <p className="text-xs text-gray-500 mb-2">{field.description}</p>
    )}
    <input 
      type={type}
      placeholder={field.placeholder}
      className={baseInputClasses}
      required={field.required}
      pattern={field.pattern}
    />
  </div>
)

export default InputField
