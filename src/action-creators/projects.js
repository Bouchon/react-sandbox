export const ADD = '@@PROJECT_ADD'
export const UPDATE = '@@PROJECT_UPDATE'
export const REMOVE = '@@PROJECT_REMOVE'

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

export function removeProject (id) {
    return {
        type: REMOVE,
        payload: { id }
    }
}