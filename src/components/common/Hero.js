import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'

const css = {
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    header: {
        padding: '15px 24px',
        position: 'relative'
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
        const { breadCrumb, fabIcon, onFabClick } = this.props

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

        const breadCrumbs = breadCrumb.map( (item, index) => {
            const isLast = index === breadCrumb.length - 1
            const isFirst = index === 0
            const { name, redirect } = item

            const button = isLast ? 
                <Button color='accent'>{ name }</Button> :
                <Button color='inherit' onClick={ redirect }>{ name }</Button>

            const result = isFirst ? 
                <div style={ css.flex } key={ index }>{ button }</div> : 
                <div style={ css.flex } key={ index }><ChevronRightIcon />{ button }</div>
            
            return result
        })

        return (
            <Paper square style={ css.header }>
                <div style={ css.flex }>
                    { breadCrumbs }
                </div>
                { button }
            </Paper>
        )
    }
}