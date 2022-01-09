import axios from 'axios'

axios.defaults.withCredentials = true

const authost = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
})

export const login = ({ email, password }) =>
  authost.post('tokens/login', { email, password })

export const refreshTokens = () => authost.post('tokens/refresh')

export const register = ({ email, password, confirmPassword }) =>
  authost.post('users', { email, password, confirmPassword })

export const getUser = ({ userId }) => authost.get<any>(`users/${userId}`)
