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
    ]),
    initialOn: PropTypes.bool,
    onReset: PropTypes.func
  }

  static defaultProps = {
    initialOn: false,
    onReset: () => {}
  }

  initalState = { on: this.props.initialOn }

  state = this.initalState

  reset = () =>
    this.setState(this.initalState, () => this.props.onReset(this.state.on))

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
      reset: this.reset,
      getTogglerProps: this.getTogglerProps
    }
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

function Usage({
  initialOn = false,
  onToggle = (...args) => console.log('onToggle', ...args),
  onReset = (...args) => console.log('onReset', ...args)
}) {
  return (
    <Toggle initialOn={initialOn} onToggle={onToggle} onReset={onReset}>
      {({ on, getTogglerProps, reset }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  )
}

Usage.propTypes = {
  initialOn: PropTypes.bool,
  onToggle: PropTypes.func,
  onReset: PropTypes.func
}

Usage.title = 'State Initializers Toggle'

export { Toggle, Usage as default }
