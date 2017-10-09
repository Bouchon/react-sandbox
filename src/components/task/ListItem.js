import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

const css = {
    item: { display: 'flex', alignItems: 'center' },
    index: { minWidth: '40px' }
}

export default class ListItem extends Component {    
    render () {
        const { task } = this.props
        return (
            <div style={ css.item }>
                <Typography style={ css.index } type='title'>{ task.id }</Typography>
                <TextField value={ task.name  } />
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    }
}