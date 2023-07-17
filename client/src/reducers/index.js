import loggedInReducer from "./loggedIn";
import currentProblemReducer from "./currentProblem";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    loggedIn: loggedInReducer,
    currentProblem: currentProblemReducer
})

export default allReducers;