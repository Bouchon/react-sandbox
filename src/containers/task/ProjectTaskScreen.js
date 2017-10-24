import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

import { updateTask, deleteTask } from '../../action-creators/tasks'
import Hero from '../../components/common/Hero'

class ProjectTaskScreen extends Component {
    constructor () {
        super()
        this.state = { redirect: undefined }
    }
    render () {
        const { redirect } = this.state
        if (redirect !== undefined) {
            return <Redirect to={ redirect } />
        }

        const { projects, tasks } = this.props
        const projectId = parseInt(this.props.match.params.projectId)
        const taskId = parseInt(this.props.match.params.taskId)
        const project = projects[projectId]
        const task = tasks[taskId]

        const breadCrumb = [
            { name: 'Projects', redirect: () => this.setState({ redirect: '/project/list' }) },
            { name: project.name, redirect: () => this.setState({ redirect: '/project/' + projectId + '/dashboard' }) },
            { name: 'Tasks', redirect: () => this.setState({ redirect: '/project/' + projectId + '/task/list'}) },
            { name: task.name }
        ]
        
        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <div style={{ padding: '30px' }}>
                    <Typography onClick={ () => alert('ok') } type='title'>{ task.name }</Typography>
                    <Typography type='body2'>{ task.description }</Typography>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })

export default connect(mapStateToProps, { updateTask, deleteTask })(ProjectTaskScreen)