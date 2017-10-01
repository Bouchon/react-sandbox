import React, { Component } from 'react'
import {connect } from 'react-redux'

import ProjectList from '../../components/project/ProjectList'

class ProjectsScreen extends Component {
    render () {
        return <ProjectList projects={this.props.projects} />
    }
}

const mapStateToProps = ({ projects }) => ({ projects })
export default connect(mapStateToProps)(ProjectsScreen)