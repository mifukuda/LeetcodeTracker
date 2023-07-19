const currentSolutionsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CURRENT_SOLUTIONS':
            return action.payload;
        case 'CLEAR_CURRENT_SOLUTIONS':
            return {};
        default:
            return state;
    }
}

export default currentSolutionsReducer;