import React from 'react'
import Title from '../../components/Title'
import { render } from 'react-testing-library'

describe('Title', () => {
  it('renders its children', () => {
    render(<Title>TestTitle</Title>).getByText('TestTitle')
  })
})
