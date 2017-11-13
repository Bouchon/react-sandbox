import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { presets } from 'react-motion'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'

import FadeMotion from '../components/motions/FadeMotion'
import FabMotion from '../components/motions/FabMotion'
import ClickMotion from '../components/motions/ClickMotion'
import SwitchFadeMotion from '../components/motions/SwitchFadeMotion'
import MorphMotion from '../components/motions/MorphMotion'

import TransitionGroup from '../components/react-motion/TransitionGroup'
import Staggered from '../components/react-motion/Staggered'
import CardMotion from '../components/react-motion/CardMotion'

const css = {
    bloc: { width: '100%', height: '150px' },
    color: { backgroundColor: 'pink' }
}
export default class ReactMotionScreen extends Component {
    constructor () {
        super()
        this.state = { 
            toggle: false,
            fadeValue: 1,
            toggleFab: false,
            toggleClick: false,
            toggleSwitch: false,
            toggleClickFade: false,
            toggleMorph: false
        }
    }

    @autobind
    toggleMotion () {
        this.setState({ toggle: !this.state.toggle })
    }

    onClickPaper (event, toggleName) {
        const box = event.currentTarget.getBoundingClientRect()
        this.setState({
            [toggleName]: !this.state[toggleName],
            circleX: event.clientX - box.x,
            circleY: event.clientY - box.y
        })
    }

    render () {
        const { toggle, fadeValue, toggleFab, toggleClick, circleX, circleY, toggleSwitch, toggleMorph, toggleClickFade } = this.state 
        return (
            <div style={{ padding: '15px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography type='title'>Motion components</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>Fade Motion</Typography>
                            <Switch checked={ fadeValue === 0 }
                                onChange={ () => this.setState({ fadeValue: fadeValue === 0 ? 1 : 0 })} />
                        </div>
                        <FadeMotion opacity={ fadeValue }>
                            <Paper style={{ height: '120px', padding: '15px' }}>
                                <Typography type='title'>Title</Typography>
                                <Typography type='subheading'>Subheader</Typography>
                                <Typography>Paragraph</Typography>
                            </Paper>
                        </FadeMotion>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>Fab Motion</Typography>
                            <Switch checked={ toggleFab }
                                onChange={ () => this.setState({ toggleFab: !toggleFab })} />
                        </div>
                        <div style={ { width: '100%'} }>
                            <FabMotion defaultRadius={ 28 }
                                fabColor='accent'
                                toggle={ toggleFab }
                                onClick= { () => this.setState({ toggleFab: !toggleFab }) }>
                                <Paper style={{ padding: '15px' }}>
                                    <Typography type='title'>Title</Typography>
                                    <Typography type='subheading'>Subheader</Typography>
                                    <Typography>Paragraph</Typography>
                                </Paper>
                            </FabMotion>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>Click Motion</Typography>
                            <Switch checked={ toggleClick }
                                onChange={ () => this.setState({ toggleClick: !toggleClick })} />
                        </div>
                        <Paper style={{ width: '100%' }} onClick={ (event) => this.onClickPaper(event, 'toggleClick') }>
                            <ClickMotion
                                color='#f50057'
                                x={ circleX } 
                                y={ circleY }
                                defaultRadius={ 0 }
                                toggle={ toggleClick }>
                                <div style={{ padding: '15px' }}>
                                    <Typography type='title'>Title</Typography>
                                    <Typography type='subheading'>Subheader</Typography>
                                    <Typography>Paragraph</Typography>
                                </div>
                            </ClickMotion>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>Switch Fade Motion</Typography>
                            <Switch checked={ toggleSwitch }
                                onChange={ () => this.setState({ toggleSwitch: !toggleSwitch })} />
                        </div>
                        <SwitchFadeMotion 
                            toggle={ toggleSwitch }
                            childrenA={(
                                <Paper style={{ height: '120px', padding: '15px' }}>
                                    <Typography type='title'>1st Title</Typography>
                                    <Typography type='subheading'>Subheader one</Typography>
                                    <Typography>First Paragraph</Typography>
                                </Paper>
                            )}
                            childrenB={(
                                <Paper style={{ height: '120px', padding: '15px' }}>
                                    <Typography type='title'>2nd Title</Typography>
                                    <Typography type='subheading'>Subheader two</Typography>
                                    <Typography>Second Paragraph</Typography>
                                </Paper>
                            )}>
                             
                        </SwitchFadeMotion>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>Morph Motion</Typography>
                            <Switch checked={ toggleMorph }
                                onChange={ () => this.setState({ toggleMorph: !toggleMorph })} />
                        </div>
                        <Paper style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MorphMotion toggle={ toggleMorph }
                                childrenA={( <p>+</p> )}
                                childrenB={( <p>-</p> )}
                                paramsA={{ width: 48, height: 48, borderRadius: 24 }}
                                paramsB={{ width: 100, height: 100, borderRadius: 0 }}
                                preset={ presets.wobbly } />
                        </Paper>
                    </Grid>
                </Grid>
                
                <TransitionGroup />
            </div>
        )
    }
}