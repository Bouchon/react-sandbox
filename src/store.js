import { compose, applyMiddleware, createStore } from 'redux'
import localForage from 'localforage'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from './reducers/root'

const DEFAULT_STATE = {
    login: {
        state: 'logged-out',
        response: {}
    },
    projects: {
        '0': { id: 0, name: 'Premier projet', description: 'Description du projet' },
        '1': { id: 1, name: 'Deuxième projet', description: 'Description du projet' }
    },
    tasks: {
        '0': { id: 0, name: 'Première tâche', description: 'Description de la tâche', projectId: 0 }
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
        whitelist: ['login', 'projects'],
        storage: localForage
    }
)

export default store