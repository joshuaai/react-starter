import React, { Component } from 'react'
import {
  ToggleBase,
  ToggleCompound,
  ToggleRenderProp
} from './components/Toggle'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Base Toggle</h2>
        <ToggleBase />
        <br />
        <h2>Compound Toggle</h2>
        <ToggleCompound />
        <br />
        <h2>Render Props Toggle</h2>
        <ToggleRenderProp />
      </div>
    )
  }
}

export default App
