import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'

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
        const { project, onEdit, onDelete, onDashboard } = this.props
        return (
            <Paper style={css.wrapper}>
                <img style={css.image} src='https://fakeimg.pl/64/' />
                <div style={css.content}>
                    <Typography type='title'>{ project.name }</Typography>
                    <Typography type='subheading'>{ project.description }</Typography>
                </div>
                <IconButton 
                    style={css.more}
                    onClick={this.openMenu}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    projectId={project.id}
                    open={this.state.menuOpen}
                    anchor={this.state.menuAnchor}
                    onClose={() => this.setState({ menuOpen: false })}
                    onEdit={ onEdit }
                    onDelete={ onDelete }
                    onDashboard={ onDashboard} />              
            </Paper>
        )
    }
}