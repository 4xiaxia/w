import React, { useState } from 'react';
import { TourRoute } from '../types';
import { villagePOIs, tourRoutes } from '../data/villageData';
import { AssistantPanel } from './AssistantPanel';
import { RouteCard } from './RouteCard';
import { MapPinIcon } from './icons';

interface HomeScreenProps {
  onSelectPoi: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectPoi }) => {
  const [searchText, setSearchText] = useState('');

  const filteredRoutes = tourRoutes.filter(route => {
    if (!searchText) return true;
    const query = searchText.toLowerCase();
    const poisInRoute = villagePOIs.filter(p => route.related_pois.includes(p.id));

    return (
      route.name.toLowerCase().includes(query) ||
      route.desc.toLowerCase().includes(query) ||
      route.local_name.toLowerCase().includes(query) ||
      route.route_config.target_audience.some(t => t.toLowerCase().includes(query)) ||
      (route.route_config.theme && route.route_config.theme.toLowerCase().includes(query)) ||
      poisInRoute.some(p => p.name.toLowerCase().includes(query))
    );
  });
  
  const redRoutes = filteredRoutes.filter(r => r.type.includes('red'));
  const ecoFolkRoutes = filteredRoutes.filter(r => (r.type.includes('ecology') || r.type.includes('folk')) && !r.type.includes('red'));

  return (
    <div className="bg-gray-50 h-full flex flex-col">
      <header className="p-4 flex-shrink-0">
        <div className="flex items-center">
            <MapPinIcon className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold ml-1.5 text-gray-700">福建省永春县东里村</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">您好，</h1>
        <p className="text-gray-600">想去哪里？让AI为您规划路线</p>
      </header>
      
      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-28">
          {redRoutes.length > 0 && (
              <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">红色记忆</h2>
                  {redRoutes.map(route => (
                      <RouteCard key={route.id} route={route} onSelectPoi={onSelectPoi} />
                  ))}
              </div>
          )}
          {ecoFolkRoutes.length > 0 && (
              <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">生态风情</h2>
                  {ecoFolkRoutes.map(route => (
                      <RouteCard key={route.id} route={route} onSelectPoi={onSelectPoi} />
                  ))}
              </div>
          )}
          {filteredRoutes.length === 0 && (
            <div className="text-center py-10">
                <p className="text-gray-500">未找到匹配的结果。</p>
            </div>
          )}
      </main>

      <AssistantPanel searchText={searchText} onSearchTextChange={setSearchText} />
    </div>
  );
};