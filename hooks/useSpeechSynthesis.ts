import { useState, useEffect, useCallback } from 'react';

export const useSpeechSynthesis = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        // Guard against environments where speechSynthesis is not available.
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            console.warn('Speech synthesis not supported by this browser.');
            return;
        }

        const handleVoicesChanged = () => {
            setVoices(window.speechSynthesis.getVoices());
        };
        
        // Voices may load asynchronously. We call it once to get the initial list,
        // and set up a listener for when the list is updated.
        handleVoicesChanged();
        window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
        
        return () => {
            // Guard again in case window/speechSynthesis becomes unavailable on cleanup.
            if (window.speechSynthesis) {
                 window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            }
        };
    }, []);

    const speak = useCallback((text: string) => {
        if (!window.speechSynthesis) {
            console.warn("浏览器不支持语音合成。");
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find a Chinese voice
        const chineseVoice = voices.find(voice => voice.lang.startsWith('zh-CN'));
        
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        } else {
            console.warn("未找到中文语音包，将使用默认语音。")
        }

        utterance.lang = 'zh-CN';
        utterance.pitch = 1.1;
        utterance.rate = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error("语音合成错误:", e);
            setIsSpeaking(false);
        };

        // Cancel any ongoing speech before starting a new one
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }, [voices]);

    const cancel = useCallback(() => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    return { speak, cancel, isSpeaking };
};