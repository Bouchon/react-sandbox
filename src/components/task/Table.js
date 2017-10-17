import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import Typography from 'material-ui/Typography'
import MaterialTable, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

import DatePicker from '../common/DatePicker'

export default class Table extends Component {
    constructor () {
        super()
        this.state = {
            selected: []
        }
    }

    @autobind
    handleSelectAll (event, checked) {
        if (checked === true) {
            this.setState({ selected: this.props.tasks.map(t => t.id) })
        } else {
            this.setState({ selected: [] })
        }
    }

    @autobind
    handleSelect (event, checked, id) {
        const { selected } = this.state
        if (checked === true) {
            selected.push(id)
        } else {
            const index = selected.indexOf(id)
            selected.splice(index, 1)
        }

        this.setState({ selected })
    }

    render () {
        const { tasks, onUpdate, onDelete, onDashboard } = this.props
        return (
            <MaterialTable>
                <TableHead>
                    <TableRow>
                        <TableCell padding='checkbox'>
                            <Checkbox onChange={ this.handleSelectAll } checked={ this.state.selected.length === this.props.tasks.length } />
                        </TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Start date</TableCell>
                        <TableCell>End date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    Object.values(tasks).map(task => {
                        return (
                            <TableRow key={ task.id }>
                                <TableCell padding='checkbox'>
                                    <Checkbox 
                                        onChange={ (event, checked) => this.handleSelect(event, checked, task.id) }
                                        checked={ this.state.selected.indexOf(task.id) !== -1 }
                                            />
                                </TableCell>
                                <TableCell numeric>{ task.id }</TableCell>
                                <TableCell numeric>{ task.name }</TableCell>
                                <TableCell>TODO</TableCell>
                                <TableCell>
                                    <DatePicker value={ task.startDate } onChange={ date => onUpdate({...task, startDate: date}) } />
                                </TableCell>
                                <TableCell>
                                    <DatePicker value={ task.endDate } onChange={ date => onUpdate({...task, endDate: date}) } />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
                </TableBody>
            </MaterialTable>
        )
    }
}