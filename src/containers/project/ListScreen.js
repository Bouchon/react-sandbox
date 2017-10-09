import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Redirect } from 'react-router'

import { deleteProject } from '../../action-creators/projects'
import List from '../../components/project/List'


class ListScreen extends Component {
    constructor () {
        super()
        this.state = { 
            onAdd: false, 
            onEdit: false, 
            onDashboard: false,
            projectId: null
        }
    }

    render () {
        if (this.state.onAdd === true) {
            return <Redirect to='/project/add' />
        } else if (this.state.onEdit === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/edit/' } />
        } else if (this.state.onDashboard === true) {
            return <Redirect to={'/project/' + this.state.projectId + '/dashboard/'} />
        }

        return <List 
            projects={this.props.projects} 
            onAdd={() => this.setState({ onAdd: true })}
            onEdit={(id) => this.setState({ onEdit: true, projectId: id })}
            onDelete={ (id) => this.props.deleteProject(id) }
            onDashboard={(id) => this.setState({ onDashboard: true, projectId: id })} />
    }
}

const mapStateToProps = ({ projects }) => ({ projects })
export default connect(mapStateToProps, { deleteProject })(ListScreen)