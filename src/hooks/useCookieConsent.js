import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'niana:cookie-consent'
export const CONSENT_EVENT = 'niana:reopen-cookie-settings'

/** 'granted' | 'denied' | null (not asked yet). */
function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    // Private browsing, or storage blocked entirely. Treat as "not asked":
    // the banner shows again next visit, which is the safe direction to
    // fail — never the one where analytics runs without a recorded yes.
    return null
  }
}

/**
 * Owns the visitor's cookie decision. Deliberately a single instance,
 * held by Layout, rather than a hook each component calls: two callers
 * would keep two independent copies of the state and could disagree
 * about whether analytics may run.
 *
 * Withdrawing consent has to be as easy as giving it (GDPR art. 7(3)),
 * so the footer's "Cookie settings" link fires CONSENT_EVENT, which
 * clears the stored choice and brings the banner back.
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState(readStored)

  const decide = useCallback((value) => {
    try { window.localStorage.setItem(STORAGE_KEY, value) } catch { /* storage blocked; honour it for this page view only */ }
    setConsent(value)
  }, [])

  const reopen = useCallback(() => {
    try { window.localStorage.removeItem(STORAGE_KEY) } catch { /* nothing stored to clear */ }
    setConsent(null)
  }, [])

  useEffect(() => {
    window.addEventListener(CONSENT_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_EVENT, reopen)
  }, [reopen])

  return { consent, decide, reopen }
}
