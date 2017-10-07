import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStoredState } from 'redux-persist'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import TaskList from '../../components/task/List'

class DashboardScreen extends Component {
    constructor () {
        super()        
        this.state = {
            project: undefined, 
            tasks: undefined 
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.state.project === undefined) {
            const { projects } = nextProps
            const projectId = this.props.match.params.id
            this.setState({ project: projects[projectId] })
        }

        if (this.state.tasks === undefined) {
            const { tasks } = nextProps
            const projectId = parseInt(this.props.match.params.id)
            this.setState({ tasks: Object.values(tasks).filter(task => task.projectId === projectId) })
        }
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

const mapStateToProps = ({ projects, tasks }) => {
    return { projects, tasks }
}
export default connect(mapStateToProps)(DashboardScreen)