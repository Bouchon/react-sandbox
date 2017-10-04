export const ADD = '@@TASK_ADD'
export const UPDATE = '@@TASK_UPDATE'
export const DELETE = '@@TASK_DELETE'

export function addTask (projectId, name, description) {
    return {
        type: ADD,
        payload: { projectId, name, description }
    }
}

export function updateTask (id, projectId, name, description) {
    return {
        type: UPDATE,
        payload: { id, projectId, name, description }
    }
}

export function deleteTask (id) {
    return {
        type: DELETE,
        payload: { id }
    }
}