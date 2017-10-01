import React, { Component } from 'react'

export default class ProjectList extends Component {
    render () {        
        return (
            <div>
                { Object.values(this.props.projects).map(project => (
                    <div>{project.name}</div>
                ))}
            </div>
        )
    }
}