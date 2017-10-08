import { compose, applyMiddleware, createStore } from 'redux'
import localForage from 'localforage'
import { getStoredState, persistStore, autoRehydrate, createPersistor } from 'redux-persist'

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
        '0': { id: 0, projectId: 0, name: 'Première tâche', description: 'Description de la tâche' }
    }
}

export default function configureStore() {
    return new Promise((resolve, reject) => {
        try {
            const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
            const store = createStore(
                rootReducer, 
                undefined,
                enhancer(applyMiddleware(), autoRehydrate()))

            persistStore(
                store, 
                {
                    whitelist: ['login', 'projects', 'tasks'], 
                    storage: localForage
                },
                () => resolve(store))
        } catch (ex) {
            reject(ex)
        }
    })
}

/*const persistConfig = {
    whitelist: ['login', 'projects', 'tasks'], 
    storage: localForage
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
        whitelist: ['login', 'projects', 'tasks'],
        storage: localForage
    }
)

export default store*/