import React from 'react'
import PropTypes from 'prop-types'

RotatedSpan.propTypes = { angle: PropTypes.number, children: PropTypes.node }
RotatedSpan.defaultProps = { angle: 0 }

function style(angle) {
  const rotate = `rotate(${angle}deg)`
  return {
    display: 'inline-block',
    msTransform: rotate,
    WebkitTransform: rotate,
    transform: rotate,
  }
}

/**
 * Wraps children in a rotated span.
 * @param {number} angle - 0 to 360 degree angle to rotate child element
 */
export default function RotatedSpan({ angle, children }) {
  return (
    <span data-testid={`rotated-span-${angle}`} style={style(angle)}>
      {children}
    </span>
  )
}
