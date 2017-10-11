import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'

import Tile from '../../components/dashboard/Tile'

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

        if (project === undefined) 
            return <Typography color='accent' align='center' type='display3'>PROJECT NOT FOUND</Typography>       
 
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Button color='primary' onClick={() => this.setState({ goToProjectList: true }) }>
                        <ArrowBackIcon /> Project list
                    </Button>
                    <Typography type='display2'>Dashboard</Typography>
                    <Typography type='headline'>{ project.name }</Typography>
                </Grid>
                <Grid item container>
                    <Grid item>
                        <Tile title='tasks' value={ tasks.length } onClick={ () => this.setState({ goToTaskList: true }) } />
                    </Grid>
                    <Grid item>
                        <Tile title='conversations' value='0' />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })
export default connect(mapStateToProps)(DashboardScreen)