import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import { addTask, updateTask } from '../../action-creators/tasks'
import Hero from '../../components/common/Hero'

class ProjectTaskEditScreen extends Component {
    constructor () {
        super()
        this.state = { redirect: undefined, task: {} }
    }

    componentWillMount () {
        const { projectId, taskId } = this.props.match.params        
        const { projects, tasks } = this.props

        this.isCreate = taskId === undefined
        this.project = projects[parseInt(projectId)]
        
        const task = this.isCreate ? { projectId: this.project.id } : tasks[parseInt(taskId)]
        this.setState({ task })
    }

    render () {
        const { redirect, task } = this.state
        if (redirect !== undefined) {
            return <Redirect to={ redirect } />
        }

        const { isCreate, project } = this
        const { addTask, updateTask } = this.props
        const title = isCreate ? 'Create' : 'Edit'

        const breadCrumb = [
            { name: 'Projects', redirect: () => this.setState({ redirect: '/project/list' }) },
            { name: project.name, redirect: () => this.setState({ redirect: '/project/' + project.id + '/dashboard' }) },
            { name: 'Tasks', redirect: () => this.setState({ redirect: '/project/' + project.id + '/task/list' }) },
            { name: title + (task.name === undefined ? '' :  ' ' + task.name) }
        ]

        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <div style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
                    <Typography type='title'>{ title }</Typography>
                    <TextField autoFocus label='name' value={ task.name } onChange={ (event) => this.setState({ task: { ...task, name: event.target.value } }) } />
                    <TextField label='description' value={ task.description }  onChange={ (event) => this.setState({ task: { ...task, description: event.target.value } }) } />

                    <div style={{ display: 'flex' }}>
                        <Button style={{ margin: '10px' }} raised onClick={ breadCrumb[2].redirect }>Cancel</Button>
                        <Button style={{ margin: '10px' }} raised color='primary' onClick={ () => { isCreate ? addTask(task) : updateTask(task); this.setState({ redirect: '/project/' + project.id + '/task/list' }) } }>{ title }</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })

export default connect(mapStateToProps, { addTask, updateTask })(ProjectTaskEditScreen)