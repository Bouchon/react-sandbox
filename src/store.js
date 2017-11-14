import { compose, applyMiddleware, createStore } from 'redux'
import localForage from 'localforage'
import { REHYDRATE, PURGE, persistCombineReducers, getStoredState, persistStore, createPersistor } from 'redux-persist'

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
    const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const config = { key: 'primary', storage: localForage }
    const reducer = persistCombineReducers(config, rootReducer)
    console.log(reducer)
    const store = createStore(reducer, undefined, enhancer(applyMiddleware()))
    persistStore(store, null, () => store.getState())
    return store
    // return new Promise((resolve, reject) => {
    //     try {
    //         const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    //         const store = createStore(
    //             rootReducer, 
    //             undefined,
    //             enhancer(applyMiddleware()))

    //         console.log(store)
    //         persistStore(
    //             store,
    //             null, 
    //             () => store.getState())
    //     } catch (ex) {
    //         reject(ex)
    //     }
    // })
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