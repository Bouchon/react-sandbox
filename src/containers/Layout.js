import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import Hidden from 'material-ui/Hidden'
import Grid from 'material-ui/Grid'

import { grey } from 'material-ui/colors'

const css = {
    layout: { display: 'flex', minHeight: '100vh', backgroundColor: grey[200] },
    leftNavigation: { width: '250px', height: '100%' },
    container: { flexGrow: 1 },
    page: { padding: '8px' }
}

export default class Layout extends Component {
    render () {
        const { leftNav, appBar, children } = this.props
        return (
            <Router>
                <div style={ css.layout }>
                    <Hidden mdDown>
                        <div style={ css.leftNavigation }>
                            { leftNav }
                        </div>
                    </Hidden>
                    <div style={ css.container }>
                        { appBar }
                        <div style={ css.page }>
                            <Grid container>
                                <Grid item xs={12}>
                                    { children }
                                </Grid>
                            </Grid>
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