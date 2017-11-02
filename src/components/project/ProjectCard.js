import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { presets } from 'react-motion'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'

import ClickMotion from '../motions/ClickMotion'

const css = {
    paper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    titleContainer: {
        height: '32px',
        margin: '15px' 
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '68px',
        padding: '0 15px 15px 15px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: 'solid 1px #eee'
    },
}

export default class ProjectCard extends Component {
    constructor () {
        super()
        this.state = {
            circleX: 0,
            circleY: 0,
            toggleCircle: false
        }
    }
    toggleEdit (event) {
        console.log(ReactDOM.findDOMNode(this.paper))
        const paperBox = ReactDOM.findDOMNode(this.paper).getBoundingClientRect()
        const editBox = event.currentTarget.getBoundingClientRect()
        this.setState({
            toggleCircle: !this.state.toggleCircle,
            circleX: event.clientX - paperBox.x,
            circleY: event.clientY - paperBox.y
        })
    }

    render () {
        const { project, onDashboard, onEdit, onDelete } = this.props
        const { circleX, circleY, toggleCircle } = this.state
        return (
            
            <Paper style={ css.paper } ref={(paper) => { this.paper = paper } }>
                <ClickMotion 
                    x={ circleX } y={ circleY }
                    defaultRadius={0}
                    toggle={ toggleCircle }
                    preset={ presets.wobbly }>
                    <div style={ css.titleContainer }>
                        <Typography style={ css.title } type='headline'><a href='#' onClick={ onDashboard }>{ project.name }</a></Typography>
                    </div>
                    <div style={ css.content }>
                        <Typography>{ project.description }</Typography>
                        <Typography type='caption'>Tasks (0)</Typography>
                        <Typography type='caption'>Documents (0)</Typography>
                        <Typography type='caption'>Members (0)</Typography>
                    </div>
                    <div style={ css.footer }>
                        <IconButton onClick={ onDelete }><DeleteIcon /></IconButton>
                        <IconButton onClick={ (event) => this.toggleEdit(event) }><ModeEditIcon /></IconButton>
                    </div>
                </ClickMotion>
            </Paper>
        )
    }
}