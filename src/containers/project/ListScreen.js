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

import FadeMotion from '../../components/common/FadeMotion'
import CardMotion from '../../components/common/CardMotion'
import { presets } from 'react-motion'
import ProjectCard from '../../components/project/ProjectCard' 
import ProjectMotion from '../../components/project/ProjectMotion'

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
            projectId: null,

            opacity: 1,
            toggle: false
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

        const { projects, addProject, deleteProject } = this.props
        return (
            <div>
                <Hero breadCrumb={ breadCrumb } />
                <div style={ css.page }>
                {
                    <Cards 
                        projects={ projects }
                        onAdd={ project => addProject(project) }
                        onUpdate={ id => this.setState({ onUpdate: true, projectId: id }) }
                        onDelete={ id => { this.setState({ dialogOpen: true, projectId: id }) } }
                        onDashboard={ id => this.setState({ onDashboard: true, projectId: id })} />
                }
                </div>
                
                <div style={{display: 'flex'}}>
                    <div style={{ width: '30%', height: '194px', margin: 'auto' }}>
                            <FadeMotion opacity={ this.state.opacity } destroy destroyThreshold={.2}>
                                <ProjectCard project={ Object.values(projects)[0] } />
                            </FadeMotion>
                    </div>
                    <div style={{ width: '194px', height: '194px', margin: 'auto' }}>
                        <FadeMotion opacity={ this.state.opacity } destroy destroyThreshold={.2}>
                            <CardMotion
                                preset={presets.stiff}
                                toggle={this.state.toggle}
                                minSize={48}
                                maxSize={275}
                                top='50%'
                                left='50%'>                        
                                <ProjectCard project={ Object.values(projects)[0] } />
                            </CardMotion>
                        </FadeMotion>
                    </div>
                </div>

                <Button onClick={ () => this.setState({ 
                    opacity: this.state.opacity === 0 ? 1 : 0,
                    toggle: !this.state.toggle
                }) }>toggle</Button>

                <ProjectMotion project={ Object.values(projects)[0] } />

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
export default connect(mapStateToProps, { addProject, deleteProject })(ListScreen)