import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  test('should render SearchBar correctly', () => {
    const { container } = render(<SearchBar onQuery={() => {}} />)

    expect(container).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toBeDefined()
    expect(screen.getByRole('button')).toBeDefined()
  })

  test('should call onQuery with the correct value after 2000ms', async () => {
    const onQuery = vi.fn()
    render(<SearchBar onQuery={onQuery} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    // await new Promise((resolve) => setTimeout(resolve, 3001))
    await waitFor(
      () => {
        expect(onQuery).toHaveBeenCalled()
        expect(onQuery).toHaveBeenCalledWith('test')
      },
      { timeout: 3100 },
    )
  })
})
