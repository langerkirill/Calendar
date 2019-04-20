import { merge } from 'lodash'
import { ADD_REMINDER, DELETE_REMINDER, UPDATE_REMINDER } from '../actions/reminderActions'

export default (state = {}, action) => {
    const newState = merge({}, state)
    switch (action.type) {
        case ADD_REMINDER:
            return merge({}, newState, { [action.reminder.id]: action.reminder })
        case UPDATE_REMINDER:
            delete newState[action.reminder.id]
            return merge({}, newState, { [action.reminder.id]: action.reminder })
        case DELETE_REMINDER:
            delete newState[action.reminder.id];
            return newState;
        default:
            return state
    }
}