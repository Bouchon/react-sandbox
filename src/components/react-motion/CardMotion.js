import React, { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'
import autobind from 'autobind-decorator'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

import CircleTransition from './CircleTransition'

const css = {
    paper: { margin: '50px', padding: '15px', width: '600px', height: '200px' },
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
            toggleCircle: false,
            circleX: 0, circleY: 0
        }
    }

    render () {
        const { toggleCircle, circleX, circleY } = this.state
        const circleMotion = { size: { start: 0, end: 300 } }

        return (
            <div>
                <Paper style={ css.paper } onClick={ (event) => this.setState({ toggleCircle: !toggleCircle, circleX: event.clientX, circleY: event.clientY }) }>
                <CircleTransition color='pink' clientX={circleX} clientY={circleY} toggle={ toggleCircle } />
                </Paper>

                <Button raised onClick={ () => this.setState({ toggleCircle: !toggleCircle }) }>{ toggleCircle.toString() }</Button>
            </div>
        )
    }
}