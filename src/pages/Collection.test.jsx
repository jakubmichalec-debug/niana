import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Collection from './Collection.jsx'

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true }

test('renders all thirteen products by default', () => {
  render(
    <MemoryRouter future={routerFuture}>
      <Collection />
    </MemoryRouter>
  )
  expect(screen.getAllByRole('article')).toHaveLength(13)
})

test('filtering by a material tab narrows the grid', () => {
  render(
    <MemoryRouter future={routerFuture}>
      <Collection />
    </MemoryRouter>
  )
  fireEvent.click(screen.getByRole('tab', { name: 'Leather' }))
  expect(screen.getAllByRole('article')).toHaveLength(1)
  expect(screen.getByText('Petrolejová')).toBeInTheDocument()
})

test('reading the material query param pre-selects that tab', () => {
  render(
    <MemoryRouter future={routerFuture} initialEntries={['/collection?material=Denim']}>
      <Collection />
    </MemoryRouter>
  )
  expect(screen.getAllByRole('article')).toHaveLength(1)
  expect(screen.getByText('Denim tote')).toBeInTheDocument()
})
