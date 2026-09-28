import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog } from './Dialog.jsx'

test('renders nothing when closed', () => {
  render(<Dialog open={false} title="Care">content</Dialog>)
  expect(screen.queryByText('content')).not.toBeInTheDocument()
})

test('renders content and calls onClose when the overlay is clicked', () => {
  const onClose = vi.fn()
  render(<Dialog open title="Care" onClose={onClose}>content</Dialog>)
  expect(screen.getByText('content')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('dialog').parentElement)
  expect(onClose).toHaveBeenCalledOnce()
})
