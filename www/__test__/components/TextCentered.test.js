import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import TextCentered from '../../components/TextCentered'

afterEach(cleanup)

describe('TextCentered', () => {
  it('renders its children', () => {
    render(<TextCentered>Hello World</TextCentered>).getByText('Hello World')
  })
})
