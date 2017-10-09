import React, { Component } from 'react'

import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog';
import InfiniteCalendar from 'react-infinite-calendar'

export default class DatePicker extends Component {
    render () {
        return <Button>{this.props.label}</Button>
    }
}
