import React, { Component } from 'react'

import MaterialMenu, { MenuItem } from 'material-ui/Menu'

export default class Menu extends Component {

    render () {
        const { projectId } = this.props
        const { open, anchor, onClose, onUpdate, onDelete, onDashboard } = this.props
        return (
            <MaterialMenu
                open={ open }
                anchorEl={ anchor }
                onRequestClose={ onClose }>
                <MenuItem onClick={ onUpdate }>Edit</MenuItem>                
                <MenuItem onClick={ onDelete }>Delete</MenuItem>
                <MenuItem onClick={ onDashboard }>Dashboard</MenuItem>
            </MaterialMenu>
        )
    }
}