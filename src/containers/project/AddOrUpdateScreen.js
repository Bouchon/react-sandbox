import React, { Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/Textfield'
import Button from 'material-ui/Button'

import { addProject, updateProject } from '../../action-creators/projects'

const DEFAULT_PROJECT = {
    id: undefined,
    name: '',
    description: ''
}

const css = { container: { display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto' }}

class AddOrUpdateScreen extends Component {
    constructor () {
        super()
        this.state = { 
            project: DEFAULT_PROJECT,
            redirect: false
        }
    }

    componentWillMount () {
        const projectId = this.props.match.params.id
        if (projectId !== undefined) {
            const project = this.props.projects[projectId]
            this.setState({project})
        }
    }

    @autobind
    addOrUpdate () {
        const { id, name, description } = this.state.project
        const { addProject, updateProject } = this.props

        if (id === undefined) {
            addProject(name, description)
        } else {
            updateProject(id, name, description)
        }

        this.setState({redirect: true})
    }

    render () {
        if (this.state.redirect === true) {
            return <Redirect to='/project/list' />
        }

        const isEdition = this.state.project.id !== undefined
        const title = isEdition === true ? 'Edit' : 'Create'
        return (
            <div style={css.container}>
                <Typography type='display2'>{title} Project</Typography>
                <TextField value={this.state.project.name}
                    onChange={event => this.setState({project: {...this.state.project, name: event.target.value }})}
                    label='Name'
                    placeholder='Project name'
                    margin='normal' />
                <TextField value={this.state.project.description}
                    onChange={event => this.setState({project: {...this.state.project, description: event.target.value }})}
                    label='Description'
                    placeholder='Project description'
                    margin='normal' />
                <Button raised color='primary'
                    onClick={this.addOrUpdate}>{title}</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ projects }) => ({ projects })
const mapDispatchToProps = (dispatch) => {
    return {
      onTodoClick: id => {
        dispatch(toggleTodo(id))
      }
    }
  }
export default connect(mapStateToProps, { addProject, updateProject })(AddOrUpdateScreen)

