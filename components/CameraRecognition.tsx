import React, { useState, useRef, useEffect, useCallback } from 'react';
import { recognizeLandmark } from '../services/geminiService';
import { PointOfInterest } from '../types';
import { CloseIcon, ShutterIcon, SparklesIcon } from './icons';

interface CameraRecognitionProps {
  onClose: () => void;
}

type RecognitionStatus = 'denied' | 'idle' | 'streaming' | 'capturing' | 'loading' | 'result' | 'error';

interface RecognitionResult {
  poi: PointOfInterest;
  story: string;
}

const LoadingIndicator: React.FC = () => (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
        <SparklesIcon className="w-12 h-12 text-indigo-400 animate-pulse" />
        <p className="mt-4 text-lg font-semibold animate-pulse">AI 识别中...</p>
        <p className="text-sm text-gray-300">请稍候</p>
    </div>
);

const ResultPanel: React.FC<{ 
    result: RecognitionResult | null;
    capturedImage: string;
    onRetry: () => void;
    onClose: () => void;
}> = ({ result, capturedImage, onRetry, onClose }) => (
    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end z-30">
        <div className="bg-white rounded-t-2xl p-4 animate-slide-in-bottom max-h-[80vh] flex flex-col">
            <div className="flex-1 overflow-y-auto">
                 <img src={capturedImage} alt="Captured for recognition" className="w-full h-48 object-cover rounded-lg mb-4" />
                {result ? (
                    <>
                        <p className="text-sm font-semibold text-green-600">识别成功</p>
                        <h2 className="text-2xl font-bold text-gray-900">{result.poi.name}</h2>
                        <p className="mt-2 text-gray-700 leading-relaxed">{result.story}</p>
                    </>
                ) : (
                    <>
                        <p className="text-sm font-semibold text-red-600">识别失败</p>
                        <h2 className="text-2xl font-bold text-gray-900">未能识别出景点</h2>
                        <p className="mt-2 text-gray-700">请尝试调整拍摄角度，或确保光线充足后重试。</p>
                    </>
                )}
            </div>
            <div className="flex-shrink-0 pt-4 flex items-center space-x-3">
                 <button onClick={onRetry} className="flex-1 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg active:scale-95 transition-transform">
                    重试
                 </button>
                 <button onClick={onClose} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg active:scale-95 transition-transform">
                    关闭
                 </button>
            </div>
        </div>
    </div>
);

export const CameraRecognition: React.FC<CameraRecognitionProps> = ({ onClose }) => {
  const [status, setStatus] = useState<RecognitionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const cleanupCamera = useCallback(() => {
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    const startCamera = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            setStatus('error');
            setErrorMessage('您的浏览器不支持相机功能。');
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            }
            setStatus('streaming');
        } catch (err) {
            console.error(err);
            setStatus('denied');
            setErrorMessage('无法访问相机。请检查应用权限。');
        }
    };
    startCamera();
    return () => cleanupCamera();
  }, [cleanupCamera]);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setStatus('capturing');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if(context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
        setStatus('loading');
        
        try {
            // strip prefix `data:image/jpeg;base64,`
            const base64Image = imageDataUrl.split(',')[1];
            const recognitionResult = await recognizeLandmark(base64Image);
            setResult(recognitionResult);
        } catch (err) {
            console.error(err);
            setResult(null); // Explicitly set to null for 'not found' case
        } finally {
            setStatus('result');
        }
    } else {
        setStatus('error');
        setErrorMessage('无法捕获图像。');
    }
  };

  const handleRetry = () => {
      setResult(null);
      setCapturedImage('');
      setStatus('streaming');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 animate-fade-in flex flex-col items-center justify-center">
        <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white active:scale-95 transition-transform z-40"
            aria-label="关闭相机"
        >
            <CloseIcon className="w-6 h-6" />
        </button>

        {status === 'streaming' && (
            <div className="absolute bottom-10 z-10">
                <button 
                    onClick={handleCapture}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
                    aria-label="拍照"
                >
                    <div className="w-16 h-16 rounded-full border-4 border-black"></div>
                </button>
            </div>
        )}

        {status === 'loading' && <LoadingIndicator />}
        
        {status === 'result' && (
            <ResultPanel 
                result={result} 
                capturedImage={capturedImage}
                onRetry={handleRetry}
                onClose={onClose}
            />
        )}
        
        {(status === 'denied' || status === 'error') && (
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center text-white text-center p-8 z-20">
                <h2 className="text-xl font-bold">出错了</h2>
                <p className="mt-2 text-gray-300">{errorMessage}</p>
                <button 
                    onClick={onClose} 
                    className="mt-6 px-6 py-2 bg-indigo-600 rounded-lg font-semibold"
                >
                    返回
                </button>
            </div>
        )}
    </div>
  );
};
