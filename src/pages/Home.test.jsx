import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

test('renders the hero line and the new arrivals loop', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Home />
    </MemoryRouter>
  )
  // The hero tagline is an accessible sr-only <h1> — the visible "made by
  // hand" / "piece by piece" text is a decorative, looping Marquee that
  // repeats each phrase many times (aria-hidden), so it isn't queried here.
  expect(screen.getByRole('heading', { level: 1, name: /made by hand, piece by piece/i })).toBeInTheDocument()
  expect(screen.getByText('New Arrivals')).toBeInTheDocument()
  // ProductLoop renders each item twice (duplicated for the seamless
  // loop) — the second copy is aria-hidden, so getAllByText is expected.
  expect(screen.getAllByText('Azúrová').length).toBeGreaterThanOrEqual(1)
  expect(screen.getAllByText('Denimová').length).toBeGreaterThanOrEqual(1)
})
