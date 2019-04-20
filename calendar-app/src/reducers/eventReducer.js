import { merge } from 'lodash'
import { ADD_EVENT, DELETE_EVENT } from '../actions/eventActions'

export default (state = {}, action) => {
    const newState = merge({}, state)
    switch (action.type) {
        case ADD_EVENT:
            return merge({}, newState, { [action.event.eventTime._i]: action.event })
        case DELETE_EVENT:
            delete newState[action.event.eventTime._i];
            return newState;
        default:
            return state
    }
}