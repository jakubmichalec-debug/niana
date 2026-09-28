import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard.jsx'

test('renders name and material, and fires onSelect when clicked', () => {
  const onSelect = vi.fn()
  render(<ProductCard name="Bordová" material="Crochet" onSelect={onSelect} />)
  expect(screen.getByText('Bordová')).toBeInTheDocument()
  expect(screen.getByText('Crochet')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Bordová'))
  expect(onSelect).toHaveBeenCalledOnce()
})
