const currentProblemReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_CURRENT_PROBLEM':
            return action.payload;
        case 'CLEAR_CURRENT_PROBLEM':
            return {};
        default:
            return state;
    }
}

export default currentProblemReducer;