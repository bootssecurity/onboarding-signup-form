import React from 'react'

const PaymentField = ({ field, baseInputClasses, labelClasses }) => (
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
      placeholder="Card Number"
      className={baseInputClasses}
      required={field.required}
      pattern="[0-9]{16}"
    />
    <div className="grid grid-cols-2 gap-3">
      <input 
        type="text" 
        placeholder="MM/YY"
        className={baseInputClasses}
        required={field.required}
        pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
      />
      <input 
        type="text" 
        placeholder="CVC"
        className={baseInputClasses}
        required={field.required}
        pattern="[0-9]{3,4}"
      />
    </div>
  </div>
)

export default PaymentField
