import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs } from './Tabs.jsx'

test('calls onSelect with the clicked tab label', () => {
  const onSelect = vi.fn()
  render(<Tabs items={['All', 'Crochet', 'Leather']} active="All" onSelect={onSelect} />)
  fireEvent.click(screen.getByText('Leather'))
  expect(onSelect).toHaveBeenCalledWith('Leather')
})
