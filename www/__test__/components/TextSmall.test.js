import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import TextSmall from '../../components/TextSmall'

afterEach(cleanup)

describe('TextSmall', () => {
  it('renders its children', () => {
    render(<TextSmall>Hello World</TextSmall>).getByText('Hello World')
  })
})
