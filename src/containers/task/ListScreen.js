import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

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

        const project = this.props.projects[projectId]
        const tasks = Object.values(this.props.tasks).filter(t => t.projectId === projectId)

        return (
            <div>
                <Typography type='display2'>Tasks</Typography>
                <Button onClick={() => this.setState({ goToProject: true }) }>{ project.name }</Button>
                {
                    tasks.map(task => (
                        <ListItem 
                            key={task.id} 
                            task={task} 
                            onUpdate={ (id, name, description) => this.props.updateTask({ id, projectId, name, description })  }
                            onDelete={ (id) => this.props.deleteTask(id) } />
                    ))
                }

                <Button fab 
                    onClick={ () => this.props.addTask({ projectId: project.id }) }
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