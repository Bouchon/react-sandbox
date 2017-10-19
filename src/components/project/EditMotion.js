import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { presets } from 'react-motion'

import IconButton from 'material-ui/IconButton'
import ModeEditIcon from 'material-ui-icons/ModeEdit'

import ProjectCardEdit from './ProjectCardEdit'

const SPEED = 10

const css = {
    motionContainer: {
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '100%'
    },
    buttonClip: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        overflow: 'hidden'     
    },
    editButton: {
        position: 'absolute',
        backgroundColor: 'white'
    },
    cardContainer: {
        position: 'absolute',
        top: '0px',
        width: '100%'
    }
}

export default class EditMotion extends Component {
    constructor () {
        super()
        this.state = { motionTarget: 0 }
    }

    render () {
        const { project, onEdit } = this.props
        const { motionTarget } = this.state

        return (
            <Motion style={{x: spring(motionTarget, presets.gentle), y: spring(motionTarget) } }>
            { value => {
                const btnSize = (((600 - 48) / SPEED) * value.x + 48) + 'px'
                const btnPos = 'calc(100% - 24px - ' + btnSize + ' / 2)'
                const btnCol = value.y < .3 ? 'white' : 'rgba(0, 0, 255, .3)'
                const btnOpacity = ((0 - 1) / SPEED) * value.y + 1
                const cardOpacity = ((1 - 0) / SPEED) * value.y

                const button = (
                    <div style={ css.buttonClip }>
                        <IconButton
                            style={ { ...css.editButton, opacity: btnOpacity, backgroundColor: btnCol, width: btnSize, height: btnSize, top: btnPos, left: btnPos  } }
                            onClick={ () => this.setState({ motionTarget: motionTarget === 0 ? SPEED : 0 }) }>
                            <ModeEditIcon />
                        </IconButton>
                    </div>
                )
                const card = (
                    <div style={{ ...css.cardContainer, opacity: cardOpacity }}>
                        <ProjectCardEdit
                            project={ project }
                            onClose={ () => this.setState({ motionTarget: 0 }) }
                            onSubmit={ project => { onEdit(project); this.setState({ motionTarget: 0 }) } } />
                    </div>
                )

                return value.y < SPEED * .8 ? 
                    <div style={ css.motionContainer }>{ button }</div> : 
                    <div style={ css.motionContainer }>{ card }</div>
            } }
            </Motion>
        )
    }
}