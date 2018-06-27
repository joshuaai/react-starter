import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch } from '../Switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn(...args))

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

  getTogglerProps = ({ onClick, ...props } = {}) => ({
    'aria-pressed': this.state.on,
    onClick: callAll(onClick, this.toggle),
    ...props
  })

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      getTogglerProps: this.getTogglerProps
    }
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
  onButtonClick = () => console.log('onButtonClick')
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, getTogglerProps }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <button
            {...getTogglerProps({
              'aria-label': 'custom-button',
              onClick: onButtonClick,
              id: 'custom-button-id'
            })}
          >
            {on ? 'On' : 'Off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}

Usage.propTypes = {
  onToggle: PropTypes.func,
  onButtonClick: PropTypes.func
}

Usage.title = 'Render Prop Getters Toggle'

export { Toggle, Usage as default }
