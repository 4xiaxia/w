import React, { useState, useMemo } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { POIDetailScreen } from './components/NearbyPOIPanel';
import Map from './components/Map';
import { villagePOIs } from './data/villageData';
import { useGeolocation } from './hooks/useGeolocation';
import { PointOfInterest, Route } from './types';
import { CrosshairIcon, StopIcon } from './components/icons';

type View = 'list' | 'map';
type ListScreen = 'home' | 'detail';

const NavigationInstructions: React.FC<{ destinationName: string; onStop: () => void; }> = ({ destinationName, onStop }) => {
    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 flex items-center justify-between z-20 animate-pop-in">
            <div>
                <p className="text-xs text-gray-500">正在导航至</p>
                <p className="font-bold text-gray-900">{destinationName}</p>
            </div>
            <button onClick={onStop} className="p-3 bg-red-500 text-white rounded-full shadow-md active:scale-95 transition-transform">
                <StopIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

function App() {
  const [view, setView] = useState<View>('list');
  const [listScreen, setListScreen] = useState<ListScreen>('home');
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [flyToCoords, setFlyToCoords] = useState<[number, number] | null>(null);
  
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  const userLocation = useGeolocation();

  const selectedPoi = useMemo(() => {
    return villagePOIs.find(p => p.id === selectedPoiId) || null;
  }, [selectedPoiId]);

  const handleSelectPoiFromList = (id: string) => {
    setSelectedPoiId(id);
    setListScreen('detail');
  };
  
  const handleSelectPoiFromMap = (poi: PointOfInterest) => {
    setSelectedPoiId(poi.id);
    setFlyToCoords([poi.lat, poi.lng]);
    setListScreen('detail');
    setView('list');
  };

  const handleBackToListHome = () => {
    setListScreen('home');
    setSelectedPoiId(null);
  };
  
  const handleSwitchToMap = (poi: PointOfInterest) => {
    setView('map');
    // Use a timeout to ensure the map is visible before flying
    setTimeout(() => setFlyToCoords([poi.lat, poi.lng]), 100);
  };

  const handleStartNavigation = (poi: PointOfInterest) => {
    if (userLocation.latitude !== null && userLocation.longitude !== null) {
      const route: Route = {
        instructions: [
            { text: `前往 ${poi.name}`, lat: poi.lat, lng: poi.lng }
        ],
        polyline: [
          [userLocation.latitude, userLocation.longitude],
          [poi.lat, poi.lng]
        ]
      };
      setCurrentRoute(route);
      setSelectedPoiId(poi.id); // Set the selected POI to trigger UI updates
      setIsNavigating(true);
      setView('map');
      setFlyToCoords(null); // Clear single-point focus to allow bounds-fitting
    } else {
      alert("无法获取当前位置，无法开始导航。");
    }
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setCurrentRoute(null);
  };
  
  const centerMapOnUser = () => {
      if(userLocation.latitude !== null && userLocation.longitude !== null) {
          setFlyToCoords([userLocation.latitude, userLocation.longitude]);
      }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 font-sans flex flex-col relative overflow-hidden">
      <div className={`w-full h-full absolute transition-all duration-500 ease-in-out ${view === 'map' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <Map
            nearbyPois={villagePOIs}
            userLocation={userLocation.latitude !== null && userLocation.longitude !== null ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : null}
            flyToCoords={flyToCoords}
            onSelectPoi={handleSelectPoiFromMap}
            currentRoute={currentRoute}
            onStartNavigation={handleStartNavigation}
            isNavigating={isNavigating}
            navigationDestination={isNavigating ? selectedPoi : null}
          />
          {isNavigating && selectedPoi && (
            <NavigationInstructions destinationName={selectedPoi.name} onStop={handleStopNavigation} />
          )}
           <button onClick={centerMapOnUser} className="absolute bottom-24 right-4 z-10 bg-white p-3 rounded-full shadow-lg text-gray-700 active:scale-95 transition-transform">
               <CrosshairIcon className="w-6 h-6"/>
           </button>
      </div>
        
      <div className={`w-full h-full absolute bg-gray-50 transition-opacity duration-300 ${view === 'list' ? 'opacity-100 z-20' : 'opacity-0 z-0 pointer-events-none'}`}>
         <div className={`h-full w-full transition-transform duration-400 ease-in-out ${listScreen === 'detail' ? '-translate-x-full' : 'translate-x-0'}`}>
            <HomeScreen onSelectPoi={handleSelectPoiFromList} />
          </div>
          <div className={`absolute top-0 left-0 h-full w-full bg-gray-50 transition-transform duration-400 ease-in-out ${listScreen === 'detail' ? 'translate-x-0' : 'translate-x-full'}`}>
            {selectedPoiId && <POIDetailScreen poiId={selectedPoiId} onBack={handleBackToListHome} onSwitchToMap={handleSwitchToMap} />}
          </div>
      </div>
    </div>
  );
}

export default App;