import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

export default class FadeMotion extends Component {
    render () {
        const { children, preset, opacity, destroy, destroyThreshold } = this.props
        const effect = preset ? spring(opactity, preset) : spring(opacity)
        return (
            <Motion style={ { x: effect } }>
            { value => {
                const opacity = value.x

                return destroy && opacity > destroyThreshold ?
                    <div style={{ opacity, width: '100%', height: '100%' }}>{ children }</div> :
                    <div style={{ opacity, width: '100%', height: '100%' }}></div>
            } }
            </Motion>
        )
    }
}