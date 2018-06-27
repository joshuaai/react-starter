import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch } from '../Switch'

const ToggleContext = React.createContext()

class Toggle extends React.Component {
  static Consumer = ToggleContext.Consumer
  static propTypes = {
    onToggle: PropTypes.func
  }
  state = { on: false }

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  }

  render() {
    return (
      <ToggleContext.Provider
        value={{ on: this.state.on, toggle: this.toggle }}
        {...this.props}
      />
    )
  }
}

const Layer1 = () => <Layer2 />

const Layer2 = () => (
  <Toggle.Consumer>
    {({ on }) => (
      <Fragment>
        {on ? 'The button is on' : 'The button is off'}
        <Layer3 />
      </Fragment>
    )}
  </Toggle.Consumer>
)

const Layer3 = () => <Layer4 />

const Layer4 = () => (
  <Toggle.Consumer>
    {({ on, toggle }) => <Switch on={on} onClick={toggle} />}
  </Toggle.Consumer>
)

function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}

Usage.propTypes = {
  onToggle: PropTypes.func
}

Usage.title = 'Provider Toggle'

export { Toggle, Usage as default }
