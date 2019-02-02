import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Title from '../../components/Title'

afterEach(cleanup)

describe('Title', () => {
  it('renders its children', () => {
    render(<Title>TestTitle</Title>).getByText('TestTitle')
  })
})
