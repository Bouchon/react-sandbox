import { combineReducers } from 'redux'
import login from './login'
import projects from './projects'
import tasks from './tasks'

const rootReducer = { login, projects, tasks }
export default rootReducer