import React, { Component } from 'react'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'

class DashboardScreen extends Component {
    constructor () {
        super()        
        this.state = { project: null, tasks: null }
    }

    componentWillMount () {
        const projectId = this.props.match.params.id
        const tasks = Object.values(this.props.tasks)
            .map(task => task.projectId === projectId ? task : null)
            .filter(task => task !== null)

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
            <div>
                <Typography type='display2'>Dashboard</Typography>
                <Typography type='headline'>{ project.name }</Typography>

            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })
export default connect(mapStateToProps)(DashboardScreen)