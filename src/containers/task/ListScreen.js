import React, { Component } from 'react'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import ListItem from '../../components/task/ListItem'
import { addTask, updateTask, deleteTask } from '../../action-creators/tasks'

const css = {
    addButton: { position: 'fixed', right: '15px', bottom: '15px' }
}

class ListScreen extends Component {
    render () {
        const projectId = parseInt(this.props.match.params.id)
        const project = this.props.projects[projectId]
        const tasks = Object.values(this.props.tasks).filter(t => t.projectId === projectId)

        return (
            <div>
                <Typography type='display2'>Tasks</Typography>
                <Typography type='headline'>{ project.name }</Typography>
                {
                    tasks.map(task => <ListItem key={task.id} task={task} />)
                }

                <Button fab 
                    onClick={ () => this.props.addTask(project.id, 'New task', '') }
                    color="primary" 
                    aria-label="add" 
                    style={css.addButton}>
                    <AddIcon />
                </Button>
            </div>
        )
    }
}

const mapStateToProps = ({ projects, tasks }) => ({ projects, tasks })

export default connect(mapStateToProps, { addTask, updateTask, deleteTask })(ListScreen)