import React, { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'

export default class MorphMotion extends Component {
    getMotionStyle (toggle, paramsA, paramsB, preset) {
        const params = toggle === true ? paramsB : paramsA
        if (preset === undefined) {
            return {
                width: spring(params.width),
                height: spring(params.height),
                borderRadius: spring(params.borderRadius)
            }
        } else {
            return {
                width: spring(params.width, preset),
                height: spring(params.height, preset),
                borderRadius: spring(params.borderRadius, preset)
            }
        }
    }

    render () {
        const { toggle, childrenA, childrenB, paramsA, paramsB, preset } = this.props
        const motionStyle = this.getMotionStyle(toggle, paramsA, paramsB, preset)

        return (
            <Motion style={ motionStyle }>
            { value => {
                const { width, height, borderRadius } = value
                return (
                    <div style={{ width: width + 'px', height: height + 'px', borderRadius: borderRadius + 'px', backgroundColor: 'pink' }}>
                    </div>
                )
            } }
            </Motion>
        )
    }
}