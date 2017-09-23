import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Hidden from 'material-ui/Hidden'

import store from './store'

import LeftNavigation from './components/LeftNavigation'
import ApplicationBar from './components/ApplicationBar'
import LandingScreen from './containers/LandingScreen'
import ReactMotionScreen from './containers/ReactMotionScreen'

const css = {
    layout: { display: 'flex', height: '100%' },
    leftNavigation: { width: '250px', height: '100%' },
    container: { flexGrow: 1 },
    page: { display: 'flex', justifyContent: 'center', padding: '30px 2vw' }
}

const Layout = ({children}) => (
    <Router>
        <div style={css.layout}>
            <Hidden mdDown>
                <div style={css.leftNavigation}>
                    <LeftNavigation type='permanent' />
                </div>
            </Hidden>
            <div style={css.container}>
                <ApplicationBar title='React sandbox' />
                <div style={css.page}>
                    { children }
                </div>
            </div>
        </div>
    </Router>
)

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Layout>
                    <div>
                        <Route exact path='/' component={LandingScreen} />
                        <Route exact path='/react-motion' component={ReactMotionScreen} />
                    </div>
                </Layout>
            </Provider>
        )
    }
}

export default App