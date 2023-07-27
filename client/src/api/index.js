import axios from 'axios'

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const createProblem = (payload) => api.post(`/problem/`, payload);
export const getAllProblems = () => api.get(`/problems/`);
export const getProblemById = (id) => api.get(`/problem/${id}`);
export const createSolution = (payload) => api.post(`/solution`, payload);
export const createTest = (payload) => api.post(`/test`, payload);
export const getOutput = (problemId, solutionId) => api.get(`/output/`, {params: {problemId: problemId, solutionId: solutionId}});
export const updateSolutionById = (id, payload) => api.put(`/solution/${id}`, payload);

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post('/login/', payload)
export const logoutUser = () => api.get(`/logout/`)

const apis = {
    createProblem,
    getAllProblems,
    getProblemById,
    createSolution,
    createTest,
    getOutput,
    updateSolutionById,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis;