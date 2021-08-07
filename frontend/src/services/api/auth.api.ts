import axios from 'axios'

const authost = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
})

export const login = ({ email, password }) =>
  authost.post('sessions', { email, password })

export const register = ({ email, password, confirmPassword }) =>
  authost.post('users', { email, password, confirmPassword })

export const getUser = ({ userId }) => authost.get<any>(`users/${userId}`)
