import React from 'react'

const CompanyField = ({ field, baseInputClasses, labelClasses }) => (
  <div className="space-y-3">
    <label className={labelClasses}>
      {field.label}
      {field.required && <span className="text-red-500 text-xs">*</span>}
    </label>
    {field.description && (
      <p className="text-xs text-gray-500 mb-2">{field.description}</p>
    )}
    <input 
      type="text" 
      placeholder="Company Name"
      className={baseInputClasses}
      required={field.required}
    />
    <input 
      type="text" 
      placeholder="Industry"
      className={baseInputClasses}
    />
    <input 
      type="text" 
      placeholder="Company Size"
      className={baseInputClasses}
    />
  </div>
)

export default CompanyField
