import { useState, useEffect } from 'react';
import { Property, PropertyMarker } from '../types/property';
import { fetchProperties } from '../services/googleSheets';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    usage: '',
    minArea: 0,
    maxArea: 1000,
  });

  // Fetch properties when component mounts
  useEffect(() => {
    const getProperties = async () => {
      try {
        setLoading(true);
        const fetchedProperties = await fetchProperties();
        setProperties(fetchedProperties);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error('Error in useProperties:', err);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  // Transform properties to markers for the map
  const markers: PropertyMarker[] = properties.map(property => ({
    id: property.id,
    position: [property.latitude, property.longitude] as [number, number],
    address: property.address,
    mainUsage: property.mainUsage,
  }));

  // Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    if (filters.usage && property.mainUsage !== filters.usage) return false;
    if (property.mainArea < filters.minArea) return false;
    if (property.mainArea > filters.maxArea) return false;
    return true;
  });

  // Apply filters
  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Get unique property types for filter dropdown
  const propertyTypes = [...new Set(properties.map(p => p.mainUsage))].filter(Boolean);

  return {
    properties: filteredProperties,
    allProperties: properties,
    loading,
    error,
    markers,
    selectedProperty,
    setSelectedProperty,
    filters,
    applyFilters,
    propertyTypes,
  };
};