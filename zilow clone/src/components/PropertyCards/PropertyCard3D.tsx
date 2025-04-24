import React from 'react';
import { Property } from '../../types/property';
import { Building, Users, Ruler, Calendar } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSelected: boolean;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isSelected, onClick }) => {
  const getImageUrl = (usage: string = '') => {
    const sheetId = '1pOObxqnLmQCgex1g6tFWZ_wgH3mUanl5TvHKOTyzF8E';
    const imageId = usage.includes('מגורים') 
      ? '1'  // Replace with actual image IDs from your sheet
      : usage.includes('משרדים')
      ? '2'
      : '3';
    return `https://drive.google.com/uc?export=view&id=${imageId}`;
  };

  const cardColor = property.mainUsage?.includes('מגורים')
    ? 'bg-blue-50'
    : property.mainUsage?.includes('משרדים')
    ? 'bg-green-50'
    : property.mainUsage?.includes('מסחרי')
    ? 'bg-amber-50'
    : 'bg-white';

  return (
    <div 
      className={`
        relative h-64 rounded-lg overflow-hidden cursor-pointer shadow-md transition-all
        ${isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]' : 'hover:shadow-lg'}
        ${cardColor}
      `}
      onClick={onClick}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={getImageUrl(property.mainUsage)}
          alt={property.mainUsage || 'Property'}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative h-full bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-between">
        <div className="text-white">
          <h3 className="text-xl font-semibold mb-2">{property.address || ''}</h3>
          <p className="text-sm opacity-90">{property.mainUsage || ''}</p>
          <p className="text-sm opacity-90">{property.mainArea ? `${property.mainArea} מ"ר` : ''}</p>
          <p className="text-sm opacity-90">{property.requestDescription || ''}</p>
        </div>
        
        <div className="bg-white bg-opacity-90 p-2 rounded">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Building size={14} />
              <span>{property.mainUsage || ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler size={14} />
              <span>{property.mainArea ? `${property.mainArea} מ"ר` : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{property.requestedUnits || 0} יח'</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{property.eventDate || ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;