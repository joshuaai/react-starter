import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch } from '../Switch'

class Toggle extends Component {
  static propTypes = {
    onToggle: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      () => null
    ])
  }

  state = { on: false }

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on)
      }
    )
  }

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle
    }
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, toggle }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'On' : 'Off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}

Usage.propTypes = {
  onToggle: PropTypes.func
}

Usage.title = 'Render Props Toggle'

export { Toggle, Usage as default }
