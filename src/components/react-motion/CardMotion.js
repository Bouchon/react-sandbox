import React, { Component } from 'react'
import { presets } from 'react-motion'
import autobind from 'autobind-decorator'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ExitToAppIcon from 'material-ui-icons/ExitToApp'

import CircleTransition from './CircleTransition'
import FadeTransition from './FadeTransition'
import FabMotion from '../motions/FabMotion'
import ClickMotion from '../motions/ClickMotion'

const css = {
    paper: { margin: '50px', padding: '15px', width: '100px', height: '100px' },
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
            clickEvent: undefined,
            circleX: 0, circleY: 0
        }
    }

    onClickPaper (event) {
        const box = event.currentTarget.getBoundingClientRect()
        this.setState({
            toggleCircle: !this.state.toggleCircle,
            circleX: event.clientX - box.x,
            circleY: event.clientY - box.y
        })
    }

    render () {
        const { toggleCircle, clickEvent, circleX, circleY } = this.state
        const circleMotion = { size: { start: 0, end: 300 } }

        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <Paper style={ css.paper } onClick={ (event) => this.onClickPaper(event) }>
                        <FadeTransition toggle={ !toggleCircle } preset={ presets.gentle }>
                            <p>Test</p>
                            <IconButton onClick={ () => console.log('click') }>
                                <ExitToAppIcon />
                            </IconButton>   
                        </FadeTransition>
                        <CircleTransition 
                            preset={ presets.stiff }
                            color='pink'
                            x={circleX} 
                            y={circleY} 
                            toggle={ toggleCircle } />
                        <FadeTransition toggle={ toggleCircle }>
                            <p>Yeah!!</p>
                            <Button>Click me !</Button>  
                        </FadeTransition>
                    </Paper>
                    
                    <div style={{ width: '150px', height: '150px', margin: '20px' }}>
                        <FabMotion 
                            defaultRadius={28}
                            onClick={ () => this.setState({ toggleCircle: !toggleCircle }) }
                            fabColor='accent'
                            toggle={ toggleCircle }>
                            <Paper style={{ width: '100%', height: '100%' }}>
                                <Button color='primary' onClick={ () => this.setState({ toggleCircle: false }) }>close</Button>
                            </Paper>
                        </FabMotion>
                    </div>

                    <Paper style={{ margin: '20px', width: '150px', height: '150px' }}
                        onClick={ (event) => this.onClickPaper(event) }>
                        <ClickMotion
                            x={circleX} y={circleY}
                            defaultRadius={ 0 }
                            toggle={ toggleCircle }
                            preset={ presets.wobbly }
                            clickEvent={ clickEvent }></ClickMotion>
                    </Paper>
                </div>
                <Button raised onClick={ () => this.setState({ toggleCircle: !toggleCircle }) }>{ toggleCircle.toString() }</Button>
            </div>
        )
    }
}