import { ADD, UPDATE, DELETE } from '../action-creators/tasks'

export default function tasks (state = {}, action) {
    switch (action.type) {
        case ADD: {
            const { projectId, name, description } = action.payload
            let max = 0
            for (var i=0; i<Object.values(state).length; i++) {
                const id = Object.values(state)[i].id
                max = Math.max(max, id)
            }
            const newId = max + 1
            return { ...state, [newId]: { id: newId, projectId, name, description} }
        }
  
      case UPDATE: {
        const { id, projectId, name, description } = action.payload
        const newTask = { id, projectId, name, description }
        if (state[id] !== undefined) {
            let result = { ...state }
            result[id] = newTask
            return result
        } else {
            throw new Error('Task not found (id=' + id + ')')
        }
      }
  
      case DELETE: {
          let result = { }
          for (var i=0; i<Object.values(state).length; i++) {
              const task = Object.values(state)[i]
              if (task.id !== action.payload.id) {
                  result[task.id] = task
              }
          }
          return result
      }

      default: return state
    }
  }
  