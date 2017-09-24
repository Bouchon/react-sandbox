import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import Hidden from 'material-ui/Hidden'
import Grid from 'material-ui/Grid'

const css = {
    layout: { display: 'flex', height: '100%' },
    leftNavigation: { width: '250px', height: '100%' },
    container: { flexGrow: 1 },
    page: { flexGrow: 1, padding: '8px' }
}

export default class Layout extends Component {
    render () {
        return (
            <Router>
                <div style={css.layout}>
                    <Hidden mdDown>
                        <div style={css.leftNavigation}>
                            {this.props.leftNav}
                        </div>
                    </Hidden>
                    <div style={css.container}>
                        {this.props.appBar}
                        <div style={css.page}>
                            <Grid container>
                                <Grid item xs={12}>
                                    { this.props.children }
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