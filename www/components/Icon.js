import React from 'react'
import PropTypes from 'prop-types'

Icon.propTypes = { name: PropTypes.string.isRequired }

export default function Icon({ name }) {
  return <i data-testid="plain-icon" className={iconClassName(name)} />
}

function iconClassName(iconName) {
  return `wi wi-${iconName}`
}
