

export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            const newState = Object.assign(state, {})
            
            return {
                events: action.event
            }
        default:
            return state
    }
}