import  React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring, presets } from 'react-motion'
import autobind from 'autobind-decorator'

const states = [ 'leaved', 'entering', 'entered', 'leaving' ]
export default class CircleTransition extends Component {
    constructor () {
        super()
        this.motionState = states[0]
        this.state = { parent: undefined }
    }

    componentWillMount () {
        if (this.props.entered === true)
            this.setState({ state: states[2] })
    }

    componentDidMount () {
        this.setState({ parent: ReactDOM.findDOMNode(this).parentElement })
    }

    @autobind
    onLeaved () { this.motionState = states[0] }
    @autobind
    enter () { this.motionState = states[1] }
    @autobind
    onEntered () { this.motionState = states[2] }
    @autobind
    leave () { this.motionState = states[3] }

    getFinalRadius (x, y, width, height) {
        const w = Math.max(x, width - x)
        const h = Math.max(y, height - y)
        return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2))
    }

    render () {
        const { clientX, clientY, toggle, color } = this.props
        const { parent } = this.state
        const parentBox = parent !== undefined ? parent.getBoundingClientRect() : { x: 0, y: 0, left: 0, top: 0, width: 0, height: 0 }
        
        const x = clientX - parentBox.x
        const y = clientY - parentBox.y
        const finalRadius = this.getFinalRadius(x, y, parentBox.width, parentBox.height)        
        
        if (toggle === false && this.motionState === states[2]) { this.leave() }
        else if (toggle === true && this.motionState === states[0]) { this.enter() }

        let targetRadius = undefined
        switch (this.motionState) {
            case 'leaved':
            case 'leaving': targetRadius = 0; break
            case 'entering':
            case 'entered': targetRadius = finalRadius; break
        }

        return (
            <div style={{ position: 'absolute', width: parentBox.width, height: parentBox.height, top: parentBox.top + window.pageYOffset, left: parentBox.left + window.pageXOffset, overflow: 'hidden' }}>
                <Motion style={{ r: spring(targetRadius) }}>
                { value => {
                    if (this.motionState === 'entering' && targetRadius === finalRadius)
                        this.onEntered()
                    if (this.motionState === 'leaving' && targetRadius === 0)
                        this.onLeaved()

                    return (
                        <div style={{
                            position: 'absolute',
                            backgroundColor: 'pink',
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