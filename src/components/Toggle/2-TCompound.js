import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch } from '../Switch'

//you can pass the default value or nay
const ToggleContext = React.createContext()

function ToggleConsumer(props) {
  return (
    <ToggleContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(
            'Toggle compound components  must be rendered within the Toggle component.'
          )
        }
        return props.children(context)
      }}
    </ToggleContext.Consumer>
  )
}

ToggleConsumer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    () => null
  ])
}

class Toggle extends Component {
  static propTypes = {
    onToggle: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.any
    ])
  }

  static On = ({ children }) => (
    <ToggleConsumer>{({ on }) => (on ? children : null)}</ToggleConsumer>
  )

  static Off = ({ children }) => (
    <ToggleConsumer>{({ on }) => (on ? null : children)}</ToggleConsumer>
  )

  static Button = props => (
    <ToggleConsumer>
      {({ on, toggle }) => <Switch on={on} onClick={toggle} {...props} />}
    </ToggleConsumer>
  )

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on)
      }
    )
  }

  state = { on: false, toggle: this.toggle }

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}

Usage.propTypes = {
  onToggle: PropTypes.func
}

Usage.title = 'Compound Toggle'

export { Toggle, Usage as default }
