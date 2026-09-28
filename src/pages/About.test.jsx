import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About.jsx'

function renderAbout() {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <About />
    </MemoryRouter>
  )
}

test('renders the three process steps', () => {
  renderAbout()
  expect(screen.getByText('Draft')).toBeInTheDocument()
  expect(screen.getByText('Work')).toBeInTheDocument()
  expect(screen.getByText('Finish')).toBeInTheDocument()
})

// NEWSLETTER_ENDPOINT is empty until a provider is actually configured.
// Until then the block must not render a signup that looks functional —
// the previous version took an address, discarded it, and said thanks.
test('newsletter block points people to email while no provider is wired up', () => {
  renderAbout()
  expect(screen.queryByText('Sign up')).not.toBeInTheDocument()
  expect(screen.getByText(/the list is not running yet/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /@/ })).toHaveAttribute('href', expect.stringContaining('mailto:'))
})
