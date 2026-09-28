import { render, screen, fireEvent } from '@testing-library/react'
import { Toast } from './Toast.jsx'

test('renders its message and calls onClose', () => {
  const onClose = vi.fn()
  render(<Toast onClose={onClose}>Added to bag</Toast>)
  expect(screen.getByText('Added to bag')).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('Dismiss'))
  expect(onClose).toHaveBeenCalledOnce()
})
