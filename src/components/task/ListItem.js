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
        const { task, onUpdate, onDelete } = this.props
        return (
            <div style={ css.item }>
                <Typography style={ css.index } type='title'>{ task.id }</Typography>
                
                <TextField
                    label='Name'
                    value={ task.name } 
                    onChange={ event => onUpdate({...task, name: event.target.value})} />

                <DatePicker label='Start date' onChange={ date => onUpdate({...task, startDate: date}) } />
                <DatePicker label='End date' onChange={ date => onUpdate({...task, endDate: date}) } />

                <IconButton 
                    onClick={ () => onDelete(task.id) }>
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    }
}