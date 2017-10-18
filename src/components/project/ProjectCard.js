import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'

const css = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '15px',
        maxWidth: '300px'
    },
    title: {
        padding: '15px',
        marginBottom: 'auto' 
    },
    content: {
        padding: '0 15px 15px 15px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: 'solid 1px #eee'
    },
}

export default class ProjectCard extends Component {
    render () {
        const { project, onDashboard, onEdit, onDelete } = this.props

        return (
            <Paper style={ css.paper }>
                <div style={ css.title }>
                    <Typography type='headline'><a href='#' onClick={ onDashboard }>{ project.name }</a></Typography>
                </div>
                <div style={ css.content }>
                    <Typography>{ project.description }</Typography>
                    <Typography type='caption'>Tasks (0)</Typography>
                    <Typography type='caption'>Documents (0)</Typography>
                    <Typography type='caption'>Members (0)</Typography>
                </div>
                <div style={ css.footer }>
                    <IconButton onClick={ onDelete }><DeleteIcon /></IconButton>
                    <IconButton onClick={ onEdit }><ModeEditIcon /></IconButton>
                </div>
            </Paper>
        )
    }
}