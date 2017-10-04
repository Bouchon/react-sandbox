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
                    Object.values(this.props.projects).map(project => (
                        <ListItem key={ project.id } 
                            project={ project }
                            onEdit={ () => this.props.onEdit(project.id) }
                            onDelete={ () => this.props.onDelete(project.id) }
                            onDashboard={ () => this.props.onDashboard(project.id) } />
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