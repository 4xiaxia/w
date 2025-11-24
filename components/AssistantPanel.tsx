import React, { useEffect } from 'react';
import { MicrophoneIcon, SendIcon, SparklesIcon, StopIcon } from './icons';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface AssistantPanelProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export const AssistantPanel: React.FC<AssistantPanelProps> = ({ searchText, onSearchTextChange }) => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onSearchTextChange(transcript);
    }
  }, [transcript, onSearchTextChange]);

  const handleVoiceClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real chat app, this would send the message. Here, it just confirms the search filter.
    console.log("Search submitted:", searchText);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gray-50/0">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-2 animate-slide-in-bottom">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="p-2">
            <SparklesIcon className="w-6 h-6 text-indigo-500" />
          </div>
          <input
            type="text"
            placeholder="规划路线，或搜索景点..."
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            className="flex-1 w-full p-2 text-base bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
            aria-label="AI助手输入框"
          />
          {hasRecognitionSupport && (
            <button
              type="button"
              onClick={handleVoiceClick}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label={isListening ? '停止语音输入' : '开始语音输入'}
            >
              {isListening ? (
                <StopIcon className="w-6 h-6 text-red-500 animate-pulse-mic" />
              ) : (
                <MicrophoneIcon className="w-6 h-6" />
              )}
            </button>
          )}
          <button
            type="submit"
            className="p-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all active:scale-95 disabled:bg-indigo-300"
            aria-label="发送"
            disabled={!searchText}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};