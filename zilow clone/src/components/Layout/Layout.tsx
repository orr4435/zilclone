import React, { useState } from 'react';
import { Home, Map as MapIcon, Menu, X, Info, ChevronRight, ChevronLeft, FileText, Building, Users, Calendar } from 'lucide-react';
import { Property } from '../../types/property';

interface LayoutProps {
  mapComponent: React.ReactNode;
  sidebarComponent: React.ReactNode;
  isMobile: boolean;
}

const Layout: React.FC<LayoutProps> = ({ mapComponent, sidebarComponent, isMobile }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<'map' | 'list'>(isMobile ? 'list' : 'map');
  
  const toggleView = () => {
    setActiveView(activeView === 'map' ? 'list' : 'map');
  };
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="mr-2 text-xl font-bold text-gray-900">מערכת נכסים</span>
            </div>
            
            {/* Mobile view selector */}
            {isMobile && (
              <div className="flex items-center">
                <button
                  onClick={toggleView}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {activeView === 'map' ? (
                    <>
                      <Home className="h-6 w-6" />
                      <span className="mr-2">נכסים</span>
                    </>
                  ) : (
                    <>
                      <MapIcon className="h-6 w-6" />
                      <span className="mr-2">מפה</span>
                    </>
                  )}
                </button>
              </div>
            )}
            
            {/* Desktop buttons */}
            {!isMobile && (
              <div className="flex items-center gap-2">
                <button 
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-6 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Calendar size={18} className="ml-1" />
                  היסטוריה
                </button>
                <button 
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-6 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Users size={18} className="ml-1" />
                  דיירים
                </button>
                <button 
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-6 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Building size={18} className="ml-1" />
                  בניינים
                </button>
                <button 
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-6 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText size={18} className="ml-1" />
                  דוחות
                </button>
                <button 
                  onClick={toggleSidebar}
                  className="mr-2 inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-6 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  {sidebarCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                  <span className="mr-1">{sidebarCollapsed ? 'הרחב' : 'כווץ'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Mobile: Toggle between map and list */}
        {isMobile ? (
          <div className="w-full h-full">
            {activeView === 'map' ? mapComponent : sidebarComponent}
          </div>
        ) : (
          /* Desktop: Show map and sidebar side by side */
          <>
            {/* Map on the left */}
            <div className={`
              transition-all duration-300 ease-in-out relative order-1
              ${sidebarCollapsed ? 'w-full' : 'w-3/5'}
            `}>
              {mapComponent}
            </div>
            
            {/* Sidebar on the right */}
            <div className={`
              border-l border-gray-200 bg-white
              transition-all duration-300 ease-in-out order-2
              ${sidebarCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-2/5 opacity-100'}
            `}>
              {sidebarComponent}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Layout;