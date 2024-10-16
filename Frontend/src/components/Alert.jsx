import React from 'react'
import { X } from 'lucide-react'

const alertTypes = {
  success: 'bg-green-100 border-green-500 text-green-700',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  error: 'bg-red-100 border-red-500 text-red-700',
  info: 'bg-blue-100 border-blue-500 text-blue-700',
}

export default function Alert({ type = 'info', message, onClose }) {
  const alertClasses = alertTypes[type] || alertTypes.info

  return (
    <div className={`border-l-4 p-2${alertClasses} relative`} role="alert">
      <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
