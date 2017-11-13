import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Redirect } from 'react-router'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import { indigo } from 'material-ui/colors'

import { addProject, deleteProject } from '../../action-creators/projects'
import AlertDialog from '../../components/common/AlertDialog'
import List from '../../components/project/List'
import Cards from '../../components/project/Cards'
import Hero from '../../components/common/Hero'

const css = {
    page: { padding: '24px' }
}

class ListScreen extends Component {
    constructor () {
        super()
        this.state = {
            dialogOpen: false,
            onAdd: false, 
            onUpdate: false, 
            onDashboard: false,
            projectId: null
        }
    }

    render () {
        // REDIRECTIONS
        if (this.state.onUpdate === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/edit/' } />
        } else if (this.state.onDashboard === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/dashboard/'} />
        }

        const breadCrumb = [
            { name: 'Projects' }
        ]

        const { projects, addProject, deleteProject, updateProject } = this.props
        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <div style={ css.page }>
                {
                    <Cards 
                        projects={ projects }
                        onAdd={ project => addProject(project) }
                        onUpdate={ project => updateProject(project) }
                        onDelete={ id => { this.setState({ dialogOpen: true, projectId: id }) } }
                        onDashboard={ id => this.setState({ onDashboard: true, projectId: id })} />
                }
                </div>

                <AlertDialog
                    open={ this.state.dialogOpen }
                    onCancel={ () => this.setState({ dialogOpen: false }) }
                    onConfirm={ () => { deleteProject(this.state.projectId); this.setState({ dialogOpen: false }) } }
                    title='Delete project ?'
                    contentText='Are you sure ?'
                    cancelText='Cancel'
                    confirmText='Delete' />
            </div>
        )
    }
}

const mapStateToProps = ({ projects }) => ({ projects })
export default connect(mapStateToProps, { addProject, deleteProject, updateProject })(ListScreen)