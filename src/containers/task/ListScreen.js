import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'

import ListItem from '../../components/task/ListItem'
import { addTask, updateTask, deleteTask } from '../../action-creators/tasks'

const css = {
    addButton: { position: 'fixed', right: '15px', bottom: '15px' }
}

class ListScreen extends Component {
    constructor () {
        super()
        this.state = {
            goToProject: false
        }
    }
    render () {
        const projectId = parseInt(this.props.match.params.id)
        if (this.state.goToProject === true) {
            return <Redirect to={ '/project/' + projectId + '/dashboard' } />
        }

        const { projects, tasks, addTask, updateTask, deleteTask } = this.props
        const project = projects[projectId]
        const projectTasks = Object.values(tasks).filter(t => t.projectId === projectId)

        return (
            <Grid container>
                <Grid item>
                    <Button color='primary' onClick={() => this.setState({ goToProject: true }) }>
                        <ArrowBackIcon /> Project ({ project.name })
                    </Button>
                    <Typography type='display2'>Tasks</Typography>
                    {
                        projectTasks.length === 0 ? 
                            <Typography type='title' gutterBottom><i>No tasks found for this project, click the "+" button to create a new task.</i></Typography> :
                            projectTasks.map(task => (
                                <ListItem 
                                    key={task.id} 
                                    task={task} 
                                    onUpdate={ task => updateTask(task)  }
                                    onDelete={ id => deleteTask(id) } />
                            ))
                    }

                    <Button fab 
                        onClick={ () => addTask({ projectId: project.id }) }
                        color="primary" 
                        aria-label="add" 
                        style={css.addButton}>
                        <AddIcon />
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })

export default connect(mapStateToProps, { addTask, updateTask, deleteTask })(ListScreen)