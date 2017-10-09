import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import ButtonBase from 'material-ui/ButtonBase'

const css = {
    button: { padding: 0 },
    tile: { display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '15px' },
}

export default class Tile extends Component {
    render () {
        return (
            <ButtonBase style={css.button} onClick={this.props.onClick}>
                <Paper style={css.tile}>
                    <Typography type='display2'>{this.props.value}</Typography>
                    <Typography>{this.props.title}</Typography>
                </Paper>
            </ButtonBase>
        )
    }
}