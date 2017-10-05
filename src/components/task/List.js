import React, { Component } from 'react'

import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import ListItem from './ListItem'

const css = {
    container: { display: 'flex', flexDirection: 'column' },
    addButton: { margin: 'auto' }
}

export default class List extends Component {
    render () {        
        return (
            <div style={css.container}>
                { 
                    Object.values(this.props.tasks).map(project => (
                        <ListItem key={ task.id } 
                            project={ task }
                            onEdit={ () => this.props.onEdit(task.id) }
                            onDelete={ () => this.props.onDelete(task.id) }
                            onDashboard={ () => this.props.onDashboard(task.id) } />
                    ))
                }
                <Button fab color="primary"
                    aria-label="add" 
                    style={css.addButton}
                    onClick={this.props.onAdd}>
                    <AddIcon />
                </Button>
            </div>
        )
    }
}