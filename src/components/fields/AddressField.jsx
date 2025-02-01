import React from 'react'

const AddressField = ({ field, baseInputClasses, labelClasses }) => (
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
      placeholder="Street Address"
      className={baseInputClasses}
      required={field.required}
    />
    <div className="grid grid-cols-2 gap-3">
      <input 
        type="text" 
        placeholder="City"
        className={baseInputClasses}
        required={field.required}
      />
      <input 
        type="text" 
        placeholder="State/Province"
        className={baseInputClasses}
        required={field.required}
      />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <input 
        type="text" 
        placeholder="ZIP/Postal Code"
        className={baseInputClasses}
        required={field.required}
      />
      <input 
        type="text" 
        placeholder="Country"
        className={baseInputClasses}
        required={field.required}
      />
    </div>
  </div>
)

export default AddressField
