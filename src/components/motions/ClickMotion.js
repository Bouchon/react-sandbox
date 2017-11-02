import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

export default class ClickMotion extends Component {
    constructor () {
        super()
        this.state = { parent: undefined }
    }

    componentDidMount () {
        this.setState({ parent: ReactDOM.findDOMNode(this).parentElement })
    }
    getFinalRadius (x, y, w, h) {
        const width = Math.max(x, w - x)
        const height = Math.max(y, h - y)
        return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
    }
    getMotionStyle (toggle, defaultRadius, finalRadius, preset) {
        const value = toggle === true ? finalRadius : defaultRadius
        const circleR = preset === undefined ? spring(value) : spring(value, preset)
        const opacity = toggle === true ? spring(0) : spring(1)
        return { circleR, opacity }
    }
    getCircleStyle (radius, x, y, opacity) {
        x = x + 'px'
        y = y + 'px'
        return {
            position: 'absolute',
            opacity,
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            left: 'calc(' + x + ' - ' + radius + 'px)',
            top: 'calc(' + y + ' - ' + radius + 'px)',
            backgroundColor: 'pink'
        }
    }

    render () {
        const { toggle, x, y, defaultRadius, preset, children } = this.props 
        const { parent } = this.state
        const parentBox = parent === undefined ? { width: 0, height: 0 } : parent.getBoundingClientRect()
        const finalRadius = this.getFinalRadius(x, y, parentBox.width, parentBox.height)
        const motionStyle = this.getMotionStyle(toggle, defaultRadius, finalRadius, preset)
        
        return (
            <Motion style={ motionStyle }>
            { value => {
                const circleStyle = this.getCircleStyle(value.circleR, x, y, value.opacity)
                const hideContent = circleStyle.opacity <= 0 && toggle === true

                return (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        { hideContent === false ? children : undefined }
                        { hideContent === false ? <div style={ circleStyle }></div> : undefined }
                    </div>
                )
            } }
            </Motion>
        )
    }
}