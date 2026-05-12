import { ThemeScript } from '@devup-ui/react'
import { describe, expect, it } from 'bun:test'
import { render } from 'bun-test-env-dom'

describe('ThemeScript', () => {
  it('renders the data-theme bootstrap script', () => {
    const { container } = render(<ThemeScript />)
    expect(container.querySelector('script')).not.toBeNull()
    expect(container).toMatchSnapshot()
  })
})
