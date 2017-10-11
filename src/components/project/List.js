import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import MaterialList from 'material-ui/List';

import ListItem from './ListItem'

const css = {
    backgroundColor: 'white'
}

export default class List extends Component {
    render () { 
        const { projects, onUpdate, onDelete, onDashboard } = this.props
        return (
            <MaterialList style={ css }>
                {
                    Object.values(projects).map(project => {
                        return <ListItem
                            key={ project.id }
                            project={ project }
                            onEdit={ () => onEdit(project.id) }
                            onDelete={ () => onDelete(project.id) }
                            onDashboard={ () =>onDashboard(project.id) } />
                    })
                }
            </MaterialList>
        )
    }
}