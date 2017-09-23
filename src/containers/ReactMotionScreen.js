import React, { Component } from 'react'
import { presets } from 'react-motion'
import Transition from '../components/react-motion/Transition'

export default class ReactMotionScreen extends Component {
    constructor () {
        super()
        this.state = { toggle: false }
    }
    render () {
        return (
            <div onClick={() => this.setState({ toggle: !this.state.toggle })}>
                <Transition preset={presets.noWobble} toggle={this.state.toggle} />
                <Transition preset={presets.gentle} toggle={this.state.toggle} />
                <Transition preset={presets.stiff} toggle={this.state.toggle} />
                <Transition preset={presets.wobbly} toggle={this.state.toggle} />
            </div>
        )
    }
}