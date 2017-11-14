import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

import configureStore from './store'
import App from './App'

async function renderApp (RootComponent) {
    //const store = await configureStore()
    render(
        <AppContainer>
            <RootComponent store={configureStore()} />
        </AppContainer>,
        document.getElementById('app')
    )
}

renderApp(App)

if (module.hot) {
    module.hot.accept('./App', () => console.log('Accepting the updated printMe module!')) //render(App))
}
