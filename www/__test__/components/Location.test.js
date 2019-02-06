import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Location from '../../components/Location'

afterEach(cleanup)

const host = 'http://localhost:3000'

describe('Location', () => {
  it('displays a loading element if location is not ready', () => {
    const init = host => host
    const { getByTestId } = render(
      <Location host={host} container={{ state: {}, init }} />,
    )
    getByTestId('loading-location')
  })

  it("calls the container's init function to retrieve location / weather", () => {
    const init = jest.fn()
    render(<Location host={host} container={{ state: {}, init }} />)
    expect(init).toHaveBeenCalled()
  })
})
