import { moonPhaseClassName, moonPhaseName } from '../../components/MoonPhase'

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
