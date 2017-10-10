import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

import TexField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog';
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'

const locale = {
    locale: frLocale,
    headerFormat: 'dddd, D MMM',
    weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    weekStartsOn: 1,
    blank: 'Aucune date délectionnée',
    todayLabel: {
        long: "Aujourd'hui",
        short: 'Ajd.'
    }
}

export default class DatePicker extends Component {
    constructor () {
        super()
        this.state = {
            dialogOpen: false,
            date: new Date()
        }
    }

    formatDate (date) {
        return format(date, 'ddd Do MMM YYYY', { locale: frLocale })
    }

    @autobind
    onSelectDate (date) {
        this.setState({ date, dialogOpen: false })
        this.props.onChange(date)
    }

    render () {
        const { label } = this.props
        const { dialogOpen, date } = this.state

        return (
            <div>
                <TexField type='text' value={ this.formatDate(date) } disabled label={ label } onClick={ () => this.setState({ dialogOpen: true }) } />
                <Dialog open={ dialogOpen } onRequestClose={ () => this.setState({ dialogOpen: false }) }>
                    <InfiniteCalendar 
                        selected={ date } 
                        locale={ locale }
                        onSelect={ this.onSelectDate } />
                </Dialog>
            </div>
        )
    }
}
