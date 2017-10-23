import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/Menu/MenuItem'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'
import SearchIcon from 'material-ui-icons/Search'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import CloseIcon from 'material-ui-icons/Close'
import CheckIcon from 'material-ui-icons/Check'

import Hero from '../../components/common/Hero'
import { addTask, updateTask, deleteTask } from '../../action-creators/tasks'

const status = [ 'NEW', 'TODO', 'WIP', 'DONE' ]

class ProjectTasksScreen extends Component {
    constructor () {
        super()
        this.state = {
            redirect: undefined,
            selection: [],
            search: '',
            editId: undefined
        }
    }

    render () {
        const { redirect, selection, search, editId } = this.state
        if (redirect !== undefined) {
            return <Redirect to={ redirect } />
        }

        const { projects, tasks, addTask, updateTask, deleteTask } = this.props
        const projectId = parseInt(this.props.match.params.id)
        const project = projects[projectId]
        const projectTasks = Object.values(tasks).filter(t => t.projectId === projectId && (search === '' || search !== '' && t.name.toLowerCase().includes(search.toLowerCase())))


        const breadCrumb = [
            { name: 'Projects', redirect: () => this.setState({ redirect: '/project/list' }) },
            { name: project.name, redirect: () => this.setState({ redirect: '/project/' + projectId + '/dashboard' }) },
            { name: 'Tasks' }
        ]

        const toolbar = selection.length === 0 ?
        (
            <Toolbar>
                <Typography type='title' style={{ marginRight: 'auto' }}>{ projectTasks.length } Tasks</Typography>
                <TextField value={ search } placeholder='search' onChange={ (event) => this.setState({ search: event.target.value }) } />
                <IconButton><SearchIcon /></IconButton>
                <IconButton onClick={ () => addTask({ projectId, name: 'New task', status: status[0] }) }><AddIcon /></IconButton>
            </Toolbar> ) :
        (
            <Toolbar style={{ backgroundColor: 'pink' }}>
                <Typography type='title' style={{ marginRight: 'auto' }}>{ selection.length } Selected</Typography>
                <IconButton onClick={ () => {selection.map(id => deleteTask(id)); this.setState({ selection: [] }) }}><DeleteIcon /></IconButton>
            </Toolbar>
        )
        
        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                { toolbar }
                <Table>
                    <TableHead>
                        <TableRow onClick={ () => {
                                const newSelection = selection.length === projectTasks.length ? [] : projectTasks.map(task => task.id)
                                this.setState({ selection: newSelection })
                            } }>
                            <TableCell><Checkbox checked={ selection.length === projectTasks.length && selection.length > 0 } /></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { projectTasks.length === 0 ?
                        <TableRow><TableCell colSpan={6} style={{ textAlign: 'center', fontStyle: 'italic' }}>No tasks found...</TableCell></TableRow> :
                        projectTasks.map(task => {
                            const selected = selection.includes(task.id)
                            const onEdit = editId === task.id
                            return (
                                <TableRow key={ task.id }>
                                    <TableCell><Checkbox checked={ selected } onClick={ () => { 
                                        if (selected === false) selection.push(task.id)
                                        else selection.splice(selection.indexOf(task.id), 1)
                                        this.setState({ selection }) 
                                    } } /></TableCell>
                                    <TableCell><TextField value={ task.name } onChange={ (event) => updateTask({ ...task, name: event.target.value }) } /></TableCell>
                                    <TableCell>
                                        <TextField select value={ task.status } onChange={ (event) => updateTask({ ...task, status: event.target.value }) }>
                                            { status.map(option => <MenuItem key={option} value={option}>{option}</MenuItem> )}
                                        </TextField>
                                    </TableCell>
                                    <TableCell>{ task.begin }   <IconButton><ModeEditIcon style={{ fontSize: '13px' }} /></IconButton></TableCell>
                                    <TableCell>{ task.end }     <IconButton><ModeEditIcon style={{ fontSize: '13px' }} /></IconButton></TableCell>
                                    <TableCell>{ task.created } <IconButton><ModeEditIcon style={{ fontSize: '13px' }} /></IconButton></TableCell>
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