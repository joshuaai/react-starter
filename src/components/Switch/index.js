import React from 'react'
import PropTypes from 'prop-types'
import './switch.style.css'

class Switch extends React.Component {
  static propTypes = {
    on: PropTypes.bool,
    className: PropTypes.string
  }
  render() {
    const { on, className = '', ...props } = this.props
    const btnClassName = [
      className,
      'toggle-btn',
      on ? 'toggle-btn-on' : 'toggle-btn-off'
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <div>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={() => {}}
        />
        <button className={btnClassName} aria-label="Toggle" {...props} />
      </div>
    )
  }
}

export { Switch }
