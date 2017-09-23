import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

import App from './App'

function renderApp (RootComponent) {
    render(
        <AppContainer>
            <RootComponent />
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
