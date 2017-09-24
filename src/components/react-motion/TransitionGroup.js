import React, { Component } from 'react'
import { presets } from 'react-motion'
import Transition from './Transition'
import Typography from 'material-ui/Typography'

export default class TransitionGroup extends Component {
    constructor () {
        super()
        this.state = { toggle: false }
    }
    render () {
        return (
            <div>
                <Typography type='title'>Transition</Typography>
                <div style={{padding: '0 15%'}} onClick={() => this.setState({ toggle: !this.state.toggle })}>
                    <Transition preset={presets.noWobble} toggle={this.state.toggle} />
                    <Transition preset={presets.stiff} toggle={this.state.toggle} />
                    <Transition preset={presets.gentle} toggle={this.state.toggle} />
                    <Transition preset={presets.wobbly} toggle={this.state.toggle} />
                </div>
            </div>
        )
    }
}