import React from 'react'

/**
 * Catches a render-time error anywhere below it and shows a plain
 * recovery screen instead of an unmounted, blank white page — the
 * default outcome with no error boundary in the tree. Deliberately a
 * class component: React only supports the componentDidCatch/
 * getDerivedStateFromError contract for this, there is no hook
 * equivalent. Wraps <App/> in main.jsx, above the router, so it also
 * catches anything a route change itself might throw.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // No analytics/error-reporting service wired up (see Privacy Policy —
    // this site sends nothing to anyone). Logging to the console is the
    // only place this is currently visible, which is enough for local
    // development; if error reporting is added later, send it from here.
    console.error('Niana site crashed:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <main style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 20, padding: '40px 24px', textAlign: 'center', background: '#E3DECE', color: '#191714',
      }}>
        <h1 style={{ margin: 0, font: '300 40px/1.1 "Jost", sans-serif' }}>Something went wrong</h1>
        <p style={{ margin: 0, font: '16px/1.6 "Jost", sans-serif', color: '#4a453d', maxWidth: '38ch' }}>
          This page hit an unexpected error. Reloading usually fixes it.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: 8, padding: '13px 28px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: '#191714', color: '#E3DECE', font: '12px/1 "Jost", sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}
        >
          Reload the page
        </button>
      </main>
    )
  }
}
