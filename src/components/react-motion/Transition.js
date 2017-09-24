import React, { Component } from 'react'
import { Motion, spring } from 'react-motion' 

const css = {
    container: { backgroundColor: 'pink', width: '100%', height: '60px', cursor: 'pointer' },
    component: { backgroundColor: 'red', width: '10%', height: '60px' }
}

export default class Transition extends Component {    
    render () {
        const end = this.props.toggle ? 100 : 10
        const preset = this.props.preset
        return (
            <div>
                <Motion defaultStyle={{x: 0}} style={{x: spring(end, preset)}}>
                    { value =>
                        <div style={css.container}>
                        
                            <div style={{...css.component, marginLeft: 'calc(' + value.x + '% - 10%)'}}></div>
                        
                        </div>
                    }
                </Motion>
            </div>
        )
    }
}