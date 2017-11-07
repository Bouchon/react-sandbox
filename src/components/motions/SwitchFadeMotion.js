import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

export default class SwitchFadeMotion extends Component {
    constructor () {
        super()
        this.state = { parent: undefined }
    }

    componentDidMount () {
        this.setState({ parent: ReactDOM.findDOMNode(this).parentElement })
    }
    getMotionStyle (toggle, preset) {
        let opacityA, opacityB
        if (preset === undefined) {
            opacityA = toggle ? spring(1) : spring(0)
            opacityB = toggle ? spring(0) : spring(1)
        } else {
            opacityA = toggle ? spring(1, preset) : spring(0, preset)
            opacityB = toggle ? spring(0, preset) : spring(1, preset)
        }
        return { opacityA, opacityB }
    }

    render () {
        const { toggle, preset, childrenA, childrenB } = this.props
        const { parent } = this.state
        const parentBox = parent === undefined ? { width: 0, height: 0 } : parent.getBoundingClientRect()
        const motionStyle = this.getMotionStyle(toggle, preset)

        return (
            <Motion style={ motionStyle }>
            { value => {
                const { opacityA, opacityB } = value
                return (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: opacityA }}>
                            { childrenA }
                        </div>
                        <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: opacityB }}>
                            { childrenB }
                        </div>
                    </div>
                )
            } }
            </Motion>
        )
    }
}