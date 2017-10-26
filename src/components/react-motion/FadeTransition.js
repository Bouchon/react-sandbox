import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

export default class FadeTransition extends Component {
    constructor () {
        super()
        this.state = { parent: undefined }
        this.done = true
    }

    componentDidMount () {
        this.setState({ parent: ReactDOM.findDOMNode(this).parentElement })
    }

    render () {
        const { toggle, children, preset } = this.props
        const { parent } = this.state
        const { done } = this
        const targetOpacity = toggle === true ? 1 : 0
        const parentBox = parent !== undefined ? parent.getBoundingClientRect() : { x: 0, y: 0, left: 0, top: 0, width: 0, height: 0 }
        const motion = preset === undefined ? spring(targetOpacity) : spring(targetOpacity, preset)
        return (
            <Motion style={{ o: motion }}>
            { value => (
                <div style={ {
                    opacity: value.o,
                    position: 'absolute',
                    width: parentBox.width, 
                    height: parentBox.height, 
                    top: parentBox.top + window.pageYOffset, 
                    left: parentBox.left + window.pageXOffset
                } }>
                    { children }
                </div>
            ) }
            </Motion>
        )
    }
}