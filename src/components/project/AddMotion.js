import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { presets } from 'react-motion'

import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import ProjectCardEdit from './ProjectCardEdit'

const SPEED = 10

const css = {
    motionContainer: {
        position: 'relative',
        height: '194px'
    },
    buttonClip: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '3px'
    },
    button: { position: 'absolute' },
    cardContainer: {
        position: 'absolute',
        top: '0px',
        width: '100%'
    }
}

export default class AddMotion extends Component {
    constructor () {
        super()
        this.state = { motionTarget: 0 }
    }

    render () {
        const { onAdd } = this.props
        const { motionTarget } = this.state

        return (
            <Motion style={{x: spring(motionTarget, presets.wobbly), y: spring(motionTarget) } }>
            { value => {
                const fabSize = (((300 - 56) / SPEED) * value.x + 56) + 'px'
                const fabOpacity = ((0 - 1) / SPEED) * value.y + 1
                const cardOpacity = ((1 - 0) / SPEED) * value.y

                const button = (
                    <div style={ css.buttonClip }>
                        <Button
                            fab disableRipple
                            color='accent'
                            style={{ ...css.button, width: fabSize, height: fabSize, opacity: fabOpacity }}
                            onClick={ () => this.setState({ motionTarget: motionTarget === SPEED ? 0 : SPEED }) }>
                            <AddIcon />
                        </Button>
                    </div>
                )

                const card = (
                    <div style={{ ...css.cardContainer, opacity: cardOpacity }}>
                        <ProjectCardEdit
                            onClose={ () => this.setState({ motionTarget: 0 }) }
                            onSubmit={ project => { onAdd(project); this.setState({ motionTarget: 0 }) } } />
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