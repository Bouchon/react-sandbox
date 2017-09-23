import { compose, applyMiddleware, createStore } from 'redux'
import localForage from 'localforage'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from './reducers/root'

const DEFAULT_STATE = {
    login: {
        state: 'logged-out',
        response: {}
    }
}

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    enhancer(
        applyMiddleware(),
        autoRehydrate(),
    )
)

persistStore(
    store,
    { 
        whitelist: 'login',
        storage: localForage
    }
)

export default store