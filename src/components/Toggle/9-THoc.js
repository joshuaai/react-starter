import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
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

function withToggle(Component) {
  function Wrapper(props, ref) {
    return (
      <Toggle.Consumer>
        {toggleContext => (
          <Component toggle={toggleContext} ref={ref} {...props} />
        )}
      </Toggle.Consumer>
    )
  }
  Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component)
}

const Layer1 = () => <Layer2 />

const Layer2 = withToggle(({ toggle: { on } }) => (
  <Fragment>
    {on ? 'The button is on' : 'The button is off'}
    <Layer3 />
  </Fragment>
))

const Layer3 = () => <Layer4 />

const Layer4 = withToggle(({ toggle: { on, toggle } }) => (
  <Switch on={on} onClick={toggle} />
))

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

Usage.title = 'HOC Toggle'

export { Toggle, Usage as default }
