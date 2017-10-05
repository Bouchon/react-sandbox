import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'

export default class ListItem extends Component {    
    render () {
        const { task } = this.props
        return (
            <Typography>
                { task.name }      
            </Typography>
        )
    }
}