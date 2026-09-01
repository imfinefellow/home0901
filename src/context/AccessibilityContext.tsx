import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilityFontSize, AccessibilitySettings } from '../types';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setFontSize: (size: AccessibilityFontSize) => void;
  toggleHighContrast: () => void;
  toggleTextToSpeech: () => void;
  toggleSimpleMode: () => void;
  toggleReadingRuler: () => void;
  toggleDyslexiaFont: () => void;
  resetAccessibility: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  textToSpeech: false,
  simpleMode: false,
  readingRuler: false,
  dyslexiaFont: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('renaissance_accessibility');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('renaissance_accessibility', JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to persist accessibility settings to localStorage', e);
    }

    // Apply class to body for font size & high contrast
    const root = document.documentElement;
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge', 'high-contrast-mode');
    
    if (settings.fontSize === 'large') {
      root.classList.add('font-size-large');
    } else if (settings.fontSize === 'xlarge') {
      root.classList.add('font-size-xlarge');
    } else {
      root.classList.add('font-size-normal');
    }

    if (settings.highContrast) {
      root.classList.add('high-contrast-mode');
    }
  }, [settings]);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    window.speechSynthesis.cancel();
    if (!text || !text.trim()) return;

    // Clean markdown/html tags for natural reading
    const cleanText = text
      .replace(/[*_#`~>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95; // Slightly slower for clear understanding
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const setFontSize = (fontSize: AccessibilityFontSize) => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleTextToSpeech = () => {
    setSettings(prev => {
      const next = !prev.textToSpeech;
      if (!next) stopSpeaking();
      return { ...prev, textToSpeech: next };
    });
  };

  const toggleSimpleMode = () => {
    setSettings(prev => ({ ...prev, simpleMode: !prev.simpleMode }));
  };

  const toggleReadingRuler = () => {
    setSettings(prev => ({ ...prev, readingRuler: !prev.readingRuler }));
  };

  const toggleDyslexiaFont = () => {
    setSettings(prev => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }));
  };

  const resetAccessibility = () => {
    stopSpeaking();
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setFontSize,
        toggleHighContrast,
        toggleTextToSpeech,
        toggleSimpleMode,
        toggleReadingRuler,
        toggleDyslexiaFont,
        resetAccessibility,
        speak,
        stopSpeaking,
        isSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
