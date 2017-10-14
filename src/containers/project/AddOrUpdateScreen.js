import React, { Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Redirect } from 'react-router'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Hero from '../../components/common/Hero'
import DatePicker from '../../components/common/DatePicker'

import { addProject, updateProject } from '../../action-creators/projects'

const css = { 
    datesContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: { marginTop: '15px' }
}

class AddOrUpdateScreen extends Component {
    constructor () {
        super()
        this.state = { 
            project: { },
            redirect: false
        }
    }

    componentWillMount () {
        const projectId = this.props.match.params.id
        const id = projectId === undefined ? undefined : parseInt(projectId)
        const project = id === undefined ? { } : this.props.projects[projectId]
        
        project.name = project.name === undefined ? '' : project.name
        project.description = project.description === undefined ? '' : project.description

        this.setState({ project: { ...project, id }})
    }

    @autobind
    addOrUpdate () {
        const { project } = this.state
        const { addProject, updateProject } = this.props

        if (project.id === undefined) {
            addProject(project)
        } else {
            updateProject(project)
        }

        this.setState({ redirect: true })
    }

    render () {
        if (this.state.redirect === true) {
            return <Redirect to='/project/list' />
        }

        const { project } = this.state 
        const isEdition = project.id !== undefined
        const title = isEdition === true ? 'Edit' : 'Create'
        return (
            <Grid container justify='center'>
                <Hero title={ title } />
                
                <Grid item xs={8} container direction='column'>
                    <TextField value={ project.name }
                        onChange={ event => this.setState({ project: { ...project, name: event.target.value } }) }
                        label='Name'
                        placeholder='Project name'
                        margin='normal' />

                    <TextField value={this.state.project.description}
                        onChange={ event => this.setState({ project: { ...project, description: event.target.value } }) }
                        label='Description'
                        placeholder='Project description'
                        margin='normal' />

                    <div style={ css.datesContainer }>
                        <DatePicker 
                            value={ project.startDate }
                            minDate={ new Date() }
                            maxDate={ project.endDate }
                            label='Start date'
                            onChange={ date => this.setState({ project: { ...project, startDate: date } }) } />
                        
                        <DatePicker 
                            value={ project.endDate }
                            minDate={ project.startDate }
                            label='End date'
                            onChange={ date => this.setState({ project: { ...project, endDate: date } }) } />
                    </div>
                    <Button raised color='primary' style={ css.button }
                        onClick={ this.addOrUpdate }>{ title }</Button>
                </Grid>
            </Grid>
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

