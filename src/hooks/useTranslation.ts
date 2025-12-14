"use client";

import { useLanguage } from '@/context/LanguageContext';
import { TranslationKey } from '@/lib/translations';

export function useTranslation() {
    const { t, language, setLanguage } = useLanguage();
    return { t, language, setLanguage };
}
