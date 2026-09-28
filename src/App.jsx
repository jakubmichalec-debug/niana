import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'

// Route-level code splitting: each page ships as its own chunk instead of
// all of them landing in one bundle up front, so a visitor never downloads
// Collection/Product/About/legal code they haven't navigated to.
//
// Home was briefly imported eagerly, on the theory that its lazy chunk sat
// in front of the hero's LCP paint. Measured: that made it WORSE — LCP
// element render delay went ~235ms -> ~2035ms and TBT 70ms -> 100-140ms,
// because folding Home into the one render-blocking bundle (310KB ->
// 325KB) delays React booting at all, which gates the paint. A parallel
// chunk fetch is cheaper than a bigger serial parse. Keep Home lazy.
const Home = lazy(() => import('./pages/Home.jsx'))
const Collection = lazy(() => import('./pages/Collection.jsx'))
const Product = lazy(() => import('./pages/Product.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Imprint = lazy(() => import('./pages/Imprint.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Shown only while a route's own chunk is still downloading (typically a
// blink on a fast connection, longer on a slow one) — a blank screen in
// that window reads as broken rather than loading.
function RouteFallback() {
  return (
    <div
      role="status" aria-label="Loading"
      style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        border: '2px solid var(--line-strong)', borderTopColor: 'var(--ink)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="collection/:slug" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="imprint" element={<Imprint />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
