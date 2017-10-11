import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { ListItem as MaterialListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ImageIcon from 'material-ui-icons/Image'
import MoreVertIcon from 'material-ui-icons/MoreVert'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'



import Menu from './Menu'

const css = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 10px 0'
    },
    image: {
        borderRadius: '32px',
        margin: '8px'
    },
    content: {
        padding: '8px',
        color: 'inherit'
    },
    more: {
        marginLeft: 'auto'
    }
}

export default class ListItem extends Component {
    constructor () {
        super()
        this.state = { 
            menuOpen: false,
            menuAnchor: undefined
        }
    }

    openMenu = (event) => {
        this.setState({
            menuOpen: true,
            menuAnchor: event.currentTarget
        })
    }
    
    render () {
        const { project, onUpdate, onDelete, onDashboard } = this.props
        return (
            <MaterialListItem button onClick={ onDashboard }>
                <ListItemAvatar>
                    <Avatar><ImageIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={ project.name } secondary={ project.description } />
                <ListItemSecondaryAction>
                    <IconButton onClick={ event => this.setState({ menuOpen: true, menuAnchor: event.currentTarget }) }>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        open={ this.state.menuOpen }
                        anchor={ this.state.menuAnchor }
                        onClose={ () => this.setState({ menuOpen: false })}
                        onUpdate={ onUpdate }
                        onDelete={ onDelete }
                        onDashboard={ onDashboard } />

                </ListItemSecondaryAction>
            </MaterialListItem>
        )
    }
}

/*
<Menu
    projectId={project.id}
    open={this.state.menuOpen}
    anchor={this.state.menuAnchor}
    onClose={() => this.setState({ menuOpen: false })}
    onUpdate={ onUpdate }
    onDelete={ onDelete }
    onDashboard={ onDashboard} />
*/