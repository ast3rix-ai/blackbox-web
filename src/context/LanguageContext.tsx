"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get cookie value
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    // Load saved language preference on mount, or detect from geo
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;

        if (savedLang && (savedLang === 'en' || savedLang === 'sk')) {
            // User has a saved preference - use it
            setLanguage(savedLang);
        } else {
            // No saved preference - check geo-detection
            const geoCountry = getCookie('geo-country');

            if (geoCountry === 'SK') {
                // Visitor from Slovakia - set Slovak
                setLanguage('sk');
                localStorage.setItem('language', 'sk');
            } else {
                // Everyone else - set English
                setLanguage('en');
                localStorage.setItem('language', 'en');
            }
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
