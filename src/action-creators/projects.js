export const ADD = '@@PROJECT_ADD'
export const UPDATE = '@@PROJECT_UPDATE'
export const DELETE = '@@PROJECT_DELETE'

export function addProject (name, description) {
    return {
        type: ADD,
        payload: { name, description }
    }
}

export function updateProject (id, name, description) {
    return {
        type: UPDATE,
        payload: { id, name, description }
    }
}

export function deleteProject (id) {
    return {
        type: DELETE,
        payload: { id }
    }
}