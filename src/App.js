import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

import Layout from './containers/Layout'
import LeftNavigation from './components/LeftNavigation'
import ApplicationBar from './components/ApplicationBar'
import LandingScreen from './containers/LandingScreen'
import ReactMotionScreen from './containers/ReactMotionScreen'

import ProjectListScreen from './containers/project/ListScreen'
import ProjectAddOrUpdateScreen from './containers/project/AddOrUpdateScreen'
import ProjectDashboardScreen from './containers/project/DashboardScreen'

//import TaskListScreen from './containers/task/ListScreen'
import ProjectTasksScreen from './containers/task/ProjectTasksScreen'

class App extends Component {
    render () {
        return (
            <Provider store={this.props.store}>
                <Layout 
                    appBar={<ApplicationBar title='React sandbox' />} 
                    leftNav={<LeftNavigation type='permanent' />}>
                    <div>
                        <Route exact path='/' component={LandingScreen} />                        
                        <Route exact path='/project/list' component={ProjectListScreen} />
                        <Route exact path='/project/add' component={ProjectAddOrUpdateScreen} />
                        <Route exact path='/project/:id/edit' component={ProjectAddOrUpdateScreen} />
                        <Route exact path='/project/:id/dashboard/' component={ProjectDashboardScreen} />

                        <Route exact path='/project/:id/task/list' component={ProjectTasksScreen} />
                        
                        <Route exact path='/react-motion' component={ReactMotionScreen} />
                    </div>
                </Layout>
            </Provider>
        )
    }
}

export default App