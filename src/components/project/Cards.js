import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'

const css = {
    card: {
        minWidth: '150px',
        height: '188px' 
    },
    addDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '150px',
        height: '188px'
    }
}

export default class Cards extends Component {
    render () {
        const { projects, onAdd, onDashboard, onUpdate, onDelete } = this.props
        return (
            <Grid container align='center'>
            {
                Object.values(projects).map(project => {
                    return (
                        <Grid item key={ project.id }>
                            <Card style={ css.card }>
                                <CardContent>
                                    <Typography type='headline'>
                                        <a href='#' onClick={ () => onDashboard(project.id) }>
                                            { project.name }
                                        </a>
                                    </Typography>
                                    <Typography type='body1'>{ project.description }</Typography>
                                    <Typography type='caption'>Tasks (0)</Typography>
                                    <Typography type='caption'>Documents (0)</Typography>
                                    <Typography type='caption'>Members (0)</Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={ () => onUpdate(project.id) } aria-label='edit'><ModeEditIcon /></IconButton>
                                    <IconButton onClick={ () => onDelete(project.id) } aria-label='delete'><DeleteIcon /></IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })
            }
                <Grid item>
                    <div style={ css.addDiv }>
                        <Button onClick={ onAdd } fab color='accent' aria-label='add'>
                            <AddIcon />
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}