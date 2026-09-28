import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Product from './Product.jsx'

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true }

function renderAt(slug) {
  return render(
    <MemoryRouter future={routerFuture} initialEntries={[`/collection/${slug}`]}>
      <Routes>
        <Route path="/collection/:slug" element={<Product />} />
      </Routes>
    </MemoryRouter>
  )
}

test('renders the matching product for a known slug', () => {
  renderAt('petrolejova')
  expect(screen.getByRole('heading', { name: 'Petrolejová' })).toBeInTheDocument()
  expect(screen.getByText('Leather')).toBeInTheDocument()
})

test('renders a not-found message for an unknown slug', () => {
  renderAt('does-not-exist')
  expect(screen.getByText(/not find that piece/i)).toBeInTheDocument()
})

test('opens the care dialog and shows the product-specific care text', () => {
  renderAt('denim')
  fireEvent.click(screen.getByText('Care'))
  expect(screen.getByText(/Cold hand wash only/i)).toBeInTheDocument()
})

test('the call to action opens Instagram rather than claiming a purchase', () => {
  renderAt('bordova')
  const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {})
  fireEvent.click(screen.getByText('Interested? Ask us'))
  expect(openSpy).toHaveBeenCalledWith('https://www.instagram.com/niana.bags/', '_blank', 'noopener,noreferrer')
  openSpy.mockRestore()
})
