import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton';
import ListIcon from 'material-ui-icons/List';

import ListItem from './ListItem'

export default class List extends Component {
    render () {        
        return (
            <Paper>
                <Toolbar>
                    <ListIcon />
                    <Typography type="title">Tasks</Typography>
                </Toolbar>
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