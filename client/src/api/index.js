import axios from 'axios'

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const createProblem = (payload) => api.post(`/problem/`, payload);
export const getAllProblems = () => api.get(`/problems/`);

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post('/login/', payload)
export const logoutUser = () => api.get(`/logout/`)

const apis = {
    createProblem,
    getAllProblems,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis;