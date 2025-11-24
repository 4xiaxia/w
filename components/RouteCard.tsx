import React, { useState } from 'react';
import { TourRoute } from '../types';
import { villagePOIs } from '../data/villageData';
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from './icons';

interface RouteCardProps {
  route: TourRoute;
  onSelectPoi: (id: string) => void;
}

const getRouteCategoryStyle = (type: string) => {
    if (type.includes('red')) return 'bg-red-100 text-red-800';
    if (type.includes('ecology')) return 'bg-green-100 text-green-800';
    if (type.includes('folk')) return 'bg-amber-100 text-amber-800';
    return 'bg-blue-100 text-blue-800';
};

const getDifficultyStyle = (difficulty: string) => {
    if (difficulty === 'easy') return 'text-green-600';
    if (difficulty === 'medium') return 'text-amber-600';
    if (difficulty === 'hard') return 'text-red-600';
    return 'text-gray-600';
};

export const RouteCard: React.FC<RouteCardProps> = ({ route, onSelectPoi }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const routePois = villagePOIs.filter(p => route.related_pois.includes(p.id));
    
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4 transition-all duration-300 ease-in-out hover:shadow-xl animate-pop-in">
            <div className="p-4">
                <div className="flex">
                    <img className="h-28 w-28 object-cover rounded-lg flex-shrink-0" src={route.image} alt={route.name} />
                    <div className="ml-4 flex-1">
                        <div className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getRouteCategoryStyle(route.type)}`}>
                            {route.route_config.theme || route.local_name}
                        </div>
                        <p className="text-lg font-bold text-gray-900 mt-1 leading-tight">{route.name}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{route.desc}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                         <span>🕒 {route.duration}</span>
                         <span className={`capitalize font-medium ${getDifficultyStyle(route.route_config.difficulty)}`}>难度: {route.route_config.difficulty}</span>
                         <span>📍 {route.related_pois.length}个景点</span>
                    </div>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-600 font-semibold flex items-center">
                        {isExpanded ? (
                            <span className="flex items-center">
                                收起 <ChevronUpIcon className="w-4 h-4 ml-1" />
                            </span>
                        ) : (
                            <span className="flex items-center">
                                详情 <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </span>
                        )}
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                    <h4 className="font-semibold text-sm text-gray-700 pt-3 pb-1">路线包含景点</h4>
                    {routePois.map((poi) => (
                        <div key={poi.id} onClick={() => onSelectPoi(poi.id)} className="flex items-center py-3 cursor-pointer hover:bg-gray-100 rounded-lg -mx-2 px-2 transition-all duration-200 active:scale-[0.98]">
                            <img src={poi.image} alt={poi.name} className="w-12 h-12 rounded-md object-cover"/>
                            <div className="ml-3 flex-1">
                                <p className="font-semibold text-gray-800">{poi.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">{poi.desc}</p>
                            </div>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};