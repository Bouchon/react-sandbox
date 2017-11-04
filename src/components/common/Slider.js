import React, { Component } from 'react'
import autobind from 'autobind-decorator'

export default class Slider extends Component {
    constructor () {
        super()
        this.state = { value: 0 }
        this.interval = undefined
        this.slider = undefined
    }

    componentDidMount () {
        const { defaultValue } = this.props
        if (defaultValue !== undefined) {
            this.setState({ value: defaultValue })
        }
    }

    @autobind
    setValue () {
        var event = { window }
        var { min, max, onChange } = this.props
        var currentTarget = this.slider
        var x = event.pageX - currentTarget.offsetLeft
        var width = currentTarget.offsetWidth
        var value = ((max - min) * (x / width))
        this.setState({ value })
        onChange(value)
    }

    @autobind
    onMouseDown (event) {
        this.slider = event.currentTarget
        this.interval = setInterval(this.setValue, 200)
    }

    @autobind
    onMouseUp (event) {
        clearInterval(this.interval)
    }

    render () {
        const { min, max, height } = this.props
        const { value } = this.state
        const barWidth = ((value - min) / (max - min) * 100) + '%'

        return (
            <div style={{ width: 'calc(100% - 20px)', padding: '10px' }}>
                <div
                    onMouseDown={ this.onMouseDown }
                    onMouseUp={ this.onMouseUp } 
                    style={{ height, width: '100%', backgroundColor: 'gray', borderRadius: height }}>
                    <div style={{ height: '100%', width: barWidth, borderRadius: height, backgroundColor: 'cyan' }}></div>
                </div>
            </div>
        )
    }
}