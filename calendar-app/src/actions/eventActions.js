export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

export const addEvent = ( event ) => {
    return {
        type: ADD_EVENT,
        event
    }
}

export const deleteEvent = ( event ) => {
    return {
        type: DELETE_EVENT,
        event
    }
}