import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'

import Hero from '../../components/common/Hero'
import { addTask, updateTask, deleteTask } from '../../action-creators/tasks'

class ProjectTasksScreen extends Component {
    constructor () {
        super()
        this.state = {
            redirect: undefined,
            selection: []
        }
    }

    render () {
        const { redirect, selection } = this.state
        if (redirect !== undefined) {
            return <Redirect to={ redirect } />
        }

        const { projects, tasks, addTask, updateTask, deleteTask } = this.props
        const projectId = parseInt(this.props.match.params.id)
        const project = projects[projectId]
        const projectTasks = Object.values(tasks).filter(t => t.projectId === projectId)

        const breadCrumb = [
            { name: 'Projects', redirect: () => this.setState({ redirect: '/project/list' }) },
            { name: project.name, redirect: () => this.setState({ redirect: '/project/' + projectId + '/dashboard' }) },
            { name: 'Tasks' }
        ]
        
        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <Toolbar>
                    <Typography type='title' style={{ marginRight: 'auto' }}>Tasks</Typography>
                    {
                        selection.length === 0 ? 
                            <IconButton onClick={ () => addTask({ projectId }) }><AddIcon /></IconButton> : 
                            <IconButton><DeleteIcon /></IconButton>
                    }
                    <IconButton><MoreHorizIcon /></IconButton>
                </Toolbar>

                <Table>
                    <TableHead>
                        <TableRow onClick={ () => {
                                const newSelection = selection.length === projectTasks.length ? [] : projectTasks.map(task => task.id)
                                this.setState({ selection: newSelection })
                            } }>
                            <TableCell><Checkbox checked={ selection.length === projectTasks.length } /></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { projectTasks.map(task => {
                        const rowSelected = selection.includes(task.id)
                        return (
                            <TableRow key={ task.id } onClick={ () => { 
                                    if (rowSelected === false) selection.push(task.id)
                                    else selection.splice(selection.indexOf(task.id), 1)
                                    this.setState({ selection }) 
                                } }>
                                <TableCell><Checkbox checked={ rowSelected } /></TableCell>
                                <TableCell>{ task.name }</TableCell>
                                <TableCell>{ task.begin }</TableCell>
                                <TableCell>{ task.end }</TableCell>
                                <TableCell>{ task.created }</TableCell>
                            </TableRow>
                        )
                    }) }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })

export default connect(mapStateToProps, { addTask, updateTask, deleteTask })(ProjectTasksScreen)