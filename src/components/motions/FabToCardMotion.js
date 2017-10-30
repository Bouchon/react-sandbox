import React, { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import FadeMotion from '../common/FadeMotion'

export default class FabToCardMotion extends Component {
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
    getCircleStyle (radius, opacity, cursor) {
        return {
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            left: 'calc(50% - ' + radius + 'px)',
            top: 'calc(50% - ' + radius + 'px)',
            opacity: opacity,
            cursor
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
        const { toggle, children, onClick } = this.props
        const motionStyle = this.getMotionStyle()
        const finalCircleRadius = this.getFinalCircleRadius()

        return (
            <Motion style={ motionStyle }>
            { value => {
                let hideCircle, showContent
                if (toggle === true && value.circleR === finalCircleRadius) {
                    hideCircle = true
                    showContent = true
                } else {
                    hideCircle = false
                    showContent = value.circleR > finalCircleRadius * .8
                }

                const circleCursor = showContent ? 'default' : 'pointer'
                const circleStyle = this.getCircleStyle(value.circleR, value.circleO, circleCursor)
                const rectangleStyle = this.getRectangleStyle(value.rectangleO)

                return (
                    <div style={{ position: 'relative', width: rectangleStyle.width, height: rectangleStyle.height }}>                        
                        <Paper style={ rectangleStyle }>
                            <FadeMotion opacity={ showContent === true ? 1 : 0 }>
                                { children }
                            </FadeMotion>
                        </Paper> { /* rectangle */}
                        {
                            hideCircle === true ? 
                                undefined : (
                                <div style={{ position: 'absolute', overflow: 'hidden', width: rectangleStyle.width, height: rectangleStyle.height }}>
                                    <Button onClick={ (event) => showContent === true ? undefined : onClick() } fab disableRipple style={ circleStyle }><AddIcon /></Button> {  /* circle */}
                                </div> )
                        }
                    </div>
                )
            } }
            </Motion>
        )
    }
}