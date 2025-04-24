import React, { useState, useEffect } from 'react';
import Map from './components/Map/Map';
import PropertyList from './components/PropertyCards/PropertyList';
import PropertyDetail from './components/PropertyDetails/PropertyDetail';
import Layout from './components/Layout/Layout';
import { useProperties } from './hooks/useProperties';
import { Property } from './types/property';

function App() {
  const {
    properties,
    loading,
    error,
    markers,
    selectedProperty,
    setSelectedProperty,
    filters,
    applyFilters,
    propertyTypes,
  } = useProperties();
  
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Handle marker click
  const handleMarkerClick = (id: string) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      setSelectedProperty(property);
      setShowPropertyDetail(true);
    }
  };
  
  // Handle property card click
  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyDetail(true);
  };
  
  // Close property detail modal
  const handleClosePropertyDetail = () => {
    setShowPropertyDetail(false);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    applyFilters(newFilters);
  };
  
  // Map component with needed props
  const mapComponent = (
    <Map 
      markers={markers} 
      selectedPropertyId={selectedProperty?.id || null}
      onMarkerClick={handleMarkerClick}
    />
  );
  
  // Sidebar component with property list
  const sidebarComponent = (
    <PropertyList 
      properties={properties}
      selectedPropertyId={selectedProperty?.id || null}
      onSelectProperty={handlePropertyClick}
      propertyTypes={propertyTypes}
      filters={filters}
      onFilterChange={handleFilterChange}
      loading={loading}
    />
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Properties</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout 
        mapComponent={mapComponent}
        sidebarComponent={sidebarComponent}
        isMobile={isMobile}
      />
      
      {/* Property Detail Modal */}
      {showPropertyDetail && selectedProperty && (
        <PropertyDetail 
          property={selectedProperty}
          onClose={handleClosePropertyDetail}
        />
      )}
    </>
  );
}

export default App;