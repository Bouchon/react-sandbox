import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

import store from './store'

import Layout from './containers/Layout'
import LeftNavigation from './components/LeftNavigation'
import ApplicationBar from './components/ApplicationBar'
import LandingScreen from './containers/LandingScreen'
import ProjectsScreen from './containers/project/ProjectsScreen'
import ReactMotionScreen from './containers/ReactMotionScreen'

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Layout 
                    appBar={<ApplicationBar title='React sandbox' />} 
                    leftNav={<LeftNavigation type='permanent' />}>
                    <div>
                        <Route exact path='/' component={LandingScreen} />                        
                        <Route exact path='/projects' component={ProjectsScreen} />
                        <Route exact path='/react-motion' component={ReactMotionScreen} />
                    </div>
                </Layout>
            </Provider>
        )
    }
}

export default App