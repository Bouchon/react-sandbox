import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { presets } from 'react-motion'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'

const css = {
    card: {
        minWidth: '150px',
        height: '188px' 
    },
    addDiv: {
        position: 'relative',
        overflow: 'hidden',
        width: '150px',
        height: '188px'
    },
    addButton: {
        position: 'absolute'
    }
}

export default class Cards extends Component {
    constructor () {
        super()
        this.state = { addMotion: 0 }

        const speed = 100
        const size = this.getFunction(56, 240, speed)
        const opacity = this.getFunction(1, 0, speed)
        this.addMotion = { speed, size, opacity } 
    }

    getFunction (start, end, speed) {
        return { start, end, a: (end - start) / speed, b: start }
    }

    toggleAddMotion() {
        const addMotion = this.state.addMotion === 0 ? this.addMotion.speed : 0
        const { speed, size, opacity } = this.addMotion
        this.addMotion.size = this.getFunction(size.start, size.end, speed)
        this.addMotion.opacity = this.getFunction(opacity.start, opacity.end, speed)
        this.setState({ addMotion })
    }

    render () {
        const { projects, onAdd, onDashboard, onUpdate, onDelete } = this.props
        
        return (
            <Grid container align='center'>
            {
                Object.values(projects).map(project => {
                    return (
                        <Grid item key={ project.id }>
                            <Card style={ css.card }>
                                <CardContent>
                                    <Typography type='headline'>
                                        <a href='#' onClick={ () => onDashboard(project.id) }>
                                            { project.name }
                                        </a>
                                    </Typography>
                                    <Typography type='body1'>{ project.description }</Typography>
                                    <Typography type='caption'>Tasks (0)</Typography>
                                    <Typography type='caption'>Documents (0)</Typography>
                                    <Typography type='caption'>Members (0)</Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={ () => onUpdate(project.id) } aria-label='edit'><ModeEditIcon /></IconButton>
                                    <IconButton onClick={ () => onDelete(project.id) } aria-label='delete'><DeleteIcon /></IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })
            }
                <Grid item>
                    <div style={ css.addDiv }>
                        <Motion style={{x: spring(this.state.addMotion, presets.wobbly), y: spring(this.state.addMotion) } }>
                        { value => {
                            const size = this.addMotion.size.a * value.x + this.addMotion.size.b
                            const opacity = this.addMotion.opacity.a * value.y + this.addMotion.opacity.b
                            return (
                                <Button
                                    disableRipple
                                    onClick={ () => this.toggleAddMotion() }
                                    style={ { 
                                        ...css.addButton, 
                                        width: size + 'px',
                                        height: size + 'px',
                                        left: 'calc(50% - ' + (size / 2) + 'px)',
                                        top: 'calc(50% - ' + (size / 2) + 'px)',
                                        opacity: opacity
                                    } } 
                                    fab color='accent' aria-label='add'>
                                    <AddIcon />
                                </Button>
                            )
                        } }
                        </Motion>
                    </div>
                </Grid>
            </Grid>
        )
    }
}