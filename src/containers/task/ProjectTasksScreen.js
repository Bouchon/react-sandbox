import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
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
import MoreVertIcon from 'material-ui-icons/MoreVert'

import Hero from '../../components/common/Hero'
import { deleteTask } from '../../action-creators/tasks'

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

        const { projects, tasks, deleteTask } = this.props
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
                <Typography type='title' style={{ marginRight: 'auto' }}>Tasks ({ projectTasks.length })</Typography>
                <FormControl>
                    <InputLabel>search</InputLabel>
                    <Input type='text' value={ search } onChange={ event => this.setState({ search: event.target.value }) }
                        endAdornment={ <InputAdornment position='end'><SearchIcon /></InputAdornment> } />
                </FormControl>
                <TextField value={ search } placeholder='search' onChange={ (event) => this.setState({ search: event.target.value }) }>               
                </TextField>
                <IconButton><SearchIcon /></IconButton>
                <IconButton onClick={ () => this.setState({ redirect: '/project/' + projectId + '/task/add' }) }><AddIcon /></IconButton>
            </Toolbar> ) :
        (
            <Toolbar style={{ backgroundColor: '#666ad1' }}>
                <Typography type='title' style={{ marginRight: 'auto', color: 'white' }}>{ selection.length } selected</Typography>
                <IconButton><MoreVertIcon /></IconButton>
                <IconButton onClick={ () => {selection.map(id => deleteTask(id)); this.setState({ selection: [] }) }}><DeleteIcon /></IconButton>
            </Toolbar>
        )
        
        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <div style={{ padding: '30px' }}>
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
                                        <TableCell>{ task.name }</TableCell>
                                        <TableCell>{ task.status }</TableCell>
                                        <TableCell>{ task.begin }</TableCell>
                                        <TableCell>{ task.end }</TableCell>
                                        <TableCell>{ task.created }</TableCell>
                                        <TableCell><IconButton onClick={ () => this.setState({ redirect: '/project/' + projectId + '/task/' + task.id + '/edit' }) }><ModeEditIcon /></IconButton></TableCell>
                                    </TableRow>
                                )
                            }) }
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })

export default connect(mapStateToProps, { deleteTask })(ProjectTasksScreen)