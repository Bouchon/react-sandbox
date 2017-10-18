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

import ProjectCard from './ProjectCard'
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
            addMotion: 0
        }

        const speed = 100
        const addSize = this.getFunction(56, 260, speed)
        const addOpacity = this.getFunction(1, 0, speed)
        this.addMotion = { speed, size: addSize, opacity: addOpacity }

        const createOpacity = this.getFunction(0, 1, speed)
        this.createMotion = { speed, opacity: createOpacity }        
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
        const { newProject } = this.state
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>                
                { Object.values(projects).map(project => (
                        <ProjectCard 
                            key={ project.id }
                            project={ project }
                            onDashboard={ () => onDashboard(project.id) }
                            onEdit={ () => onUpdate(project.id) }
                            onDelete={ () => onDelete(project.id) } />
                    ))
                }
                <AddMotion onAdd={ onAdd } />
            </div>
        )
    }
}