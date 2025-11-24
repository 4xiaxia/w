import { useState, useRef, useCallback } from 'react';

// Fix for missing SpeechRecognition types if not available in the default DOM lib.
// These are minimal definitions to satisfy the usage in this file.
interface SpeechRecognitionAlternative {
    readonly transcript: string;
}
interface SpeechRecognitionResult {
    readonly [index: number]: SpeechRecognitionAlternative;
    readonly length: number;
}
interface SpeechRecognitionResultList {
    readonly [index: number]: SpeechRecognitionResult;
    readonly length: number;
}
interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
}
interface SpeechRecognition {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    onstart: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
}

// TypeScript interface for the SpeechRecognition API, including webkit prefixes
interface ISpeechRecognition extends SpeechRecognition {
  // No specific additions needed for this implementation
}

// Access the browser's SpeechRecognition API, including webkit-prefixed versions
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

/**
 * A custom React hook for handling speech-to-text recognition.
 *
 * @returns An object containing the recognition state and control functions.
 * @property {boolean} isListening - Whether the microphone is currently active.
 * @property {string} transcript - The transcribed text from the speech input.
 * @property {string | null} error - Any error message that occurred during recognition.
 * @property {() => void} startListening - Function to start the speech recognition.
 * @property {() => void} stopListening - Function to stop the speech recognition.
 * @property {boolean} hasRecognitionSupport - Indicates if the browser supports the SpeechRecognition API.
 */
export const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<ISpeechRecognition | null>(null);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            recognitionRef.current = null;
        }
    }, []);

    const startListening = useCallback(() => {
        if (!SpeechRecognitionAPI) {
            setError('您的浏览器不支持语音识别。');
            return;
        }
        if (isListening) {
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;
        
        recognition.lang = 'zh-CN';
        recognition.interimResults = true; // Show results as they are recognized
        recognition.continuous = false;    // Stop after the first utterance

        recognition.onstart = () => {
            setTranscript('');
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const currentTranscript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setTranscript(currentTranscript);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            setError(`语音识别错误: ${event.error}`);
            stopListening();
        };

        recognition.onend = () => {
            // onend can be called for various reasons, so we ensure the state is correct.
            if(isListening){
                setIsListening(false);
                recognitionRef.current = null;
            }
        };

        recognition.start();

    }, [isListening, stopListening]);

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        hasRecognitionSupport: !!SpeechRecognitionAPI,
    };
};
