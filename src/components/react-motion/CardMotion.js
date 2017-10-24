import React, { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'
import autobind from 'autobind-decorator'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

const css = {
    paper: { margin: '50px', width: '300px', height: '200px' },
    circle: { position: 'absolute', borderRadius: '50%',  backgroundColor: 'pink' },
    absolute: { position: 'absolute', width: '100%', height: '100%' },
    relative: { position: 'relative', width: '100%', height: '100%' }
}

class Circle extends Component {
    render () {
        const { target, radius, opacity, x, y, children } = this.props
        const left = x - radius
        const top = y - radius
        const size = radius * 2

        if (radius < 0 && target === 0) {
            css.circle.display = 'none'
        }

        if (radius > 0 && target !== 0) {
            css.circle.display = ''
        }

        return (
            <div style={ { ...css.circle, left, top, width: size, height: size } }>
                { children }
            </div>
        )
    }
}

class Delay extends Component{
    constructor () {
        super()
        this.state = { value: undefined }
    }    
    refresh (props) {
        const { value, period}  = props;
        setTimeout(() => this.setState({ value }), period);
    }
    componentDidMount () {
        this.refresh(this.props);
    }
    componentWillReceiveProps (next) {
        this.refresh(next);
    }
    render () {
        return this.props.children(this.state.value);
    }
}

export default class CardMotion extends Component {
    constructor () {
        super()
        this.state = { 
            motion: {
                circleSize: 0,
                opacity: 0,
                circleX: 0,
                circleY: 0
            }
        }
    }

    @autobind
    toggle (event) {
        const target = event.currentTarget.getBoundingClientRect()
        const { motion } = this.state
        this.setState({
            motion: {
                circleX: motion.circleSize === 0 ? event.clientX - target.x : motion.circleX,
                circleY: motion.circleSize === 0 ? event.clientY - target.y : motion.circleY,
                circleSize: motion.circleSize === 0 ? 300 : 0,
                opacity: motion.opacity === 0 ? 1 : 0
            }
        })
    }

    render () {
        const { motion } = this.state
        const circleMotion = { size: { start: 0, end: 300 } }

        return (
            <div>
                <Paper style={ css.paper } onClick={ (event) => { this.toggle(event); } }>
                    <Motion style={{ x: spring(motion.circleSize, presets.stiff), o: spring(motion.opacity) }}>
                    { value => {                   
                        return (
                            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                                
                                <div style={ css.absolute }>
                                    <div style={ { ...css.relative, backgroundColor: 'cyan', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' } }>
                                        <p>Text 1</p>
                                        <Button>toggle</Button>
                                        <p><b>Footer</b></p>
                                    </div>
                                </div>

                                <div style={ css.absolute }>
                                    <Circle radius={ value.x } target={ motion.circleSize } x={motion.circleX} y={motion.circleY}></Circle>
                                </div>
                            </div> 
                        ) 
                    } }
                    </Motion>               
                </Paper>

                <Button raised onClick={ this.toggle }>{ motion.circleSize }</Button>
            </div>
        )
    }
}