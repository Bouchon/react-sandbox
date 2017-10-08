import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

import configureStore from './store'
import App from './App'

async function renderApp (RootComponent) {
    const store = await configureStore()
    render(
        <AppContainer>
            <RootComponent store={store} />
        </AppContainer>,
        document.getElementById('app')
    )
}

renderApp(App)

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        renderApp(NextApp)
    })
    module.hot.accept()
}
