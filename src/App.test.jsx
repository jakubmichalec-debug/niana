import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true }

// Pages are route-split with React.lazy (see App.jsx) so each one ships
// as its own chunk — that makes the first render of any route genuinely
// asynchronous (a Suspense fallback, then the loaded page), hence
// find* (which waits) below rather than get* (which doesn't).

test('renders the Niana wordmark in the header on the home route', async () => {
  render(
    <MemoryRouter future={routerFuture} initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  expect(await screen.findByRole('link', { name: 'Niana' })).toBeInTheDocument()
})

test('renders the About page on the /about route', async () => {
  render(
    <MemoryRouter future={routerFuture} initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  )
  expect(await screen.findByText('Made by hand, piece by piece')).toBeInTheDocument()
})

test('renders the not-found page on an unknown route', async () => {
  render(
    <MemoryRouter future={routerFuture} initialEntries={['/this-page-does-not-exist']}>
      <App />
    </MemoryRouter>
  )
  expect(await screen.findByText("This page isn't here")).toBeInTheDocument()
})
