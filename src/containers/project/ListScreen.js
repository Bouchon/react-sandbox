import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Redirect } from 'react-router'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { indigo } from 'material-ui/colors'

import { deleteProject } from '../../action-creators/projects'
import List from '../../components/project/List'
import Hero from '../../components/common/Hero'

const css = {
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
        } else if (this.state.onUpdate === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/edit/' } />
        } else if (this.state.onDashboard === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/dashboard/'} />
        }

        const { projects, deleteProject } = this.props
        return (
            <Grid container>
                <Hero title='Projects' fabIcon={ <AddIcon /> } onFabClick={ () => this.setState({ onAdd: true }) } />
                
                <Grid item xs={12} md={8} lg={6} style={{margin: 'auto'}}>
                { Object.values(projects).length === 0 ?
                    <Typography><i>Project list is empty</i></Typography> :
                    <List 
                        projects={ projects }
                        onUpdate={ id => this.setState({ onUpdate: true, projectId: id }) }
                        onDelete={ id => deleteProject(id) }
                        onDashboard={ id => this.setState({ onDashboard: true, projectId: id })} /> }
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ projects }) => ({ projects })
export default connect(mapStateToProps, { deleteProject })(ListScreen)