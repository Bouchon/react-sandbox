import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton';
import ListIcon from 'material-ui-icons/List';

import ListItem from './ListItem'

const css = {
    title: { padding: '15px' }
}

export default class List extends Component {
    render () {
        const { tasks, onEdit, onDelete, onDashboard } = this.props
        return (
            <Paper>
                <Typography style={css.title} type="title">All Tasks</Typography>
                {
                    Object.values(tasks).length === 0 ? 
                        <Typography type='title' gutterBottom><i>No tasks found for this project, click the "+" button to create a new task.</i></Typography> :
                        Object.values(tasks).map(task => (
                            <ListItem key={ task.id } 
                                task={ task }
                                onEdit={ () => onEdit(task.id) }
                                onDelete={ () => onDelete(task.id) }
                                onDashboard={ () => onDashboard(task.id) } />
                        ))
                }
            </Paper>
        )
    }
}