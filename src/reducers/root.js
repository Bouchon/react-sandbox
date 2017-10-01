import { combineReducers } from 'redux'
import login from './login'
import projects from './projects'

const rootReducer = combineReducers({
    login, projects
})
export default rootReducer