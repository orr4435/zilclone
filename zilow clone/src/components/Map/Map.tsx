import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { PropertyMarker } from '../../types/property';
import { Home, Building, ShoppingBag } from 'lucide-react';

interface MapProps {
  markers: PropertyMarker[];
  selectedPropertyId: string | null;
  onMarkerClick: (id: string) => void;
}

// Custom hook to handle map re-centering
const MapController: React.FC<{
  markers: PropertyMarker[];
  selectedPropertyId: string | null;
}> = ({ markers, selectedPropertyId }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedPropertyId) {
      const marker = markers.find(m => m.id === selectedPropertyId);
      if (marker) {
        map.setView(marker.position, 16, { animate: true });
      }
    } else if (markers.length > 0) {
      // Create bounds from all markers
      const latitudes = markers.map(m => m.position[0]);
      const longitudes = markers.map(m => m.position[1]);
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);
      
      map.fitBounds([[minLat, minLng], [maxLat, maxLng]], { padding: [50, 50] });
    }
  }, [map, markers, selectedPropertyId]);

  return null;
};

// Create custom icons based on property type
const getIcon = (usage: string) => {
  const iconSize = [30, 30];
  let IconComponent;
  let color;

  if (usage.includes('מגורים')) {
    IconComponent = Home;
    color = '#3B82F6'; // blue
  } else if (usage.includes('משרדים')) {
    IconComponent = Building;
    color = '#10B981'; // green
  } else if (usage.includes('מסחרי')) {
    IconComponent = ShoppingBag;
    color = '#F59E0B'; // yellow
  } else {
    IconComponent = Building;
    color = '#6B7280'; // gray
  }

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="${iconSize[0]}" height="${iconSize[1]}">
      <path fill="${color}" d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
    </svg>
  `;

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
    iconSize: iconSize,
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const Map: React.FC<MapProps> = ({ markers, selectedPropertyId, onMarkerClick }) => {
  const defaultCenter: [number, number] = [31.8667, 34.7431]; // Default center if no markers
  
  return (
    <div className="h-full w-full" style={{ minHeight: '400px' }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={getIcon(marker.mainUsage)}
            eventHandlers={{
              click: () => onMarkerClick(marker.id),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{marker.address}</p>
                <p>{marker.mainUsage}</p>
                <button 
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                  onClick={() => onMarkerClick(marker.id)}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapController markers={markers} selectedPropertyId={selectedPropertyId} />
      </MapContainer>
    </div>
  );
};

export default Map;