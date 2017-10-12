import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Redirect } from 'react-router'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { indigo } from 'material-ui/colors'

import hero from '../../images/project-hero.jpg'
import { deleteProject } from '../../action-creators/projects'
import List from '../../components/project/List'

const css = {
    header: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: '1',
        padding: '15px 60px',
        backgroundColor: '#4f9cd0',
        color: 'white'
    },
    noPadding: { padding: '0 0 28px 0', position: 'relative' },
    fab: { position: 'absolute', right: '28px', bottom: '0px', zIndex: 1 }
}

class ListScreen extends Component {
    constructor () {
        super()
        this.state = { 
            onAdd: false, 
            onUpdate: false, 
            onDashboard: false,
            projectId: null
        }
    }

    render () {
        // REDIRECTIONS
        if (this.state.onAdd === true) {
            return <Redirect to='/project/add' />
        } else if (this.state.onEdit === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/edit/' } />
        } else if (this.state.onDashboard === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/dashboard/'} />
        }

        const { projects, deleteProject } = this.props
        return (
            <Grid container justify='center'>
                <Grid item xs={12} style={ css.noPadding }>
                    <Paper style={ css.header }>
                        <img src={hero} height={128} />
                        <Typography type='display2' align='center'>Projects</Typography>
                    </Paper>
                    <Button fab raised
                        style={ css.fab } 
                        color='accent' 
                        onClick={ () => this.setState({ onAdd: true }) }>
                        <AddIcon />
                    </Button>
                </Grid>
                <Grid item xs={10} md={6} xl={4} >
                    {
                        Object.values(projects).length === 0 ? 
                            <Typography><i>Project list is empty</i></Typography> :
                            <List 
                                projects={ projects }
                                onUpdate={ id => this.setState({ onUpdate: true, projectId: id }) }
                                onDelete={ id => deleteProject(id) }
                                onDashboard={ id => this.setState({ onDashboard: true, projectId: id })} />
                    }
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ projects }) => ({ projects })
export default connect(mapStateToProps, { deleteProject })(ListScreen)