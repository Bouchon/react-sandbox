import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'

import Hero from '../../components/common/Hero'
import Tile from '../../components/dashboard/Tile'

const css = {
    page: { padding: '24px' }
}
class DashboardScreen extends Component {
    constructor () {
        super()        
        this.state = {
            goToProjectList: false,
            goToTaskList: false
        }
    }

    render () {
        const { goToProjectList, goToTaskList } = this.state
        const projectId = parseInt(this.props.match.params.id)
        if (goToProjectList === true)
            return <Redirect to='/project/list' />
        if (goToTaskList === true)
            return <Redirect to={'/project/' + projectId + '/task/list'} />
        
        const project = this.props.projects[projectId]
        const tasks = Object.values(this.props.tasks).filter(t => t.projectId === projectId)
        const breadCrumb = [
            { name: 'Projects', redirect: () => this.setState({ goToProjectList: true }) },
            { name: project.name }
        ]

        if (project === undefined) 
            return <Typography color='accent' align='center' type='display3'>PROJECT NOT FOUND</Typography>       
        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <div style={ css.page }>
                    <Grid container>
                        <Grid item>
                            <Tile title='tasks' value={ tasks.length } onClick={ () => this.setState({ goToTaskList: true }) } />
                        </Grid>
                        <Grid item>
                            <Tile title='conversations' value='0' />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })
export default connect(mapStateToProps)(DashboardScreen)