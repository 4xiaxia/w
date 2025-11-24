import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { PointOfInterest, POIType, Route } from '../types';
import { NavigateIcon } from './icons';

// Fix for default icon path issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getPOIIcon = (type: POIType) => {
    let colorClass = 'bg-gray-500';
    if (type === 'red') colorClass = 'bg-red-600';
    else if (type === 'ecology') colorClass = 'bg-green-600';
    else if (type === 'folk') colorClass = 'bg-amber-600';

    return L.divIcon({
        html: `<div class="p-1.5 rounded-full shadow-lg ${colorClass}"><svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
        className: 'bg-transparent border-0',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28],
    });
};

const UserLocationMarker: React.FC<{ lat: number, lng: number, isNavigating: boolean }> = ({ lat, lng, isNavigating }) => {
    const userIcon = L.divIcon({
        html: `<div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>`,
        className: 'bg-transparent border-0',
        iconSize: [16, 16],
    });
    
    const accuracyCircle = L.divIcon({
        html: `<div class="w-12 h-12 rounded-full bg-blue-500/20 ${isNavigating ? 'animate-ping' : ''}"></div>`,
        className: 'bg-transparent border-0',
        iconSize: [48, 48],
    });

    return (
        <>
            <Marker position={[lat, lng]} icon={accuracyCircle} />
            <Marker position={[lat, lng]} icon={userIcon}><Popup>你在这里</Popup></Marker>
        </>
    );
};

const DestinationMarker: React.FC<{ poi: PointOfInterest }> = ({ poi }) => {
    const destinationIcon = L.divIcon({
        html: `
            <div class="relative flex items-center justify-center">
                <div class="absolute w-10 h-10 rounded-full bg-indigo-500/30 animate-ping"></div>
                <div class="relative p-1.5 rounded-full shadow-lg bg-indigo-600">
                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                </div>
            </div>`,
        className: 'bg-transparent border-0',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    return (
        <Marker position={[poi.lat, poi.lng]} icon={destinationIcon} zIndexOffset={1000}>
            <Popup>
                <div className="font-sans">
                    <h3 className="font-bold text-lg mb-1">{poi.name}</h3>
                    <p className="text-xs text-gray-600">这是您的目的地</p>
                </div>
            </Popup>
        </Marker>
    );
};


const MapFlyToController: React.FC<{ coords: [number, number] | null }> = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.flyTo(coords, 17, { animate: true, duration: 1.5 });
        }
    }, [coords, map]);
    return null;
};

const FitBoundsController: React.FC<{
  pois: PointOfInterest[];
  userLocation: { latitude: number; longitude: number } | null;
  isNavigating: boolean;
  navigationDestination: PointOfInterest | null;
}> = ({ pois, userLocation, isNavigating, navigationDestination }) => {
  const map = useMap();
  useEffect(() => {
    if (isNavigating) {
        if (userLocation && navigationDestination) {
            const points: L.LatLngExpression[] = [
                [userLocation.latitude, userLocation.longitude],
                [navigationDestination.lat, navigationDestination.lng]
            ];
            const bounds = L.latLngBounds(points);
            if (bounds.isValid()) {
                map.flyToBounds(bounds, { padding: [70, 70], maxZoom: 17, duration: 1.5 });
            }
        }
        return;
    }

    if (!pois) return;

    // Defensively filter for POIs with valid coordinates to prevent crashes.
    const validPois = pois.filter(p => 
        p && typeof p.lat === 'number' && typeof p.lng === 'number' && !isNaN(p.lat) && !isNaN(p.lng)
    );
    
    if (validPois.length === 0 && !userLocation) return;

    const points: L.LatLngExpression[] = validPois.map(p => [p.lat, p.lng]);
    if (userLocation) {
        points.push([userLocation.latitude, userLocation.longitude]);
    }

    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      if (bounds.isValid()) {
        map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 16, duration: 1 });
      }
    }
  }, [pois, userLocation, map, isNavigating, navigationDestination]);

  return null;
};

const POIMarker: React.FC<{ poi: PointOfInterest; onSelectPoi: (poi: PointOfInterest) => void; onStartNavigation: (poi: PointOfInterest) => void; }> = ({ poi, onSelectPoi, onStartNavigation }) => {
    return (
        <Marker 
            key={poi.id} 
            position={[poi.lat, poi.lng]} 
            icon={getPOIIcon(poi.type)}
            eventHandlers={{
                click: () => onSelectPoi(poi),
            }}
        >
            <Popup>
                <div className="font-sans">
                    <h3 className="font-bold text-lg mb-1">{poi.name}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{poi.desc}</p>
                    <button 
                        onClick={(e) => {
                           e.stopPropagation();
                           onStartNavigation(poi);
                        }}
                        className="flex items-center justify-center w-full px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all active:scale-95"
                    >
                        <NavigateIcon className="w-4 h-4 mr-2"/>
                        导航
                    </button>
                </div>
            </Popup>
        </Marker>
    );
};

interface MapProps {
    nearbyPois: PointOfInterest[];
    userLocation: { latitude: number; longitude: number; } | null;
    flyToCoords: [number, number] | null;
    onSelectPoi: (poi: PointOfInterest) => void;
    currentRoute: Route | null;
    onStartNavigation: (poi: PointOfInterest) => void;
    isNavigating: boolean;
    navigationDestination: PointOfInterest | null;
}

const Map: React.FC<MapProps> = ({ 
    nearbyPois, 
    userLocation, 
    flyToCoords, 
    onSelectPoi,
    currentRoute,
    onStartNavigation,
    isNavigating,
    navigationDestination
}) => {
    const center: [number, number] = useMemo(() => 
        userLocation ? [userLocation.latitude, userLocation.longitude] : [25.236, 118.205], // Fallback to village center
        [userLocation]
    );

    return (
        <MapContainer center={center} zoom={15} className="w-full h-full z-0">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userLocation && <UserLocationMarker lat={userLocation.latitude} lng={userLocation.longitude} isNavigating={isNavigating} />}
            
            {nearbyPois.map(poi => {
                if (isNavigating && navigationDestination && poi.id === navigationDestination.id) {
                    return null; // Don't render a normal marker for the destination
                }
                return <POIMarker key={`nearby-${poi.id}`} poi={poi} onSelectPoi={onSelectPoi} onStartNavigation={onStartNavigation} />;
            })}

            {currentRoute && (
                <Polyline positions={currentRoute.polyline} color="#2563EB" weight={6} opacity={0.8} />
            )}
            
            {isNavigating && navigationDestination && (
                <DestinationMarker poi={navigationDestination} />
            )}

            <MapFlyToController coords={flyToCoords} />
            <FitBoundsController 
                pois={nearbyPois} 
                userLocation={userLocation} 
                isNavigating={isNavigating}
                navigationDestination={navigationDestination}
            />
        </MapContainer>
    );
};

export default Map;