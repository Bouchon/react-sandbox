import React, { Component } from 'react'
import { Motion, spring } from 'react-motion' 

const css = {
    container: { position: 'relative', backgroundColor: 'pink', width: '800px', height: '60px', cursor: 'pointer' },
    component: { position: 'absolute', backgroundColor: 'red', width: '60px', height: '60px' }
}

export default class Transition extends Component {
    constructor () {
        super()
        this.state = { toggle: false }
    }
    
    render () {
        const end = this.state.toggle ? 740 : 0
        return (
            <div onClick={() => this.setState({toggle: !this.state.toggle})}>
                <Motion defaultStyle={{x: 0}} style={{x: spring(end)}}>
                    { value =>
                        <div style={css.container}>
                        
                            <div style={{...css.component, left: value.x + 'px'}}>

                            </div>
                        
                        </div>
                    }
                </Motion>
            </div>
        )
    }
}