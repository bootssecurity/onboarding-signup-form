import React from 'react'
import { 
  PlusIcon, 
  DocumentIcon, 
  DocumentTextIcon, 
  PhotoIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserCircleIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  IdentificationIcon,
  CreditCardIcon,
  PaintBrushIcon,
  Bars3Icon,
  HashtagIcon
} from '@heroicons/react/24/outline'
import useStore from '../store'

const FIELD_CATEGORIES = [
  {
    name: 'Layout Elements',
    items: [
      { 
        type: 'heading', 
        label: 'Heading',
        placeholder: 'Enter heading text',
        icon: HashtagIcon,
        defaultContent: 'New Heading',
        headingLevel: 'h2'
      },
      { 
        type: 'image', 
        label: 'Image',
        placeholder: 'Upload or enter image URL',
        icon: PhotoIcon,
        allowedTypes: ['jpg', 'jpeg', 'png', 'gif'],
        maxSize: 5
      },
      { 
        type: 'divider', 
        label: 'Divider',
        icon: Bars3Icon
      }
    ]
  },
  {
    name: 'Form Fields',
    items: [
      { 
        type: 'text', 
        label: 'Single Line Text',
        placeholder: 'Enter text here',
        icon: DocumentTextIcon
      },
      { 
        type: 'email', 
        label: 'Email Address',
        placeholder: 'Enter email address',
        icon: EnvelopeIcon
      },
      { 
        type: 'phone', 
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        icon: PhoneIcon
      },
      { 
        type: 'address', 
        label: 'Address',
        placeholder: 'Enter address',
        icon: MapPinIcon
      },
      { 
        type: 'profile_photo', 
        label: 'Profile Photo',
        placeholder: 'Upload profile photo',
        icon: UserCircleIcon,
        allowedTypes: ['jpg', 'jpeg', 'png'],
        maxSize: 2
      },
      { 
        type: 'date', 
        label: 'Date',
        placeholder: 'Select date',
        icon: CalendarIcon
      },
      { 
        type: 'company', 
        label: 'Company Details',
        placeholder: 'Enter company name',
        icon: BuildingOfficeIcon
      },
      { 
        type: 'website', 
        label: 'Website',
        placeholder: 'Enter website URL',
        icon: GlobeAltIcon
      },
      { 
        type: 'id_number', 
        label: 'ID Number',
        placeholder: 'Enter ID number',
        icon: IdentificationIcon
      },
      { 
        type: 'payment', 
        label: 'Payment Details',
        placeholder: 'Enter card details',
        icon: CreditCardIcon
      },
      { 
        type: 'textarea', 
        label: 'Multi Line Text',
        placeholder: 'Enter long text here',
        icon: DocumentTextIcon
      },
      { 
        type: 'file', 
        label: 'Document Upload',
        placeholder: 'Upload document',
        icon: DocumentIcon,
        allowedTypes: ['pdf', 'doc', 'docx'],
        maxSize: 5
      }
    ]
  }
]

const Sidebar = () => {
  const { steps, currentStep, addField, updateFormStyle } = useStore()
  const currentStepId = steps[currentStep]?.id

  const handleAddField = (field) => {
    if (currentStepId) {
      addField(currentStepId, field)
    }
  }

  return (
    <div className="w-80 flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Form Builder</h2>
          <button
            onClick={() => document.getElementById('styleEditor').showModal()}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
            title="Style Settings"
          >
            <PaintBrushIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {FIELD_CATEGORIES.map(category => (
          <div key={category.name} className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-3">{category.name}</h3>
            <div className="space-y-3">
              {category.items.map(field => {
                const Icon = field.icon
                return (
                  <div 
                    key={field.type}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{field.label}</span>
                    </div>
                    <button
                      onClick={() => handleAddField(field)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      title={`Add ${field.label}`}
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <dialog id="styleEditor" className="modal p-0 rounded-lg shadow-xl backdrop:bg-gray-500/50">
        <div className="w-[500px]">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">Form Style Settings</h3>
            <button 
              onClick={() => document.getElementById('styleEditor').close()}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
          <form method="dialog" className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    onChange={(e) => updateFormStyle({ primaryColor: e.target.value })}
                    className="h-10 w-20"
                  />
                  <button 
                    type="button"
                    onClick={() => updateFormStyle({ primaryColor: '#2563eb' })}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    onChange={(e) => updateFormStyle({ backgroundColor: e.target.value })}
                    className="h-10 w-20"
                  />
                  <button 
                    type="button"
                    onClick={() => updateFormStyle({ backgroundColor: '#ffffff' })}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Radius
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  defaultValue="8"
                  onChange={(e) => updateFormStyle({ borderRadius: `${e.target.value}px` })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default Sidebar
