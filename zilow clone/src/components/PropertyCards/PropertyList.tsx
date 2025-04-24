import React, { useState } from 'react';
import PropertyCard3D from './PropertyCard3D';
import { Property } from '../../types/property';
import { Search, Filter, Home, Building, SlidersHorizontal } from 'lucide-react';

interface PropertyListProps {
  properties: Property[];
  selectedPropertyId: string | null;
  onSelectProperty: (property: Property) => void;
  propertyTypes: string[];
  filters: {
    usage: string;
    minArea: number;
    maxArea: number;
  };
  onFilterChange: (filters: any) => void;
  loading: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  propertyTypes,
  filters,
  onFilterChange,
  loading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter properties based on search term
  const filteredProperties = properties.filter(property => 
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.mainUsage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.requestDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle filter changes
  const handleFilterChange = (key: string, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search and Filter Section */}
      <div className="p-4 bg-white shadow-sm z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className={`${showFilters ? 'text-blue-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slideDown">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  className="w-full p-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.usage}
                  onChange={(e) => handleFilterChange('usage', e.target.value)}
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Area (m²)</label>
                <input
                  type="number"
                  className="w-full p-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.minArea}
                  onChange={(e) => handleFilterChange('minArea', Number(e.target.value))}
                  min="0"
                  step="10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Area (m²)</label>
                <input
                  type="number"
                  className="w-full p-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.maxArea}
                  onChange={(e) => handleFilterChange('maxArea', Number(e.target.value))}
                  min="0"
                  step="10"
                />
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <button 
                className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 mr-2"
                onClick={() => onFilterChange({ usage: '', minArea: 0, maxArea: 1000 })}
              >
                Reset
              </button>
              <button 
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
              >
                <SlidersHorizontal size={14} className="mr-1" />
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Property Cards */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard3D
                key={property.id}
                property={property}
                isSelected={property.id === selectedPropertyId}
                onClick={() => onSelectProperty(property)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Building size={48} className="mb-4 opacity-30" />
            <p>No properties found matching your criteria.</p>
            <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;