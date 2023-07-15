import axios from 'axios'

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const createProblem = (payload) => api.post(`/problem/`, payload);

const apis = {
    createProblem
}

export default apis;