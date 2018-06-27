import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch } from '../Switch'

class Toggle extends Component {
  static propTypes = {
    onToggle: PropTypes.func
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
  render() {
    const { on } = this.state
    return <Switch on={on} onClick={this.toggle} />
  }
}

function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
  return <Toggle onToggle={onToggle} />
}

Usage.propTypes = {
  onToggle: PropTypes.func
}

Usage.title = 'Base Toggle'

export { Toggle, Usage as default }
