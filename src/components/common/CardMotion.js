import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { presets } from 'react-motion'

const SPEED = 100

export default class CardMotion extends Component {
    render () {
        const { children, preset, toggle, minSize, maxSize, top, left } = this.props
        const target = toggle ? minSize : maxSize
        const effect = preset ? spring(target, preset) : spring(target)
        
        return (
            <Motion style={ { x: effect } }>
            { value => {
                const css = {
                    position: 'absolute',
                    width: value.x + 'px',
                    height: value.x + 'px',
                    top: 'calc(' + top + ' - ' + (value.x/2) + 'px)', 
                    left: 'calc(' + left + ' - ' + (value.x/2) + 'px)',
                    borderRadius: '50%',
                    backgroundColor: 'pink'
                }
                return (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            { children }
                        </div>
                        <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                            <div style={ css }></div>
                        </div>
                    </div>
                )
            } }
            </Motion>
        )
    }
}