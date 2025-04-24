import React from 'react';
import { Property } from '../../types/property';
import { Building, Home, MapPin, CalendarDays, Users, Layout, UserSquare as RulerSquare, ChevronLeft } from 'lucide-react';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight">{property.address}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-blue-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Property Type</p>
                <p className="font-medium">{property.mainUsage || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Layout className="h-6 w-6 text-green-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Area</p>
                <p className="font-medium">{property.mainArea + property.serviceArea} m²</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-amber-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Units</p>
                <p className="font-medium">
                  {property.existingUnits > 0 && `${property.existingUnits} existing`}
                  {property.existingUnits > 0 && property.requestedUnits > 0 && ' / '}
                  {property.requestedUnits > 0 && `${property.requestedUnits} requested`}
                  {property.existingUnits === 0 && property.requestedUnits === 0 && 'Not applicable'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <CalendarDays className="h-6 w-6 text-purple-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Event Date</p>
                <p className="font-medium">{property.eventDate || 'Not specified'}</p>
              </div>
            </div>
          </div>
          
          {/* Detailed Information */}
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Request Description</p>
                <p>{property.requestDescription || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Requester</p>
                <p>{property.requesterDetails || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Event</p>
                <p>{property.event || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Permit Number</p>
                <p>{property.permitNumber || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Main Area</p>
                <p>{property.mainArea > 0 ? `${property.mainArea} m²` : 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Service Area</p>
                <p>{property.serviceArea > 0 ? `${property.serviceArea} m²` : 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p>{property.height > 0 ? `${property.height} m` : 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Days From Submission</p>
                <p>{property.daysFromSubmission > 0 ? property.daysFromSubmission : 'Not specified'}</p>
              </div>
            </div>
          </div>
          
          {/* Location Information */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-4">Location Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p>{property.city || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Street</p>
                <p>{property.streetName || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">House Number</p>
                <p>{property.houseNumber || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Block/Parcel</p>
                <p>{`${property.block || ''}${property.block && property.parcel ? '/' : ''}${property.parcel || ''}`}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Coordinates</p>
                <p className="flex items-center">
                  <MapPin size={16} className="mr-1 text-gray-400" />
                  {property.latitude}, {property.longitude}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between">
          <button 
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to list
          </button>
          
          <a 
            href={`https://maps.google.com/?q=${property.latitude},${property.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            <MapPin size={18} className="mr-2" />
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;