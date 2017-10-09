import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'

const css = {
    form: { height: '48px' },
    container: { display: 'flex', alignItems: 'center', marginTop: '16px' }
}

const maxHour = 24
const maxMinute = 60

export default class TimePicker extends Component {
    constructor () {
        super()
        this.state = {
            hour: '00',
            minute: '00'
        }
    }

    render () {
        return (            
            <FormControl style={ css.form }>
                <InputLabel>{ this.props.label }</InputLabel>
                <div style={css.container}>
                    <Select value={ this.state.hour } onChange={ (event) => this.setState({ hour: event.target.value }) }>
                    {
                        [...Array(maxHour)].map( (_, i) => {
                            return <MenuItem value={i}>{ ('0' + i).slice(-2) }</MenuItem>
                        })
                    }              
                    </Select>
                    <Typography>h</Typography>
                    <Select value='00'>
                    {
                        [...Array(maxMinute)].map( (_, i) => {
                            return <MenuItem value={i}>{ ('0' + i).slice(-2) }</MenuItem>
                        })
                    }
                    </Select>
                    <Typography>min</Typography>
                </div>
            </FormControl>
        )
    }
}