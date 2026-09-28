import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox.jsx'

test('toggles checked state via onChange', () => {
  const onChange = vi.fn()
  render(<Checkbox label="Made to order" checked={false} onChange={onChange} />)
  fireEvent.click(screen.getByLabelText('Made to order'))
  expect(onChange).toHaveBeenCalledOnce()
})
