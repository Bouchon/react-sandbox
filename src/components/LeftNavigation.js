import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import HomeIcon from 'material-ui-icons/Home'

export default class LeftNavigation extends Component {
    render () {
        const { type, open, onClick } = this.props

        return (
            <Drawer style={ { width: '250px' } } type={type} open={open} onClick={onClick}>
                <List disablePadding style={{width: '249px'}}>
                    <Link to='/'>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                    </Link>
                    <Link to='/project/list'>
                        <ListItem button>
                            <ListItemText primary='Projects' />
                        </ListItem>
                    </Link>
                    <Link to='/react-motion'>
                        <ListItem button>
                            <ListItemText primary='react-motion' />
                        </ListItem>
                    </Link>
                    <Link to='/'>
                        <ListItem button>
                            <ListItemText primary='Page 2' />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
          )
    }
}