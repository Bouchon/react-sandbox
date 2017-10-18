import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { presets } from 'react-motion'

import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import ProjectCardEdit from './ProjectCardEdit'

const SPEED = 10

const css = {
    addContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '194px',
        overflow: 'hidden',
        borderRadius: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
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
            <Motion style={{x: spring(motionTarget, presets.stiff), y: spring(motionTarget) } }>
            { value => {
                const fabSize = (((300 - 56) / SPEED) * value.x + 56) + 'px'
                const fabOpacity = ((0 - 1) / SPEED) * value.y + 1
                const cardOpacity = ((1 - 0) / SPEED) * value.y

                const component = fabOpacity > .3 ?
                    <div style={ css.addContainer }>
                        <Button
                            fab disableRipple
                            color='accent'
                            style={{ position: 'absolute', width: fabSize, height: fabSize, opacity: fabOpacity }}
                            onClick={ () => this.setState({ motionTarget: SPEED }) }>
                            <AddIcon />
                        </Button>
                    </div> :
                    <ProjectCardEdit
                        style={{ ...css.addContainer, opacity: cardOpacity }}
                        onClose={ () => this.setState({ motionTarget: 0 }) }
                        onSubmit={ project => { onAdd(project); this.setState({ motionTarget: 0 }) } } />
                
                return component
            } }
            </Motion>
        )
    }
}