import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import CheckIcon from 'material-ui-icons/Check'

const css = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '194px'
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        padding: '15px',
        justifyContent: 'space-around'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: 'solid 1px #eee'
    },
}

export default class ProjectCardEdit extends Component {
    constructor () {
        super()
        this.state = { project: { } }
    }

    componentWillMount () {
        const project = this.props.project !== undefined ?
            this.props.project :
            { name: '', description: '' }
        this.setState({ project })
    }

    render () {
        const { onClose, onSubmit } = this.props
        const { project } = this.state
        return (
            <Paper style={ css.paper }>
                <div style={ css.content }>
                    <TextField
                        autoFocus
                        value={ project.name }
                        label='Name'
                        onChange={ event => this.setState({ project: { ...project, name: event.target.value } }) } />
                    <TextField 
                        value={ project.description }
                        label='Description'
                        onChange={ event => this.setState({ project: { ...project, description: event.target.value } }) } />
                </div>
                <div style={ css.footer }>
                    <IconButton color='primary' onClick={ onClose }><CloseIcon /></IconButton>
                    <IconButton color='accent' onClick={ () => onSubmit(project) }><CheckIcon /></IconButton>
                </div>
            </Paper>
        )
    }
}