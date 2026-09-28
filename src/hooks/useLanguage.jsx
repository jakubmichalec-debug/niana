import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations, LANGUAGES } from '../data/translations.js'

const STORAGE_KEY = 'niana:language'
const DEFAULT_LANG = 'en'
const LanguageContext = createContext(null)

function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.some((l) => l.code === value) ? value : null
  } catch {
    return null
  }
}

function detectPreferred() {
  try {
    const nav = window.navigator.languages || [window.navigator.language]
    // Only Slovak is offered besides English, so anything else (including
    // Dutch) lands on English rather than a half-translated page.
    return nav.some((l) => String(l).toLowerCase().startsWith('sk')) ? 'sk' : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

/** Walks "about.newsletterTitle" style keys, falling back en <- sk. */
function lookup(dict, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), dict)
}

/**
 * Language is a toggle rather than a URL segment (a deliberate choice —
 * simpler, but it does mean search engines only ever index the English
 * text, so Slovak pages won't surface in Slovak search results; moving to
 * /sk/ URLs later is contained to routing plus this provider).
 *
 * A stored choice always wins over the browser's preference, so someone
 * who explicitly picked English on a Slovak-language device keeps English.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => readStored() || detectPreferred())

  useEffect(() => {
    // Keeps assistive tech and search engines told which language the
    // document is actually in; index.html ships lang="en" as the default.
    document.documentElement.lang = lang
  }, [lang])

  const setLanguage = useCallback((code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return
    try { window.localStorage.setItem(STORAGE_KEY, code) } catch { /* storage blocked: honour for this page view only */ }
    setLang(code)
  }, [])

  const value = useMemo(() => {
    const dict = translations[lang] || translations[DEFAULT_LANG]
    const fallback = translations[DEFAULT_LANG]
    // Missing Slovak keys fall through to English rather than rendering
    // blanks, so a partial translation degrades readably.
    const t = (path) => {
      const hit = lookup(dict, path)
      if (hit !== undefined) return hit
      const alt = lookup(fallback, path)
      return alt !== undefined ? alt : path
    }
    return { lang, setLanguage, t }
  }, [lang, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Used when a consumer renders outside the provider. Throwing there was
// the first instinct, but it means one missing wrapper blanks the entire
// site via the error boundary — a hard failure for something that can
// degrade perfectly well to English. Tests that render a single component
// in isolation hit this path too.
const FALLBACK_CONTEXT = {
  lang: DEFAULT_LANG,
  setLanguage: () => {},
  t: (path) => {
    const hit = lookup(translations[DEFAULT_LANG], path)
    return hit !== undefined ? hit : path
  },
}

export function useLanguage() {
  return useContext(LanguageContext) || FALLBACK_CONTEXT
}
