import  React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

export default class CircleTransition extends Component {
    constructor () {
        super()
        this.state = { parent: undefined }
        this.done = true
    }

    componentDidMount () {
        this.setState({ parent: ReactDOM.findDOMNode(this).parentElement })
    }

    getFinalRadius (x, y, width, height) {
        const w = Math.max(x, width - x)
        const h = Math.max(y, height - y)
        return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2))
    }

    render () {
        const { clientX, clientY, toggle, color } = this.props
        const { parent } = this.state
        const { done } = this
        const parentBox = parent !== undefined ? parent.getBoundingClientRect() : { x: 0, y: 0, left: 0, top: 0, width: 0, height: 0 }        
        const x = clientX - parentBox.x
        const y = clientY - parentBox.y
        const finalRadius = this.getFinalRadius(x, y, parentBox.width, parentBox.height)       
        const targetRadius = toggle === true ? finalRadius : 0

        return (
            <div style={{ position: 'absolute', width: parentBox.width, height: parentBox.height, top: parentBox.top + window.pageYOffset, left: parentBox.left + window.pageXOffset, overflow: 'hidden' }}>
                <Motion style={{ r: spring(targetRadius) }}>
                { value => {

                    if ((toggle === true && targetRadius === finalRadius) ||
                        (toggle === false && targetRadius === 0))
                        this.done = true

                    return (
                        <div style={{
                            position: 'absolute',
                            borderRadius: '50%',
                            left: x - value.r, 
                            top: y - value.r, 
                            width: value.r * 2, 
                            height: value.r * 2,
                            backgroundColor: color 
                        }}>
                        </div>
                    )
                }}
                </Motion>
            </div>
        )
    }
}