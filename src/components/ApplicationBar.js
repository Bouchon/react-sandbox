import { connect } from 'react-redux'
import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import MenuIcon from 'material-ui-icons/Menu'
import ExitToAppIcon from 'material-ui-icons/ExitToApp'

import { logOut } from '../action-creators/login'
import LeftNavigation from './LeftNavigation'

import CircleTransition from './react-motion/CircleTransition'

const css = { title: { flex: 1 } }

class ApplicationBar extends Component {
    constructor () {
        super()
        this.state = { leftNavigationOpen: false, toggleCircle: false }
    }

    render () {
        const { title, logOut} = this.props

        return (
            <AppBar position='static'>
                <CircleTransition color='rgba(255, 0, 0, .3)' x={165} y={115} toggle={ this.state.toggleCircle } />
                <Toolbar>
                    <Hidden lgUp>
                        <IconButton
                            color='contrast' 
                            aria-label='Menu'
                            onClick={ () => this.setState({ leftNavigationOpen: true }) }>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <LeftNavigation 
                        type='temporary'
                        open={this.state.leftNavigationOpen}
                        onClick={ () => this.setState({leftNavigationOpen: false }) } />

                    <Typography type='title' color='inherit' style={css.title}>{ title }</Typography>
                    <Typography type='caption' color='inherit'>Logout</Typography>
                    <IconButton color='contrast' onClick={logOut}>
                        <ExitToAppIcon />
                    </IconButton>   
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })
export default connect(mapStateToProps, { logOut })(ApplicationBar)