import {combineReducers} from 'redux';
import loggedInReducer from "./loggedIn";
import currentProblemReducer from "./currentProblem";
import currentSolutionsReducer from "./currentSolutions";

const allReducers = combineReducers({
    loggedIn: loggedInReducer,
    currentProblem: currentProblemReducer,
    currentSolutions: currentSolutionsReducer
})

export default allReducers;