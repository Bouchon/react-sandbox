import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import autobind from 'autobind-decorator'

import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog'

export default class AlertDialog extends Component {

    render () {
        const { open, onCancel, onConfirm, title, contentText, cancelText, confirmText } = this.props
        return (
            <Dialog open={open} onRequestClose={ onCancel }>
                <DialogTitle>{ title }</DialogTitle>
                <DialogContent>
                    <DialogContentText>{ contentText }</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onCancel } color="primary">{ cancelText }</Button>
                    <Button onClick={ onConfirm } color="accent">{ confirmText }</Button>
                </DialogActions>
            </Dialog>
        )
    }
}