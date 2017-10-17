import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import Hidden from 'material-ui/Hidden'
import Grid from 'material-ui/Grid'

import { grey } from 'material-ui/colors'

const css = {
    layout: { display: 'flex' },
    leftNav: { width: '250px', height: '100vh' },
    rightContent: { flexGrow: 1 }
}

export default class Layout extends Component {
    render () {
        const { leftNav, appBar, children } = this.props
        return (
            <Router>
                <div style={ css.layout }>
                    <Hidden mdDown>
                        <div style={css.leftNav}>
                            { leftNav }
                        </div>
                    </Hidden>
                    <div style={ css.rightContent }>
                        <div>
                            { appBar }
                        </div>
                        <div>
                            { children }
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

Layout.propTypes = {
    appBar: PropTypes.element.isRequired,
    leftNav: PropTypes.element.isRequired
}