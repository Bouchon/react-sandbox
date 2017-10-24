import React, { Component } from 'react'
import { presets } from 'react-motion'
import TransitionGroup from '../components/react-motion/TransitionGroup'
import Staggered from '../components/react-motion/Staggered'
import CardMotion from '../components/react-motion/CardMotion'

export default class ReactMotionScreen extends Component {
    constructor () {
        super()
        this.state = { toggle: false }
    }
    render () {
        return (
            <div>
                <CardMotion />
                <TransitionGroup />
                <Staggered />
            </div>
        )
    }
}