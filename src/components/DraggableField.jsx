import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export function DraggableField({ field }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `new-${field.type}-${Date.now()}`, // Unique ID for each drag
    data: {
      type: field.type,
      field,
      isNew: true // Flag to identify new fields
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm cursor-move hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        {field.label}
      </div>
    </div>
  )
}
