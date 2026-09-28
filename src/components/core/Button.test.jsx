import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button.jsx'

test('renders its label and fires onClick', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Shop now</Button>)
  const btn = screen.getByText('Shop now')
  fireEvent.click(btn)
  expect(onClick).toHaveBeenCalledOnce()
})

test('renders as a link when href is passed', () => {
  render(<Button href="/collection">Browse</Button>)
  expect(screen.getByText('Browse').closest('a')).toHaveAttribute('href', '/collection')
})
