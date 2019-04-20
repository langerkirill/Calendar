export const ADD_REMINDER = 'ADD_REMINDER'
export const DELETE_REMINDER = 'DELETE_REMINDER'
export const UPDATE_REMINDER = 'UPDATE_REMINDER'

export const addReminder = ( reminder ) => {
    return {
        type: ADD_REMINDER,
        reminder
    }
}

export const updateReminder = ( reminder ) => {
    return {
        type: UPDATE_REMINDER,
        reminder
    }
}

export const deleteReminder = ( reminder ) => {
    return {
        type: DELETE_REMINDER,
        reminder
    }
}