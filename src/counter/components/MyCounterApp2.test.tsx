import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { MyCounterApp } from './MyCounterApp'

const handleAddMock = vi.fn()
const handleSubstrackMock = vi.fn()
const handleResetMock = vi.fn()

vi.mock('../hooks/useCounter', () => ({
  useCounter: () => ({
    counter: 40,
    handleAdd: handleAddMock,
    handleReset: handleSubstrackMock,
    handleSubstract: handleResetMock,
  }),
}))

describe('MyCounterApp', () => {
  test('should render the component', () => {
    render(<MyCounterApp />)

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      `counter: 40`,
    )

    expect(screen.getByRole('button', { name: '+1' })).toBeDefined()
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined()
  })

  test('should all handleAdd if button is clicked', () => {
    render(<MyCounterApp />)

    const button = screen.getByRole('button', { name: '+1' })

    fireEvent.click(button)

    expect(handleAddMock).toHaveBeenCalled()
    expect(handleAddMock).toHaveBeenCalledTimes(1)
    expect(handleSubstrackMock).not.toHaveBeenCalled()
    expect(handleResetMock).not.toHaveBeenCalled()
  })
})
