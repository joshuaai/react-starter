import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from '../Switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn(...args))

/**
 * This implements the state reducer pattern. State reducers are hooks
 * exposed to the interface that can modify state update behaviour.
 */
class Toggle extends React.Component {
  static propTypes = {
    onToggle: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      () => null
    ]),
    initialOn: PropTypes.bool,
    onReset: PropTypes.func,
    stateReducer: PropTypes.func
  }

  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state, changes) => changes
  }

  static stateChangeTypes = {
    reset: '__toggle_reset__',
    toggle: '__toggle_toggle__'
  }

  initalState = { on: this.props.initialOn }

  state = this.initalState

  internalSetState(changes, callback) {
    this.setState(state => {
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes
      const reducedChanges = this.props.stateReducer(state, changesObject) || {}
      const { type: ignoredType, ...onlyChanges } = reducedChanges
      return Object.keys(onlyChanges).length ? onlyChanges : null
    }, callback)
  }

  reset = () =>
    this.setState(
      { ...this.initalState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.state.on)
    )

  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) => {
    this.setState(
      ({ on }) => ({ type, on: !on }),
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

class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log('onToggle', ...args),
    onReset: (...args) => console.log('onReset', ...args)
  }

  initalState = { timesClicked: 0 }

  state = this.initalState

  handleToggle = (...args) => {
    this.setState(({ timesClicked }) => ({ timesClicked: timesClicked + 1 }))
    this.props.onToggle(...args)
  }

  handleReset = (...args) => {
    this.setState(this.initalState)
    this.props.onReset(...args)
  }

  toggleStateReducer = (state, changes) => {
    if (changes.type === 'forced') {
      return changes
    }
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false }
    }
    return changes
  }

  render() {
    const { timesClicked } = this.state
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
      >
        {toggle => (
          <div>
            <Switch {...toggle.getTogglerProps({ on: toggle.on })} />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({ type: 'forced' })}>
                  Force Toggle
                </button>
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">Click count {timesClicked}</div>
            ) : null}
            <button onClick={toggle.reset}>Reset</button>
          </div>
        )}
      </Toggle>
    )
  }
}

Usage.propTypes = {
  initialOn: PropTypes.bool,
  onToggle: PropTypes.func,
  onReset: PropTypes.func
}

Usage.title = 'State Reducer Toggle'

export { Toggle, Usage as default }
