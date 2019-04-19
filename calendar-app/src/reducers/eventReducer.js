import { merge } from 'lodash';
import { ADD_EVENT } from '../actions/eventActions'

export default (state = {}, action) => {
    const newState = merge({}, state)
    switch (action.type) {
        case ADD_EVENT:
            return merge({}, newState, { [action.event.eventTime._i]: action.event })
        default:
            return state
    }
}