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
        return (
            <Paper>
                <Typography style={css.title} type="title">All Tasks</Typography>
            { 
                Object.values(this.props.tasks).map(task => (
                    <ListItem key={ task.id } 
                        task={ task }
                        onEdit={ () => this.props.onEdit(task.id) }
                        onDelete={ () => this.props.onDelete(task.id) }
                        onDashboard={ () => this.props.onDashboard(task.id) } />
                ))
            }
            </Paper>
        )
    }
}