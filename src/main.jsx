import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ErrorBoundary } from './components/layout/ErrorBoundary.jsx'
import { LanguageProvider } from './hooks/useLanguage.jsx'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {/* Above the router: the chosen language has to survive navigation,
          and every page plus the shared header/footer reads from it. */}
      <LanguageProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>
)
