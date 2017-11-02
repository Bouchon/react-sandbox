import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import FadeMotion from './FadeMotion'

export default class FabMotion extends Component {
    constructor () {
        super()
        this.state = { parent: undefined }
    }

    componentDidMount () {
        this.setState({ parent: ReactDOM.findDOMNode(this).parentElement })
    }

    getMotionStyle (finalRadius) {
        const { toggle, defaultRadius } = this.props
        return {
            circleR: spring(toggle === true ? finalRadius : defaultRadius, presets.stiff),
            circleO: spring(toggle === true ? 0 : 1, presets.stiff),
            rectangleO: spring(toggle === true ? 1 : -1, presets.stiff)
        }

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
    getRectangleStyle (parent, opacity) {
        const parentStyle = parent === undefined ? undefined : window.getComputedStyle(parent)
        const paddingLeft = parentStyle === undefined ? 0 : parentStyle.getPropertyValue('padding-right')
        const paddingRight = parentStyle === undefined ? 0 : parentStyle.getPropertyValue('padding-right')
        const width = parentStyle === undefined ? 0 : parentStyle.getPropertyValue('width')
        const height = parentStyle === undefined ? 0 : parentStyle.getPropertyValue('height')
        return { 
            position: 'absolute', 
            opacity, 
            width: 'calc(' + width + ' - ' + paddingLeft + ' - ' + paddingRight + ')', 
            height: 'calc(' + height + ' - ' + paddingLeft + ' - ' + paddingRight + ')',
        }
    }

    render () {
        const { toggle, fabColor, children, onClick } = this.props
        const { parent } = this.state
        const parentBox = parent === undefined ? { width: 0, height: 0 } : parent.getBoundingClientRect()
        const finalRadius = Math.sqrt(Math.pow(parentBox.width / 2, 2) + Math.pow(parentBox.height / 2, 2))
        const motionStyle = this.getMotionStyle(finalRadius)

        return (
            <Motion style={ motionStyle }>
            { value => {
                let hideCircle, showContent
                if (toggle === true && value.circleR === finalRadius) {
                    hideCircle = true
                    showContent = true
                } else {
                    hideCircle = false
                    showContent = value.circleR > finalRadius * .8
                }

                const circleCursor = showContent ? 'default' : 'pointer'
                const circleStyle = this.getCircleStyle(value.circleR, value.circleO, circleCursor)
                const rectangleStyle = this.getRectangleStyle(parent, value.rectangleO)
                return (
                    <div style={{ position: 'relative', width: rectangleStyle.width, height: rectangleStyle.height }}>                        
                        <div style={ rectangleStyle }>
                            <FadeMotion opacity={ showContent === true ? 1 : 0 }>
                                { children }
                            </FadeMotion>
                        </div> { /* rectangle */}
                        {
                            hideCircle === true ? 
                                undefined : (
                                <div style={{ position: 'absolute', overflow: 'hidden', width: rectangleStyle.width, height: rectangleStyle.height }}>
                                    <Button 
                                        fab 
                                        disableRipple
                                        color={ fabColor }
                                        onClick={ (event) => showContent === true ? undefined : onClick() } 
                                        style={ circleStyle }><AddIcon /></Button> {  /* circle */}
                                </div> )
                        }
                    </div>
                )
            } }
            </Motion>
        )
    }
}