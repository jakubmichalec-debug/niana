import { render, screen, fireEvent } from '@testing-library/react'
import { IconButton } from './IconButton.jsx'

test('is reachable by its accessible label and fires onClick', () => {
  const onClick = vi.fn()
  render(<IconButton name="search" label="Search" onClick={onClick} />)
  fireEvent.click(screen.getByLabelText('Search'))
  expect(onClick).toHaveBeenCalledOnce()
})
