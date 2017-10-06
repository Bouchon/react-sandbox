import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'

const css = {
    item: { padding: '15px', borderTop: 'solid 1px #AAA' }
}

export default class ListItem extends Component {    
    render () {
        const { task } = this.props
        return (
            <Typography style={css.item}>
                { task.name }      
            </Typography>
        )
    }
}