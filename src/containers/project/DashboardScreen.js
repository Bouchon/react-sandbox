import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import TaskList from '../../components/task/List'

class DashboardScreen extends Component {
    constructor () {
        super()        
        this.state = { project: null, tasks: null }
    }

    componentWillMount () {
        const projectId = this.props.match.params.id
        const tasks = Object.values(this.props.tasks).filter(task => task !== null)

        this.setState({ 
            project: this.props.projects[projectId],
            tasks: tasks
        })
    }

    render () {
        const { project } = this.state

        if (project === undefined) 
            return <Typography color='accent' align='center' type='display3'>PROJECT NOT FOUND</Typography>
 
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography type='display2'>Dashboard</Typography>
                    <Typography type='headline'>{ project.name }</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>    
                    <TaskList tasks={ this.state.tasks } />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })
export default connect(mapStateToProps)(DashboardScreen)