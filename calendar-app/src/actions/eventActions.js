export const ADD_EVENT = 'ADD_EVENT'

export const addEvent = ( event ) => {
    return {
        type: ADD_EVENT,
        event
    }
}