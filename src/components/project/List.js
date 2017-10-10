import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import ListItem from './ListItem'

const css = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    addButton: { margin: 'auto' }
}

export default class List extends Component {
    render () { 
        const { projects, onAdd, onEdit, onDelete, onDashboard } = this.props
        return (
            <div style={css.container}>
                {
                    Object.values(projects).length === 0 ?
                        <Typography type='title' gutterBottom><i>No projects found, click the "+" button to create a new project.</i></Typography> :
                        Object.values(projects).map(project => (
                            <ListItem key={ project.id } 
                                project={ project }
                                onEdit={ () => onEdit(project.id) }
                                onDelete={ () => onDelete(project.id) }
                                onDashboard={ () =>onDashboard(project.id) } />
                        ))
                }
                <Button fab color="primary" 
                    aria-label="add" 
                    style={css.addButton}
                    onClick={onAdd}>
                    <AddIcon />
                </Button>
            </div>
        )
    }
}