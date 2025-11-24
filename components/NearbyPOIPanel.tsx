import React, { useState, useEffect, useRef } from 'react';
import { PointOfInterest } from '../types';
import { villagePOIs, poiDetails } from '../data/villageData';
import { ArrowLeftIcon, MoreHorizIcon, EyeIcon, AudioIcon, CameraIcon, DirectionsIcon, StopIcon, InfoIcon } from './icons';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { CameraRecognition } from './CameraRecognition';

interface POIDetailScreenProps {
    poiId: string;
    onBack: () => void;
    onSwitchToMap: (poi: PointOfInterest) => void;
}

export const POIDetailScreen: React.FC<POIDetailScreenProps> = ({ poiId, onBack, onSwitchToMap }) => {
    const poi = villagePOIs.find(p => p.id === poiId) || null;
    const detail = poi ? poiDetails[poi.id] : null;

    const [activeTab, setActiveTab] = useState(0);
    const [isCameraOpen, setCameraOpen] = useState(false);
    const { speak, cancel, isSpeaking } = useSpeechSynthesis();
    
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});

    useEffect(() => {
        // Stop any speech when POI changes or component unmounts
        return () => {
            cancel();
        };
    }, [poiId, cancel]);

    const tabs = detail ? [{ title: "图文简介", content: detail.story }, ...detail.subTopics] : [];

    useEffect(() => {
        if (tabsContainerRef.current) {
            const activeButton = tabsContainerRef.current.children[activeTab] as HTMLElement;
            if(activeButton) {
                setIndicatorStyle({
                    left: activeButton.offsetLeft,
                    width: activeButton.offsetWidth,
                });
            }
        }
    }, [activeTab, tabs]);

    useEffect(() => {
        // When the active tab changes, stop the current speech.
        cancel();
    }, [activeTab, cancel]);

    const activeContent = tabs[activeTab]?.content || '';

    const handleAudioClick = () => {
        if (isSpeaking) {
            cancel();
        } else if (activeContent) {
            const textToSpeak = (tabs[activeTab]?.title || poi?.name || '') + "。" + activeContent;
            speak(textToSpeak);
        }
    };
    
    const handleSwitchToMapClick = () => {
        if (poi) {
            onSwitchToMap(poi);
        }
    }

    if (!poi || !detail) return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-black/30 rounded-full text-white"><ArrowLeftIcon className="w-6 h-6" /></button>
        <div className="text-gray-600">未找到景点信息。</div>
      </div>
    );

    return (
        <>
        <div className="h-full w-full bg-gray-100 flex flex-col overflow-hidden">
            <div className="flex-shrink-0 relative">
                <img src={poi.image} alt={poi.name} className="w-full h-60 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-0 right-0 p-4 flex justify-between items-center z-10">
                    <button onClick={onBack} className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white transition-transform active:scale-95"><ArrowLeftIcon className="w-6 h-6" /></button>
                    <div className="flex items-center space-x-2">
                         <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white transition-transform active:scale-95"><MoreHorizIcon className="w-6 h-6" /></button>
                         <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white transition-transform active:scale-95"><EyeIcon className="w-6 h-6" /></button>
                    </div>
                </div>
                 <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-2xl font-bold">{poi.name}</h1>
                    <p className="text-sm">{poi.local_name}</p>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-24">
                <div className="p-4 bg-white">
                     <div className="grid grid-cols-3 gap-3 text-center">
                         <button 
                            onClick={handleAudioClick}
                            className={`rounded-lg p-3 flex flex-col items-center justify-center transition-all active:scale-95 ${isSpeaking ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                        >
                            {isSpeaking ? <StopIcon className="w-6 h-6" /> : <AudioIcon className="w-6 h-6" />}
                            <span className="text-xs font-semibold mt-1">{isSpeaking ? '停止讲解' : '语音讲解'}</span>
                        </button>
                         <button 
                            onClick={() => setCameraOpen(true)}
                            className="bg-blue-100 text-blue-700 rounded-lg p-3 flex flex-col items-center justify-center transition-transform active:scale-95">
                            <CameraIcon className="w-6 h-6" />
                            <span className="text-xs font-semibold mt-1">拍照讲解</span>
                        </button>
                         <button onClick={handleSwitchToMapClick} className="bg-orange-100 text-orange-700 rounded-lg p-3 flex flex-col items-center justify-center transition-transform active:scale-95">
                            <DirectionsIcon className="w-6 h-6" />
                            <span className="text-xs font-semibold mt-1">查看地图</span>
                        </button>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <p><strong>游览时长:</strong> {poi.duration}</p>
                        <p><strong>开放时间:</strong> {poi.open_time}</p>
                        {poi.tips && <p className="flex items-start"><InfoIcon className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0 text-amber-600"/> <strong>提示:</strong> {poi.tips}</p>}
                    </div>
                </div>
                
                <div className="p-4 mt-2 bg-white flex-1">
                    <h2 className="font-semibold text-gray-800">景点故事</h2>
                    <p className="text-sm text-gray-500 mb-3">点击下方快速切换讲解</p>
                    <div className="relative">
                        <div className="relative mt-3 border-b border-gray-200 overflow-x-auto -mx-4 px-4">
                            <div ref={tabsContainerRef} className="flex space-x-1 sm:space-x-2">
                                {tabs.map((tab, index) => (
                                     <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`pb-2 px-3 font-semibold text-sm whitespace-nowrap transition-all active:scale-95 ${activeTab === index ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                                     >{tab.title}</button>
                                ))}
                            </div>
                            <div 
                                className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out"
                                style={indicatorStyle}
                            ></div>
                        </div>

                        <div key={activeTab} className="pt-4 text-gray-700 text-base leading-relaxed relative animate-fade-in">
                            {activeContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isCameraOpen && <CameraRecognition onClose={() => setCameraOpen(false)} />}
        </>
    );
};
