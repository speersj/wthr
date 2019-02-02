import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import MoonPhaseIcon, {
  moonPhaseClassName,
  moonPhaseName,
} from '../../components/MoonPhase'

afterEach(cleanup)

describe('moonPhaseClassName', () => {
  it('returns "wi wi-moon-new" for a zero value', () => {
    expect(moonPhaseClassName(0)).toEqual('wi wi-moon-new')
  })

  it('returns "wi wi-moon-full" for a 0.5 value', () => {
    expect(moonPhaseClassName(0.5)).toEqual('wi wi-moon-full')
  })
})

describe('moonPhaseName', () => {
  it('returns new for a new moon (0) value', () => {
    expect(moonPhaseName(0)).toEqual('New')
  })

  it('returns waxing crescent for < 0.25', () => {
    expect(moonPhaseName(0.15)).toEqual('Waxing Crescent')
  })
})

describe('MoonPhaseIcon', () => {
  it('outputs a title attribute', () => {
    render(<MoonPhaseIcon moonPhase={0.5} />).getByTitle('Full Moon')
  })

  it('renders as an I tag', () => {
    const el = render(<MoonPhaseIcon moonPhase={0.25} />).getByTitle(
      'First Quarter Moon',
    )
    expect(el.tagName).toEqual('I')
  })

  it('outputs a role attribute with value set to img', () => {
    render(<MoonPhaseIcon moonPhase={0.1} />).getByRole('img')
  })

  it('outputs correct className(s)', () => {
    const el = render(<MoonPhaseIcon moonPhase={0.5} />).getByTitle('Full Moon')
    expect(el.className).toEqual(moonPhaseClassName(0.5))
  })

  it('renders correct html', () => {
    expect(
      render(<MoonPhaseIcon moonPhase={0.2} />).getByTitle(
        'Waxing Crescent Moon',
      ),
    ).toMatchSnapshot()
  })
})
