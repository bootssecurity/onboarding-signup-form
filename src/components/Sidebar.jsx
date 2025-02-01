import React, { useState } from 'react'
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
  HashtagIcon,
  Square2StackIcon,
  ArrowsPointingOutIcon,
  ListBulletIcon,
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import useStore from '../store'
import FormSettings from './FormSettings'

const FIELD_CATEGORIES = [
  {
    name: 'Layout Elements',
    items: [
      { 
        type: 'heading', 
        label: 'Heading',
        icon: HashtagIcon
      },
      { 
        type: 'text_block', 
        label: 'Text Block',
        icon: DocumentTextIcon
      },
      { 
        type: 'image', 
        label: 'Image',
        icon: PhotoIcon
      },
      { 
        type: 'divider', 
        label: 'Divider',
        icon: Bars3Icon
      },
      {
        type: 'spacer',
        label: 'Spacing',
        icon: ArrowsPointingOutIcon
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
        icon: UserCircleIcon
      },
      { 
        type: 'date', 
        label: 'Date',
        icon: CalendarIcon
      },
      { 
        type: 'company', 
        label: 'Company Details',
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
        icon: DocumentIcon
      }
    ]
  }
]

const Sidebar = () => {
  const store = useStore()
  const [showSettings, setShowSettings] = useState(false)
  const currentStepId = store.steps[store.currentStep]?.id

  const handleAddField = (field) => {
    console.log('Attempting to add field:', field)
    console.log('Current step ID:', currentStepId)
    
    if (currentStepId) {
      store.addField(currentStepId, field)
    } else {
      console.error('No current step ID found')
    }
  }

  return (
    <div className="w-80 flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Form Builder</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
              title="Form Settings"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('styleEditor').showModal()}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
              title="Style Settings"
            >
              <PaintBrushIcon className="w-5 h-5" />
            </button>
          </div>
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

      {showSettings && <FormSettings onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default Sidebar
