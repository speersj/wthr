import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import TitleBig from '../../components/TitleBig'

afterEach(cleanup)

describe('TitleBig', () => {
  it('renders its children', () => {
    render(<TitleBig>Hello World</TitleBig>).getByText('Hello World')
  })
})
