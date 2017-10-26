import React, { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

export default class RadialTransform extends Component {

    getMotionStyle () {
        const { toggle, defaultRadius } = this.props
        return {
            circleR: spring(toggle === true ? this.getFinalCircleRadius() : defaultRadius, presets.stiff),
            circleO: spring(toggle === true ? 0 : 1, presets.stiff),
            rectangleO: spring(toggle === true ? 1 : -1, presets.stiff)
        }

    }
    getFinalCircleRadius () {
        const { rectWidth, rectHeight } = this.props
        const w = rectWidth / 2
        const h = rectHeight / 2
        return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2))
    }
    getCircleStyle (radius, opacity) {
        return {
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            left: 'calc(50% - ' + radius + 'px)',
            top: 'calc(50% - ' + radius + 'px)',
            opacity: opacity
        }
    }
    getRectangleStyle (opacity) {
        const { rectWidth, rectHeight } = this.props
        return {
            position: 'absolute',
            width: rectWidth,
            height: rectHeight,
            opacity: opacity
        }
    }

    render () {
        const { toggle } = this.props
        const motionStyle = this.getMotionStyle()        

        return (
            <Motion style={ motionStyle }>
            { value => {
                const circleStyle = this.getCircleStyle(value.circleR, value.circleO)
                const rectangleStyle = this.getRectangleStyle(value.rectangleO)

                return (
                    <div style={{ position: 'relative', width: rectangleStyle.width, height: rectangleStyle.height }}>                        
                        <Paper style={ rectangleStyle }></Paper> { /* rectangle */}
                        <div style={{ position: 'absolute', overflow: 'hidden', width: rectangleStyle.width, height: rectangleStyle.height }}>
                            <Button fab style={ circleStyle }><AddIcon /></Button> {  /* circle */}
                        </div>
                    </div>
                )
            } }
            </Motion>
        )
    }
}