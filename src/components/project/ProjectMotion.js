import React, { Component } from 'react'
import { presets } from 'react-motion'

import FadeMotion from '../common/FadeMotion'
import CardMotion from '../common/CardMotion'
import ProjectCard from './ProjectCard'

export default class ProjectMotion extends Component {
    constructor () {
        super()
        this.state = {
            opacity: 1,
            toggleEdit: false
        }
    }

    render() {
        const { project } = this.props
        return (
            <div style={{ width: '194px', height: '194px', margin: 'auto' }}>
                <FadeMotion opacity={ this.state.opacity } destroy destroyThreshold={.2}>
                    <CardMotion
                        preset={presets.stiff}
                        toggle={this.state.toggle}
                        minSize={48}
                        maxSize={275}
                        top='50%'
                        left='50%'>                        
                        <ProjectCard project={ project } onEdit={ event => this.setState({ toggleEdit: true }) } />
                    </CardMotion>
                </FadeMotion>
            </div>
        )
    }
}