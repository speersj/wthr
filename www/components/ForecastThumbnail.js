import React from 'react'
import PropTypes from 'prop-types'
import { Card, Heading } from 'rebass'
import styled from 'styled-components'
import WeatherIcon from './WeatherIcon'
import { toDate } from '../lib/dateTime'
import theme from '../lib/theme'
import Temperature from './Temperature'
import TextBoxCentered from './TextBoxCentered'
import TextCentered from './TextCentered'

ForecastThumbnail.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  temperatureHigh: PropTypes.number.isRequired,
  temperatureLow: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
}

ForecastThumbnail.defaultProps = { active: false }

const HighlightCard = styled(Card)`
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 32px ${theme.colors.textEm};
  }
`

export default function ForecastThumbnail(props) {
  const { onClick, icon, temperatureHigh, temperatureLow, time, active } = props

  return (
    <HighlightCard
      m={3}
      p={3}
      borderRadius={10}
      fontSize={[1, 2, 3]}
      bg={active ? 'bgEm' : 'bgMuted'}
      css={{ boxShadow: active && `0 2px 16px ${theme.colors.textEm}` }}
      onClick={() => onClick(time)}
    >
      <Heading fontSize={[2, 3, 5]} py={2} textAlign="center">
        <WeatherIcon name={icon} />
      </Heading>
      <TextBoxCentered>
        <Temperature value={temperatureHigh} color="hot" inline />{' '}
        <Temperature value={temperatureLow} color="cold" inline />
      </TextBoxCentered>

      <TextCentered color={active ? 'text' : 'textMuted'}>
        {toDate(time)}
      </TextCentered>
    </HighlightCard>
  )
}
