import React, { Component } from 'react'
import { presets } from 'react-motion'
import TransitionGroup from '../components/react-motion/TransitionGroup'
import Staggered from '../components/react-motion/Staggered'

export default class ReactMotionScreen extends Component {
    constructor () {
        super()
        this.state = { toggle: false }
    }
    render () {
        return (
            <div>
                <TransitionGroup />
                <Staggered />
            </div>
        )
    }
}