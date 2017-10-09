import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

import DatePicker from '../common/DatePicker'
import TimePicker from '../common/TimePicker'

const css = {
    item: { display: 'flex', alignItems: 'center', margin: '15px' },
    index: { minWidth: '40px' }
}

export default class ListItem extends Component {  
    render () {
        const { task } = this.props
        return (
            <div style={ css.item }>
                <Typography style={ css.index } type='title'>{ task.id }</Typography>
                
                <TextField
                    label='Name'
                    value={ task.name } 
                    onChange={ event => this.props.onUpdate(task.id, event.target.value, task.description )} />

                <DatePicker label='Start date' />
                <TimePicker label='Start date' />

                <IconButton 
                    onClick={ () => this.props.onDelete(task.id) }>
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    }
}