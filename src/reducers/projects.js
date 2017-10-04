import { ADD, UPDATE, DELETE } from '../action-creators/projects'

export default function projects (state = {}, action) {
    switch (action.type) {
        case ADD: {
            const { name, description } = action.payload
            let max = 0
            for (var i=0; i<Object.values(state).length; i++) {
                const id = Object.values(state)[i].id
                max = Math.max(max, id)
            }
            const newId = max + 1
            return { ...state, [newId]: { id: newId, name, description} }
        }
  
      case UPDATE: {
        const { id, name, description } = action.payload
        const newProject = { id, name, description }
        if (state[id] !== undefined) {
            let result = { ...state }
            result[id] = newProject
            return result
        } else {
            throw new Error('Project not found (id=' + id + ')')
        }
      }
  
      case DELETE: {
          let result = { }
          for (var i=0; i<Object.values(state).length; i++) {
              const project = Object.values(state)[i]
              if (project.id !== action.payload.id) {
                  result[project.id] = project
              }
          }
          return result
      }

      default: return state
    }
  }
  