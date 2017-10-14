import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

const css = {
    header: {
        position: 'relative',
        padding: '15px 0',
        marginBottom: '28px',
        backgroundColor: 'transparent',
    },
    fab: { 
        position: 'absolute', 
        right: '56px', 
        bottom: '-28px', 
        zIndex: 1 
    }
}


export default class Hero extends Component {
    render () {
        const { title, fabIcon, onFabClick } = this.props

        let button = undefined
        if (fabIcon !== undefined) {
            button = (
                    <Button fab raised
                        style={ css.fab } 
                        color='accent' 
                        onClick={ onFabClick }>
                        { fabIcon }
                    </Button>
            )
        }

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper square style={ css.header }>
                        <Typography type='display1' align='center'>{ title }</Typography>
                        { button }
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}