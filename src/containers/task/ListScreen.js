import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'

import Hero from '../../components/common/Hero'
import Table from '../../components/task/Table'
import ListItem from '../../components/task/ListItem'
import { addTask, updateTask, deleteTask } from '../../action-creators/tasks'

const css = {
    page: { padding: '24px' },
    addButton: { position: 'fixed', right: '15px', bottom: '15px' }
}

class ListScreen extends Component {
    constructor () {
        super()
        this.state = {
            goToProjectList: false,
            goToProjectDashboard: false
        }
    }
    render () {
        const projectId = parseInt(this.props.match.params.id)
        if (this.state.goToProjectList === true) {
            return <Redirect to={ '/project/list' } />
        } else if (this.state.goToProjectDashboard === true) {
            return <Redirect to={ '/project/' + projectId + '/dashboard' } />
        }

        const { projects, tasks, addTask, updateTask, deleteTask } = this.props
        const project = projects[projectId]
        const projectTasks = Object.values(tasks).filter(t => t.projectId === projectId)
        const breadCrumb = [
            { name: 'Projects', redirect: () => this.setState({ goToProjectList: true }) },
            { name: project.name, redirect: () => this.setState({ goToProjectDashboard: true }) },
            { name: 'Tasks' }
        ]

        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <div style={ css.page }>
                    <Table tasks={ projectTasks } />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })

export default connect(mapStateToProps, { addTask, updateTask, deleteTask })(ListScreen)