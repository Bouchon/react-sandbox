import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { presets } from 'react-motion'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'

import FabMotion from '../motions/FabMotion'
import ProjectCard from './ProjectCard'
import ProjectCardEdit from './ProjectCardEdit'
import AddMotion from './AddMotion'

const css = {
    card: {
        minWidth: '150px',
        height: '200px' 
    },
    addDiv: {
        position: 'relative',
        overflow: 'hidden',
        width: '200px',
        height: '200px'
    },
    createDiv: {
        position: 'relative',
        width: '200px',
        height: '200px'
    },
    addButton: {
        position: 'absolute'
    },
    createProjectCard: {
        position: 'absolute',
        height: '100%'
    }
}

export default class Cards extends Component {
    constructor () {
        super()
        this.state = { 
            newProject: {
                name: '',
                description: ''
            },
            toggleAdd: false
        }      
    }

    render () {
        const { projects, onAdd, onDashboard, onUpdate, onDelete } = this.props
        const { newProject, toggleAdd } = this.state
        return (
            // <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Grid container>
                { Object.values(projects).map(project => (
                        <Grid item key={ project.id } xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProjectCard
                                project={ project }
                                onDashboard={ () => onDashboard(project.id) }
                                onEdit={ project => onUpdate(project) }
                                onDelete={ () => onDelete(project.id) } />
                        </Grid>
                    ))
                }
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FabMotion
                        defaultRadius={ 28 }
                        fabColor='accent'
                        toggle={ toggleAdd }
                        onClick={ () => this.setState({ toggleAdd: true }) }>
                        <ProjectCardEdit
                            onClose={ () => this.setState({ toggleAdd: false }) }
                            onSubmit={ project => { onAdd(project); this.setState({ toggleAdd: false }) } } />
                    </FabMotion>
                </Grid>
            </Grid>
        )
    }
}