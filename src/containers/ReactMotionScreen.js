import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { presets } from 'react-motion'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import Slider from '../components/common/Slider'
import FadeMotion from '../components/motions/FadeMotion'

import TransitionGroup from '../components/react-motion/TransitionGroup'
import Staggered from '../components/react-motion/Staggered'
import CardMotion from '../components/react-motion/CardMotion'

const css = {
    motionContainer: { width: '100%', height: '150px', backgroundColor: 'pink' }
}
export default class ReactMotionScreen extends Component {
    constructor () {
        super()
        this.state = { 
            toggle: false,
            fadeValue: 1
        }
    }

    @autobind
    toggleMotion () {
        this.setState({ toggle: !this.state.toggle })
    }

    render () {
        const { toggle, fadeValue } = this.state 
        return (
            <div style={{ padding: '15px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography type='title'>Motion components</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Fade Motion</Typography>
                        <Slider min={0} max={1} defaultValue={1} height='5px' onChange={ value => this.setState({ fadeValue: value }) } />
                        <FadeMotion opacity={ fadeValue }>
                            <Paper style={ css.motionContainer }>
                            </Paper>
                        </FadeMotion>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Fab Motion</Typography>
                        
                        <FadeMotion>
                            <Paper style={ css.motionContainer }></Paper>
                        </FadeMotion>
                    </Grid>
                </Grid>
                <CardMotion />
                <TransitionGroup />
                <Staggered />
            </div>
        )
    }
}