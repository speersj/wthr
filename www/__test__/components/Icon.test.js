import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import Icon from '../../components/Icon'

afterEach(cleanup)

describe('Icon', () => {
  it('renders an <i> tag', () => {
    const el = render(<Icon name="test" />).getByTestId('plain-icon')
    expect(el.tagName).toEqual('I')
  })

  it('renders the correct classnames', () => {
    const el = render(<Icon name="test" />).getByTestId('plain-icon')
    expect(el.className).toEqual('wi wi-test')
  })
})
