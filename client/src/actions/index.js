export const setCurrentProblem = (problem) => {
    return {
        type: 'SET_CURRENT_PROBLEM',
        payload: problem
    }
}

export const setCurrentSolutions = (solutions) => {
    return {
        type: 'SET_CURRENT_SOLUTIONS',
        payload: solutions
    }
}