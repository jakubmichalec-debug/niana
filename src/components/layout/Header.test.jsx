import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header.jsx'

test('highlights Collection as active on /collection and links the wordmark home', () => {
  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      initialEntries={['/collection']}
    >
      <Header />
    </MemoryRouter>
  )
  // NavList only renders the arrow-badge icon next to the active label — a
  // jsdom-safe way to check "active" that doesn't depend on jsdom resolving
  // CSS custom properties in inline styles (it doesn't, for `color`).
  const collectionButton = screen.getByText('Collection').closest('button')
  expect(collectionButton.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  const homeButton = screen.getByText('Home').closest('button')
  expect(homeButton.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Niana' })).toHaveAttribute('href', '/')
})
