import React, { Component } from 'react'

import MaterialTable, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

export default class Table extends Component {
    render () {
        const { tasks, onUpdate, onDelete, onDashboard } = this.props
        return (
            <MaterialTable>
                <TableHead>
                    <TableRow>
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
                                <TableCell numeric>{ task.id }</TableCell>
                                <TableCell numeric>{ task.name }</TableCell>
                                <TableCell>TODO</TableCell>
                                <TableCell>
                                    <DatePicker value={ task.startDate } label='Start date' onChange={ date => onUpdate({...task, startDate: date}) } />
                                </TableCell>
                                <TableCell>
                                    <DatePicker value={ task.endDate } label='End date' onChange={ date => onUpdate({...task, endDate: date}) } />
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