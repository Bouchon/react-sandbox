import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import { StaggeredMotion, spring } from 'react-motion'

export default class Staggered extends Component {
    render () {
        return (
            <div>
                <Typography type='title'>Staggered</Typography>
                <StaggeredMotion 
                    defaultStyles={[{w: 0}, {w: 0}, {w: 0}]}
                    styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                        return i === 0
                            ? {w: spring(100)}
                            : {w: spring(prevInterpolatedStyles[i - 1].w)}
                    })}>
                    {interpolatingStyles =>
                        <div>
                            {interpolatingStyles.map((style, i) =>
                                <div key={i} style={{border: '1px solid', height: style.w}} />)
                            }
                        </div>
                    }
                </StaggeredMotion>
            </div>
        )
    }
}